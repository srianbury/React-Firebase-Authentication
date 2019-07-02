import React, { useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1>Password Forget</h1>
        <PasswordForgetForm />
    </div>
);

const initialForm = {
    email: '',
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

const PasswordForgetFormBase = (props) => {
    const [formData, dispatch] = useReducer(formReducer, initialForm);
    const [isInvalid, setIsInvalid] = useState(true);

    useEffect(()=>{
        if(formData.email!==''){
            setIsInvalid(false);
        }
        else if(!isInvalid){
            setIsInvalid(true);
        }
    },[formData, isInvalid]);

    function handleSubmit(){
        const { email } = formData;
        props.firebase.doPasswordReset(email)
        .then(()=>{
            dispatch({
                type:'RESET'
            });
        })
        .catch(error=>{
            dispatch({
                type:'UPDATE',
                payload:{ error }
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
            {formData.error && <p>formData.error.message</p>}
            <input 
                name='email'
                value={formData.email}
                onChange={handleChange}
                type='text'
                placeholder='Email Address' />
            <button
                onClick={handleSubmit}
                disabled={isInvalid}
                type='submit' >
                Reset Password
            </button>
        </div>
    );
};


const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };