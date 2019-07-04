import React, { useContext } from 'react';

import { FirebaseContext } from '../Firebase';


const SignOutButton = () => {
    const firebase = useContext(FirebaseContext);

    return(
        <button
            onClick={firebase.doSignOut}>
            Sign Out
        </button>
    );
};

export default SignOutButton;