import React, { useContext } from 'react';
import  { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization, useAuthentication } from '../Session';


const AccountPageBase = () => {
    //const authUser = useContext(AuthUserContext);
    const authUser = useAuthentication();
    console.log(authUser);
    return(
        <div>
            <h1>Account Page {authUser ? authUser.email : 'Loading...'}</h1>  
            <PasswordForgetForm />  
            <PasswordChangeForm />
        </div>
    );
};

const AccountPage = compose(
    withRouter,
    withAuthorization
)(AccountPageBase);


export default AccountPage;