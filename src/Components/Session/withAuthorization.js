import React, { useEffect, useContext } from 'react';

import * as ROUTES from '../../Constants/routes';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';


const withAuthorization = condition => Component => ({ history, ...rest }) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    firebase
                        .user(authUser.uid)
                        .once('value')
                        .then(snapshot => {
                            const dbUser = snapshot.val();

                            // default empty roles
                            if (!dbUser.roles) {
                                dbUser.roles = {};
                            }

                            // merge auth and db user
                            authUser = {
                                uid: authUser.uid,
                                email: authUser.email,
                                ...dbUser,
                            };

                            if (!condition(authUser)) {
                                history.push(ROUTES.SIGN_IN);
                            }
                        });
                } else {
                    history.push(ROUTES.SIGN_IN);
                }
            },
            () => {
                history.push(ROUTES.SIGN_IN);
            }
        );
        return () => {
            listener();
        }
    // one timer render, no deps needed
    // eslint-disable-next-line
    }, []);
    return (
        <>
            {condition(authUser) && <Component {...rest} />}
        </>
    );
}

export default withAuthorization;