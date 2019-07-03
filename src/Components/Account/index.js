import React, { useContext } from 'react';
import  { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';


const AccountPageBase = () => {
    const authUser = useContext(AuthUserContext);

    return(
        <div>
            <h1>Account Page {authUser.email}</h1>  
            <PasswordForgetForm />  
            <PasswordChangeForm />
        </div>
    );
};

const AccountPage = compose(
    withRouter,
    withFirebase,
    withAuthorization,
)(AccountPageBase);


export default AccountPage;