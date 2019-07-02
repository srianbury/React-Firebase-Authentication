import React, { useReducer, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

const initialForm = {
    email: '',
    password: '',
    error: ''
};
function formReducer(state, action){
    switch(action.type){
        case 'UPDATE':
            return { ...state, ...action.payload };
        case 'RESET':
            return initialForm;
        default:
            return state;
    }
}

const SignInFormBase = (props) => {
    const [formData, dispatch] = useReducer(formReducer, initialForm);
    const [isInvalid, setIsInvalid] = useState(true);

    useEffect(()=>{
        if(
            formData.email!==''
            && formData.password!==''){
                setIsInvalid(false);
            } 
        else if(!isInvalid){ //only set back to false if it was true and needs to be changed
            setIsInvalid(true);
        }
    }, [formData, isInvalid]);

    function handleSubmit(event){
        const { email, password } = formData;
        props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(()=>{
            dispatch({
                type: 'RESET'
            });
            props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            dispatch({
                type: 'UPDATE',
                payload: { error }
            });
        });
    }

    function handleChange(event){
        dispatch({
            type: 'UPDATE',
            payload: { [event.target.name]:event.target.value }
        });
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
                disabled={isInvalid}>
                Sign In
            </button>
        </div>
    );
} 

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