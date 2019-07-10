import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { useForm } from '../Hooks';


configure({ adapter: new Adapter() });


describe('Use Form (No Error Key in Initial Form)', ()=>{
    let form, handleInputChange, handleChange, reset;
    beforeEach(()=>{
        testHook(()=>{
            const init = { username: '' };
            [form, handleInputChange, handleChange, reset] = useForm(init);
        });
    });

    test('should have form', ()=>{
        expect(form).toBeInstanceOf(Object);
    });

    test('should have handleInputChange', ()=>{
        expect(handleInputChange).toBeInstanceOf(Function);
    });

    test('should have handleChange', ()=>{
        expect(handleChange).toBeInstanceOf(Function);
    });

    test('should have reset', ()=>{
        expect(reset).toBeInstanceOf(Function);
    });

    test('username should be blank', ()=>{
        expect(form.username).toBe('');
    });

    test('form lifecycle with undefined form.error', ()=>{
        expect(form.username).toBe('');

        act(()=>{
            const event = { target: { name: 'username', value: 'name'}};
            const error = new Error('Some error');
            handleInputChange(event);
            handleChange({ error });
        }); 
        expect(form.username).toBe('name');
        expect(form.error).toBeInstanceOf(Error);
        expect(form.error.message).toBe('Some error');

        act(()=>{
            reset();
        });
        expect(form.username).toBe('');
        expect(form.error).toBeUndefined();
    });
});


describe('Use Form (Has Error Key in Initial Form)', ()=>{
    let form, handleInputChange, handleChange, reset;
    beforeEach(()=>{
        testHook(()=>{
            const init = { username: '', error: null };
            [form, handleInputChange, handleChange, reset] = useForm(init);
        });
    });

    test('form lifecycle with null form.error', ()=>{
        expect(form.username).toBe('');

        act(()=>{
            const event = { target: { name: 'username', value: 'name'}};
            const error = new Error('Some error');
            handleInputChange(event);
            handleChange({ error });
        }); 
        expect(form.username).toBe('name');
        expect(form.error).toBeInstanceOf(Error);
        expect(form.error.message).toBe('Some error');

        act(()=>{
            reset();
        });
        expect(form.username).toBe('');
        expect(form.error).toBeNull();
    });
});


const HookTester = ({ cb }) => {
    cb();
    return null;
}

const testHook = (cb) => {
    mount(<HookTester cb={cb} />);
}
