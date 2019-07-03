import React, { useEffect } from 'react';

import * as ROUTES from '../../Constants/routes';


const withAuthorization = Component => props => {
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
        <Component {...props} />
    );
}
const condition = authUser => !!authUser;

export default withAuthorization;