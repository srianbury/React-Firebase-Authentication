import React, { useEffect, useContext } from 'react';

import * as ROUTES from '../../Constants/routes';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';


const withAuthorization = condition => Component => ({ history, ...rest }) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    useEffect(() => {
        const listener = firebase.onAuthUserListener(
            authUser => {
                if(!condition(authUser)){
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