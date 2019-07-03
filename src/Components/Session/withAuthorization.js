import React, { useEffect, useContext } from 'react';

import * as ROUTES from '../../Constants/routes';
import AuthUserContext from './context';

const withAuthorization = Component => props => {
    const authUser = useContext(AuthUserContext);

    useEffect(()=>{
        const listener = props.firebase.auth.onAuthStateChanged(
            authUser => {
                if(!condition(authUser)){
                    props.history.push(ROUTES.SIGN_IN);
                }
            }
        );
        return () => {
            listener();
        }
    });
    return(
        <>
            {condition(authUser) && <Component {...props} />}
        </>
    );
}
const condition = authUser => !!authUser;

export default withAuthorization;