import React from 'react';

import { withFirebase } from '../Firebase';
import { useForm } from '../../Hooks';

const PasswordChangeForm = (props) => {
    const [formData, dispatch, reset] = useForm(initialForm);
    function handleSubmit(){
        const { passwordOne } = formData;

        props.firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                reset();
            })
            .catch(error => {
                dispatch({ error });
            });    
    };

    function handleChange(event){
        dispatch({ [event.target.name]: event.target.value });
    }

    return(
        <div>
            {formData.error && <p>{formData.error.message}</p>}
            <input
                name="passwordOne"
                value={formData.passwordOne}
                onChange={handleChange}
                type="password"
                placeholder="New Password" />
            <input
                name="passwordTwo"
                value={formData.passwordTwo}
                onChange={handleChange}
                type="password"
                placeholder="Confirm New Password" />
            <button 
                onClick={handleSubmit}
                disabled={!formData.passwordOne || formData.passwordOne!==formData.passwordTwo}>
                Change Password
            </button>
        </div>
    );
};
const initialForm = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};


export default withFirebase(PasswordChangeForm);