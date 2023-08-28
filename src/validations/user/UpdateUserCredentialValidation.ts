import * as Yup from "yup";

const editUserCredentialFormValidationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('error.old_password_required'),
    newPassword: Yup.string()
        .required('error.new_password_required')
        .min(8, 'error.password_must_has_minimum_8_characters'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("newPassword")], "error.password_confirmation_must_be_match")
})

export default editUserCredentialFormValidationSchema
