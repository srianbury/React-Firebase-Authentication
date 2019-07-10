import React from 'react';

// initialForm: object
const useForm = initialForm => {
    const [formData, dispatch] = React.useReducer(formReducer, initialForm);
    const reset = () => {
        dispatch({
            type: 'RESET',
            payload: initialForm
        });
    }
    const handleChange = (payload) => {
        dispatch({
            type: 'UPDATE',
            payload
        });
    }

    const handleInputChange = (event) => {
        dispatch({
            type: 'UPDATE',
            payload: {
                [event.target.name]: event.target.value
            }
        });
    }
    return [formData, handleInputChange, handleChange, reset];
}

function formReducer(state, action){
    switch(action.type){
        case 'UPDATE':
            return { ...state, ...action.payload };
        case 'RESET':
            return action.payload;
        default:
            return state;
    }
    
}

export default useForm;  