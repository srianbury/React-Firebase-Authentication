import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignInLink } from '../SignIn';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';
import { useForm } from '../../Hooks';


const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
        <SignInLink />
    </div>
);


const SignUpFormBase = (props) => {
    const [formData, dispatch, reset] = useForm(initialForm);

    function handleSubmit(event){
        const { email, passwordOne } = formData; //username
        props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            reset();
            props.history.push(ROUTES.HOME);
        }).catch(error=>{
            dispatch({ error });
        });
    }

    function handleChange(event){
        dispatch({ [event.target.name]: event.target.value });
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
    withRouter,
    withFirebase
)(SignUpFormBase);


export default SignUpPage;
export { SignUpForm,  SignUpLink };