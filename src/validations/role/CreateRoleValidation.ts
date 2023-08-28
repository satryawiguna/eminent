import * as Yup from "yup";

const createRoleFormValidationSchema = Yup.object({
    title: Yup.string()
        .required('error.title_required')
})

export default createRoleFormValidationSchema
