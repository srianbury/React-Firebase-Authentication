import React, { useEffect, useContext } from 'react';

import * as ROUTES from '../../Constants/routes';
import AuthUserContext from './context';
import { useAuthentication } from './withAuthentication'; 
import { FirebaseContext } from '../Firebase';


const withAuthorization = Component => ({ history, ...rest }) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useAuthentication(firebase); //useContext(AuthUserContext);

    useEffect(()=>{
        const listener = firebase.auth.onAuthStateChanged(
            authUser => {
                if(!condition(authUser)){
                    history.push(ROUTES.SIGN_IN);
                }
            }
        );
        return () => {
            listener();
        }
    }, []);
    return(
        <>
            {condition(authUser) && <Component {...rest} />}
        </>
    );
}
const condition = authUser => !!authUser;

export default withAuthorization;