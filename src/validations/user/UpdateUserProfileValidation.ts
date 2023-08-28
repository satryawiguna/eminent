import * as Yup from "yup";

const editUserProfileFormValidationSchema = Yup.object().shape({
    title: Yup.string()
        .required('error.title_required'),
    firstName: Yup.string()
        .required('error.first_name_required'),
    lastName: Yup.string()
        .required('error.last_name_required'),
    address1: Yup.string()
        .nullable()
        .min(10, 'error.address_must_has_minimum_10_characters'),
    city: Yup.string()
        .nullable()
        .min(5, 'error.city_must_has_minimum_5_characters'),
    country: Yup.object()
        .required('error.country_required'),
    postalCode: Yup.string()
        .nullable()
        .min(5, 'error.postal_code_must_has_minimum_5_digits'),
})

export default editUserProfileFormValidationSchema
