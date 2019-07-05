import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session'; 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../Constants/routes';
import * as ROLES from '../../Constants/roles';


const Navigation = () => {
    const authUser = useContext(AuthUserContext);

    return(
        <>{authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />}</>
    );
};

const NavigationAuth = ({ authUser }) => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>}
        <li>
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
    </ul>
  );

export default Navigation;