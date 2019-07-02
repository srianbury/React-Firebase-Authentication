import React, { useState, useEffect } from 'react';


import AuthUserContext from './context';


const withAuthentication = Component => props => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(()=>{
        const listener = props.firebase.auth.onAuthStateChanged(authU => {
            authU ? setAuthUser(authU) : setAuthUser(null);
        });

        return () => {
            listener();
        }
    });


    return(
        <AuthUserContext.Provider value={authUser}>
            <Component {...props} />
        </AuthUserContext.Provider>
    );
}

export default withAuthentication;