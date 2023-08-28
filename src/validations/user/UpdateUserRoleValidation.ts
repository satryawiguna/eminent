import * as Yup from "yup";

const editUserRoleFormValidationSchema = Yup.object().shape({
    role: Yup
        .object()
        .required('error.roles_required')
})

export default editUserRoleFormValidationSchema
