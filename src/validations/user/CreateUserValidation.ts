import * as Yup from "yup";

const createUserFormValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .required('error.email_required'),
    profile: Yup
        .object()
        .shape({
            title: Yup
                .string()
                .required('error.title_required'),
            firstName: Yup
                .string()
                .required('error.first_name_required'),
            lastName: Yup
                .string()
                .required('error.last_name_required'),
            address1: Yup
                .string()
                .required('error.address_required')
                .min(5, 'error.address_should_be_has_minimum_5_characters'),
            city: Yup
                .string()
                .required('error.city_required'),
            stateProvince: Yup
                .string()
                .required('error.state_province_required'),
            country: Yup
                .object()
                .required('error.country_required'),
            postalCode: Yup
                .number()
                .required('error.postal_code_required'),

        }),
    role: Yup
        .object()
        .required('error.role_required')
})

export default createUserFormValidationSchema
