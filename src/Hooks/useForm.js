import React from 'react';

const useForm = initialForm => {
    const [formData, dispatch] = React.useReducer(formReducer, initialForm);
    const reset = () => {
        dispatch(initialForm);
    }
    const handleChange = (event) => {
        dispatch({ [event.target.name]:event.target.value });
    }
    return [formData, dispatch, handleChange, reset];
}

function formReducer(state, newState){
    return { ...state, ...newState };
}

export default useForm;