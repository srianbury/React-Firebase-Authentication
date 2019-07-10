import React, { useContext } from 'react';

import { useForm } from '../../Hooks';
import { FirebaseContext } from '../Firebase';


const PasswordChangeForm = () => {
    const [formData, handleInputChange, handleChange, reset] = useForm(initialForm);
    const firebase = useContext(FirebaseContext);

    function handleSubmit(){
        const { passwordOne } = formData;

        firebase
            .doPasswordUpdate(passwordOne)
            .then(() => {
                reset();
            })
            .catch(error => {
                handleChange({ error });
            });    
    };

    return(
        <div>
            {formData.error && <p>{formData.error.message}</p>}
            <input
                name="passwordOne"
                value={formData.passwordOne}
                onChange={handleInputChange}
                type="password"
                placeholder="New Password" />
            <input
                name="passwordTwo"
                value={formData.passwordTwo}
                onChange={handleInputChange}
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


export default PasswordChangeForm;