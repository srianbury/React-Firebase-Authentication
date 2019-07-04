import React from 'react';
import  { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, useAuthentication } from '../Session';


const AccountPageBase = () => {
    const authUser = useAuthentication();
    return(
        <div>
            <h1>Account Page {authUser ? authUser.email : ''}</h1>
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