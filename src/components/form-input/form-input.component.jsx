import {FormGroup, FormInputField, FormInputLabel } from './form-input.styles'


const FormInput = ({label, ...otherProps}) => {
    return(
        <FormGroup>
            <FormInputField { ...otherProps} />

            {label && (
                <FormInputLabel className={`${
                    otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                >
                    {label}
                </FormInputLabel>
            )}

        </FormGroup>
        
    )}

export default FormInput