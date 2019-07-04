import React, { useState, useEffect, useContext } from 'react';


import AuthUserContext from './context';
import { FirebaseContext } from '../Firebase';



const withAuthentication = Component => props => {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(()=>{
        const listener = firebase.auth.onAuthStateChanged(authU => {
            authU ? setAuthUser(authU) : setAuthUser(null);
        });

        return () => {
            listener();
        }
    }, []);


    return(
        <AuthUserContext.Provider value={authUser}>
            <Component {...props} />
        </AuthUserContext.Provider>
    );
}

export default withAuthentication;