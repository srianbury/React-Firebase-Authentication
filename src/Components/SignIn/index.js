import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../Constants/routes';
import { useForm } from '../../Hooks';
import { FirebaseContext } from '../Firebase';


const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        <SignInGoogle />
        <SignInFacebook />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);


const SignInFormBase = ({ history }) => {
    const [formData, handleInputChange, handleChange, reset] = useForm(initialForm);
    const firebase = useContext(FirebaseContext);

    async function handleSubmit(){
        const { email, password } = formData;
        try{
            await firebase.doSignInWithEmailAndPassword(email, password);
            reset();
            history.push(ROUTES.HOME);         
        } catch(error){
            handleChange({ error });
        }
    }

    return(
        <div>
            {formData.error && <p>{formData.error.message}</p>}
            <input
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                type='text'
                placeholder='Email Address' />
            <input
                name='password'
                value={formData.password}
                onChange={handleInputChange}
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


const SignInGoogleBase = ({ history }) => {
    const [error, setError] = useState(null);
    const firebase = useContext(FirebaseContext);

    async function onSubmit(){
        try{
            const googleAuthUser = await firebase.doSignInWithGoogle();
            if(googleAuthUser.additionalUserInfo.isNewUser){
                return firebase
                        .user(googleAuthUser.user.uid)
                        .set({
                            username: googleAuthUser.user.displayName,
                            email: googleAuthUser.user.email,
                            roles: {}
                        }, { merge: true });
            }
            setError(null);
            history.push(ROUTES.HOME);
        } catch(error){
            setError(error);
        }
    }

    return(
        <div>
            {error && <p>{error.message}</p>}
            <button
                onClick={onSubmit}>
                Sign In with Google
            </button>
        </div>
    );
}


const SignInFacebookBase = ({ history }) => {
    const [error, setError] = useState(null);
    const firebase = useContext(FirebaseContext);

    function onSubmit(){
        firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                // create new user in db on first login 
                if(socialAuthUser.additionalUserInfo.isNewUser){
                    return firebase
                        .user(socialAuthUser.user.uid)
                        .set({
                            username: socialAuthUser.additionalUserInfo.profile.name,
                            email: socialAuthUser.additionalUserInfo.profile.email,
                            roles: {}
                        }, { merge: true });
                }
            })
            .then(() => {
                setError(null);
                history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error);
            });
    }

    return(
        <div>
            {error && <p>{error.message}</p>}
            <button
                onClick={onSubmit}>
                Sign In with Facebook
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
    withRouter
)(SignInFormBase);

const SignInGoogle = compose(
    withRouter,
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
)(SignInFacebookBase);


export default SignInPage;
export { SignInForm, SignInLink, SignInGoogle };