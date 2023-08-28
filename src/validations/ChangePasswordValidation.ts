import * as Yup from "yup";

const changePasswordFormValidationSchema = Yup.object({
    resetToken: Yup.string()
        .required('error.reset_token_required'),
    newPassword: Yup.string()
        .required('error.new_password_required'),
    passwordConfirmation: Yup.string()
        .required('error.password_confirmation_required')
        .oneOf([Yup.ref('newPassword'), ''], 'error.password_must_be_match')
})

export default changePasswordFormValidationSchema
