import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';
import { useForm } from '../../Hooks';

const PasswordForgetPage = () => (
    <div>
        <h1>Password Forget</h1>
        <PasswordForgetForm />
    </div>
);


const PasswordForgetFormBase = (props) => {
    const [formData, dispatch, reset] = useForm(initialForm);

    function handleSubmit(){
        const { email } = formData;
        props.firebase.doPasswordReset(email)
        .then(()=>{
            reset();
        })
        .catch(error=>{
            dispatch({ error });
        });
    }

    function handleChange(event){
        dispatch({ [event.target.name]:event.target.value });
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


const PasswordForgetForm = withFirebase(PasswordForgetFormBase);


export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };