import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../Constants/routes';
import { useForm } from '../../Hooks';
import { FirebaseContext } from '../Firebase';

const PasswordForgetPage = () => (
    <div>
        <h1>Password Forget</h1>
        <PasswordForgetForm />
    </div>
);


const PasswordForgetFormBase = () => {
    const [formData, dispatch, handleChange, reset] = useForm(initialForm);
    const firebase = useContext(FirebaseContext);

    function handleSubmit(){
        const { email } = formData;
        firebase.doPasswordReset(email)
        .then(()=>{
            reset();
        })
        .catch(error=>{
            dispatch({ error });
        });
    }

    return(
        <div>
            {formData.error && <p>formData.error.message</p>}
            <input 
                name='email'
                value={formData.email}
                onChange={handleChange}
                type='text'
                placeholder='Email Address' />
            <button
                onClick={handleSubmit}
                disabled={!formData.email}
                type='submit' >
                Reset Password
            </button>
        </div>
    );
};
const initialForm = {
    email: '',
    error: null
};


const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);


const PasswordForgetForm = PasswordForgetFormBase;


export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };