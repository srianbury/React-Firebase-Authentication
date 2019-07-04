import React from 'react';

import { FirebaseContext } from '../Firebase';

const useAuthentication = () => {
    const [authUser, setAuthUser] = React.useState(null);
    const firebase = React.useContext(FirebaseContext);

    React.useEffect(()=>{
        const unlisten = firebase.auth.onAuthStateChanged(authUser => {
            authUser ? setAuthUser(authUser) : setAuthUser(null);
        });

        return () => {
            unlisten();
        }
        
    // one timer render, no deps needed
    // eslint-disable-next-line
    }, []);

    return authUser;
}

export { useAuthentication };