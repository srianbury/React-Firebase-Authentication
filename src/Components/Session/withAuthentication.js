import React, { useState, useEffect, useContext } from 'react';

import AuthUserContext from './context';
import { FirebaseContext } from '../Firebase';

const useAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);
    const firebase = useContext(FirebaseContext);

    useEffect(()=>{
        const unlisten = firebase.auth.onAuthStateChanged(authUser => {
            authUser ? setAuthUser(authUser) : setAuthUser(null);
        });

        return () => {
            unlisten();
        }
    }, []);

    return authUser;
}

export { useAuthentication };