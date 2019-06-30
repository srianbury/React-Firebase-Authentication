import React, { useReducer, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignInLink } from '../SignIn';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
        <SignInLink />
    </div>
);

const initialForm = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
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

const SignUpFormBase = (props) => {
    const [formData, dispatch] = useReducer(formReducer, initialForm);
    const [isInvalid, setIsInvalid] = useState(true);

    useEffect(()=>{
        if(
            formData.email!==''
            && formData.username!==''
            && formData.passwordOne!==''
            && formData.passwordOne===formData.passwordTwo){
                setIsInvalid(false);
            } 
        else if(!isInvalid){ //only set back to false if it was true and needs to be changed
            setIsInvalid(true);
        }
    }, [formData, isInvalid]);

    function handleSubmit(event){
        const { username, email, passwordOne } = formData;
        props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            dispatch({
                type:'RESET'
            });
            props.history.push(ROUTES.HOME);
        }).catch(error=>{
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
                disabled={isInvalid}
                type='submit' >
                Sign Up
            </button>
        </div>
    );
}

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