import React, { useState, useEffect, useContext } from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import NoMatch from '../404';

import * as ROUTES from '../../Constants/routes';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';

const AppBase = () => {
    return(
        <Router>
            <Navigation />
            
            <hr />

            <Switch>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    );
};


const App = () => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('iaiAuthUser')));
    const firebase = useContext(FirebaseContext);

    useEffect(()=>{
        const unlisten = firebase.onAuthUserListener(
            authUser => {
                localStorage.setItem('iaiAuthUser', JSON.stringify(authUser));
                setAuthUser(authUser);
            },
            () => {
                localStorage.removeItem('iaiAuthUser');
                setAuthUser(null);
            }
        );

        return () => {
            unlisten();
        }
    // one one render so no dependency props
    // eslint-disable-next-line
    }, []);

    return(
        <AuthUserContext.Provider value={authUser}>
            <AppBase />
        </AuthUserContext.Provider>
    );
}

export default App;