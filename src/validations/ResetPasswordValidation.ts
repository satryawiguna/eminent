import * as Yup from "yup";

const resetPasswordFormValidationSchema = Yup.object({
    oldPassword: Yup.string()
        .required('error.old_password_required'),
    newPassword: Yup.string()
        .required('error.new_password_required')
})

export default resetPasswordFormValidationSchema
