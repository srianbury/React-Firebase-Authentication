import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignInLink } from '../SignIn';
import * as ROUTES from '../../Constants/routes';
import * as ROLES from '../../Constants/roles';
import { useForm } from '../../Hooks';
import { FirebaseContext } from '../Firebase';


const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
        <SignInLink />
    </div>
);


const SignUpFormBase = ({ history }) => {
    const [formData, dispatch, handleChange, reset] = useForm(initialForm);
    const firebase = useContext(FirebaseContext);    

    function handleSubmit(){
        const { username, email, passwordOne } = formData;
        const roles = { [ROLES.ADMIN]: false };
        firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            return firebase
            .user(authUser.user.uid)
            .set({
                username,
                email,
                roles
            });
        })
        .then(()=>{
            reset();
            history.push(ROUTES.HOME);
        })
        .catch(error=>{
            dispatch({ error });
        });
    }

    return(
        <div>
            {formData.error && <p>{formData.error.message}</p>}
            <input 
                name='username'
                value={formData.username}
                onChange={handleChange}
                type='text'
                placeholder='Username' />
            <input 
                name='email'
                value={formData.email}
                onChange={handleChange}
                type='text'
                placeholder='Email Address' />
            <input 
                name='passwordOne'
                value={formData.passwordOne}
                onChange={handleChange}
                type='password'
                placeholder='Password' />
            <input 
                name='passwordTwo'
                value={formData.passwordTwo}
                onChange={handleChange}
                type='password'
                placeholder='Confirm Password' />
            <button
                onClick={handleSubmit}
                disabled={!formData.username || !formData.email || !formData.passwordOne || formData.passwordOne!==formData.passwordTwo} >
                Sign Up
            </button>
        </div>
    );
}
const initialForm = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
};


const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);


const SignUpForm = compose(
    withRouter
)(SignUpFormBase);


export default SignUpPage;
export { SignUpForm,  SignUpLink };