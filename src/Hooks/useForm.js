import React from 'react';

const useForm = initialForm => {
    const [formData, dispatch] = React.useReducer(formReducer, initialForm);
    const reset = () => {
        dispatch(initialForm);
    }
    return [formData, dispatch, reset];
}

function formReducer(state, newState){
    return { ...state, ...newState };
}

export default useForm;