import * as Yup from "yup";

const loginFormValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('error.email_required'),
    password: Yup.string()
        .min(8, 'error.password_must_has_minimum_8_characters')
})

export default loginFormValidationSchema
