import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';
import { useForm } from '../../Hooks';


const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);


const SignInFormBase = (props) => {
    const [formData, dispatch, reset] = useForm(initialForm);

    function handleSubmit(event){
        const { email, password } = formData;
        props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(()=>{
            reset();
            props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            dispatch({ error });
        });
    }

    function handleChange(event){
        dispatch({ [event.target.name]:event.target.value });
    }

    return(
        <div>
            {formData.error && <p>{formData.error.message}</p>}
            <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                type='text'
                placeholder='Email Address' />
            <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                type='password'
                placeholder='Password' />
            <button
                onClick={handleSubmit}
                disabled={!formData.email || !formData.password}>
                Sign In
            </button>
        </div>
    );
} 
const initialForm = {
    email: '',
    password: '',
    error: ''
};


const SignInLink = () => (
    <p>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
);


const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);


export default SignInPage;
export { SignInForm, SignInLink };