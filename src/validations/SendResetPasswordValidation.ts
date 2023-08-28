import * as Yup from "yup";

const sendResetPasswordFormValidationSchema = Yup.object({
    email: Yup.string()
        .email('error.invalid_email_format')
        .required('error.email_required')
})

export default sendResetPasswordFormValidationSchema
