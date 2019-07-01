import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../Constants/routes';

const App = (props) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(()=>{
        const listener = props.firebase.auth.onAuthStateChanged(authUser =>{
            authUser ? setAuthUser(authUser) : setAuthUser(null);
        });

        return () => {
            listener();
        }
    });

    return(
        <Router>
            <Navigation authUser={authUser}/>
            
            <hr />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
        </Router>
    );
};

export default withFirebase(App);