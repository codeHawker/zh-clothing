import { useState } from 'react'

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { signInWithGooglePopup, signInEmailAndPasswordThroughFirebase } from '../../utils/firebase/firebase.utils';


import { SignInContainer, ButtonsContainer } from './sign-in-form.styles'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            await signInEmailAndPasswordThroughFirebase(email, password);
        }
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect email or password')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error)
            }

        }
        resetFormFields()
    }



    return(
       <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in wiith your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                        label='Email' 
                        type='email' 
                        required 
                        onChange={handleChange} 
                        name='email' 
                        value={email}
                    />
                    
                <FormInput
                    label='Password' 
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Sign In With Google</Button>
                </ButtonsContainer> 

               
            </form>

       </SignInContainer> 
    )
}

export default SignInForm;