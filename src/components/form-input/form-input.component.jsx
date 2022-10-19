import {FormGroup, FormInputField, FormInputLabel } from './form-input.styles'


const FormInput = ({label, ...otherProps}) => {
    return(
        <FormGroup>
            <FormInputField { ...otherProps} />

            {label && (
                <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
            )}

        </FormGroup>
        
    )}

export default FormInput