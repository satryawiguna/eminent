import EVSBreadcrumb from "../../../components/EVSBreadcrumb";
import {useDispatch} from "react-redux";
import {
    useFetchAllCountries,
    useFetchAllNameTitles,
    useFetchAllRoles,
    useShowUser,
    useUpdateUserProfile,
    useUpdateUserRole
} from "../../../hooks";
import {useBeforeUnload, useNavigate, useParams} from "react-router-dom";
import {FC, useCallback, useEffect, useState} from "react";
import {UserType} from "../../../types/UserType";
import {updateIsLoadingAction} from "../../../store/reducers/globalSlice";
import {useFormik} from "formik";
import EVSMessageAlert from "../../../components/EVSMessageAlert";
import {Dismiss, DismissOptions} from "flowbite";
import {toast} from "react-toastify";
import {UpdateUserRoleRequestType} from "../../../types/request/user/UpdateUserRoleRequestType";
import withNameTitle from "../../../utils/hoc/InputText/withNameTitle";
import EVSInput from "../../../components/EVSInput";
import EVSTextArea from "../../../components/EVSTextArea";
import EVSComboBox from "../../../components/EVSComboBox";
import EVSDropdownList from "../../../components/EVSDropdownList";
import {UpdateUserProfileRequestType} from "../../../types/request/user/UpdateUserProfileRequestType";
import editUserProfileFormValidationSchema from "../../../validations/user/UpdateUserProfileValidation";
import editUserRoleFormValidationSchema from "../../../validations/user/UpdateUserRoleValidation";

const EVSInputWithNameTitle = withNameTitle(EVSInput)

type EditUserPagePropType = {
    t: (key: any) => any
}

const EditUserPage: FC<EditUserPagePropType> = ({t}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [isErrorUpdateUserProfile, setIsErrorUpdateUserProfile] = useState<boolean>(false)
    const [isErrorUpdateUserRole, setIsErrorUpdateUserRole] = useState<boolean>(false)
    const [formDirty, setFormDirty] = useState<boolean>(false)


    const {userId} = useParams()

    if (!userId) {
        return false
    }

    const {data: dataUser} = useShowUser(userId)
    const {data: dataNameTitle} = useFetchAllNameTitles()
    const {data: dataCountry, isLoading: isLoadingCountry} = useFetchAllCountries()
    const {data: dataRole} = useFetchAllRoles()

    const InitialEditUserProfileFormValue: UpdateUserProfileRequestType = {
        title: dataUser?.result.profile.title || '',
        firstName: dataUser?.result.profile.firstName || '',
        lastName: dataUser?.result.profile.lastName || '',
        address1: dataUser?.result.profile.address1 || '',
        city: dataUser?.result.profile.city || '',
        stateProvince: dataUser?.result.profile.stateProvince || '',
        country: dataUser?.result.profile.country || '',
        postalCode: dataUser?.result.profile.postalCode || ''
    }

    const IntialEditUserRoleFormValue: UpdateUserRoleRequestType = {
        role: dataUser?.result.role || ''
    }

    const {
        mutate: mutateUpdateUserProfile,
        error: errorUpdateUserProfile
    } = useUpdateUserProfile(
        (res: UserType) => {
            dispatch(updateIsLoadingAction({isLoading: false}))

            toast.success(t('text.edit_user_profile_success'))

            editUserProfileForm.resetForm()
            editUserRoleForm.resetForm()

            navigate('/admin/user')
        },
        (err: any) => {
            setIsErrorUpdateUserProfile(true)
            toast.error(err.message)
        }
    )

    const {
        mutate: mutateUpdateUserRole,
        error: errorUpdateUserRole
    } = useUpdateUserRole(
        (res: UserType) => {
            dispatch(updateIsLoadingAction({isLoading: false}))

            toast.success(t('text.edit_user_role_success'))

            editUserProfileForm.resetForm()
            editUserRoleForm.resetForm()

            navigate('/admin/user')
        },
        (err: any) => {
            setIsErrorUpdateUserRole(true)
            toast.error(err.message)
        }
    )

    const editUserProfileForm = useFormik({
        initialValues: InitialEditUserProfileFormValue,
        validationSchema: editUserProfileFormValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values: UpdateUserProfileRequestType) => {
            dispatch(updateIsLoadingAction({isLoading: true}))

            setFormDirty(false)

            mutateUpdateUserProfile([userId, dataUser?.result.profile.id, values])
        }
    })

    const editUserRoleForm = useFormik({
        initialValues: IntialEditUserRoleFormValue,
        validationSchema: editUserRoleFormValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values: UpdateUserRoleRequestType) => {
            dispatch(updateIsLoadingAction({isLoading: true}))

            setFormDirty(false)

            mutateUpdateUserRole([userId, dataUser?.result.role.id, values])
        }
    })

    useEffect(() => {
        setFormDirty(editUserProfileForm.dirty)
    }, [editUserProfileForm.dirty])

    useEffect(() => {
        setFormDirty(editUserRoleForm.dirty)
    }, [editUserRoleForm.dirty])

    useEffect(() => {
        if (isErrorUpdateUserProfile || isErrorUpdateUserRole) {
            const timeoutId = setTimeout(() => {
                dispatch(updateIsLoadingAction({isLoading: false}));
            }, 500);

            return () => clearTimeout(timeoutId)
        }
    }, [isErrorUpdateUserProfile, isErrorUpdateUserRole])

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('message-alert')
        const $triggerEl: HTMLElement | null = document.getElementById('dismissing-message-alert')
        const options: DismissOptions = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out',
            onHide: () => {
                setIsErrorUpdateUserProfile(false)
                setIsErrorUpdateUserRole(false)
            }
        }

        new Dismiss($targetEl, $triggerEl, options)
    }, [])

    useBeforeUnload(
        useCallback((e) => {
            if (formDirty) {
                e.preventDefault()
                e.returnValue = ''
            }

        }, [formDirty])
    )

    return (
        <>
            <EVSBreadcrumb t={t}/>
            {isErrorUpdateUserProfile && <EVSMessageAlert t={t} error={errorUpdateUserProfile} className="mt-6"/>}
            {isErrorUpdateUserRole && <EVSMessageAlert t={t} error={errorUpdateUserRole} className="mt-6"/>}
            <div className="rounded bg-gray-50 dark:bg-gray-800 mb-4 mt-8 p-8">
                <h2 className="text-4xl font-extrabold dark:text-white mb-10">{t('text.edit_user')}</h2>
                <form onSubmit={editUserProfileForm.handleSubmit}
                      className="space-y-4 md:space-y-6  lg:w-3/4 md:w-full">
                    {/*Two Columns*/}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/*Name Title & First Name*/}
                        <EVSInputWithNameTitle t={t}
                                               type="text"
                                               name="firstName"
                                               label="label.first_name"
                                               placeholder="label.first_name"
                                               handleOnChange={editUserProfileForm.handleChange}
                                               handleOnBlur={editUserProfileForm.handleBlur}
                                               value={editUserProfileForm.values.firstName}
                                               touched={editUserProfileForm.touched.firstName}
                                               errors={editUserProfileForm.errors.firstName}
                                               nameNameTitle="title"
                                               formik={editUserProfileForm}/>


                        {/*Last Name*/}
                        <EVSInput t={t}
                                  type="text"
                                  name="lastName"
                                  label="label.last_name"
                                  placeholder="label.last_name"
                                  handleOnChange={editUserProfileForm.handleChange}
                                  handleOnBlur={editUserProfileForm.handleBlur}
                                  value={editUserProfileForm.values.lastName}
                                  touched={editUserProfileForm.touched.lastName}
                                  errors={editUserProfileForm.errors.lastName}/>

                        {/*Address*/}
                        <EVSTextArea t={t}
                                     name="address1"
                                     label="label.address"
                                     placeholder="label.address"
                                     className="md:col-span-2"
                                     rows={3}
                                     handleOnChange={editUserProfileForm.handleChange}
                                     handleOnBlur={editUserProfileForm.handleBlur}
                                     value={editUserProfileForm.values.address1}
                                     touched={editUserProfileForm.touched.address1}
                                     errors={editUserProfileForm.errors.address1}/>

                        {/*City*/}
                        <EVSInput t={t}
                                  type="text"
                                  name="city"
                                  label="label.city"
                                  placeholder="label.city"
                                  handleOnChange={editUserProfileForm.handleChange}
                                  handleOnBlur={editUserProfileForm.handleBlur}
                                  value={editUserProfileForm.values.city}
                                  touched={editUserProfileForm.touched.city}
                                  errors={editUserProfileForm.errors.city}/>

                        {/*State or Province*/}
                        <EVSInput t={t}
                                  type="text"
                                  name="stateProvince"
                                  label="label.state_or_province"
                                  placeholder="label.state_or_province"
                                  handleOnChange={editUserProfileForm.handleChange}
                                  handleOnBlur={editUserProfileForm.handleBlur}
                                  value={editUserProfileForm.values.stateProvince}
                                  touched={editUserProfileForm.touched.stateProvince}
                                  errors={editUserProfileForm.errors.stateProvince}/>

                        {/*Country*/}
                        <EVSComboBox t={t}
                                     name="country"
                                     label="label.country"
                                     placeholder="label.country"
                                     data={dataCountry?.result}
                                     isLoading={isLoadingCountry}
                                     dataKey="id"
                                     textField="name"
                                     handleOnChange={(value: any) => {
                                         editUserProfileForm.setFieldValue('country', value)
                                     }}
                                     value={editUserProfileForm.values.country?.name}
                                     touched={editUserProfileForm.touched.country}
                                     errors={editUserProfileForm.errors.country}/>

                        {/*Postal Code*/}
                        <EVSInput t={t}
                                  type="number"
                                  name="postalCode"
                                  label="label.postal_code"
                                  placeholder="label.postal_code"
                                  handleOnChange={editUserProfileForm.handleChange}
                                  handleOnBlur={editUserProfileForm.handleBlur}
                                  value={editUserProfileForm.values.postalCode}
                                  touched={editUserProfileForm.touched.postalCode}
                                  errors={editUserProfileForm.errors.postalCode}/>

                    </div>

                    {/*Button*/}
                    <div className="inline-flex gap-2">
                        <button type="submit"
                                className="btn-primary w-full lg:w-min">
                            {t('label.update')}
                        </button>
                        <button type="button"
                                className="btn-light w-full lg:w-min"
                                onClick={() => {
                                    navigate('/admin/user')
                                }}>
                            {t('label.cancel')}
                        </button>
                    </div>
                </form>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                <form onSubmit={editUserRoleForm.handleSubmit}
                      className="space-y-4 md:space-y-6 lg:w-3/4 md:w-full">
                    {/*Two Columns*/}
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-4">
                        {/*Roles*/}
                        <EVSDropdownList t={t}
                                         name="role"
                                         data={dataRole?.result}
                                         dataKey="id"
                                         textField="name"
                                         handleOnChange={(value: any) => {
                                             editUserRoleForm.setFieldValue('role', value)
                                         }}
                                         value={editUserRoleForm.values.role?.name}
                                         touched={editUserRoleForm.touched.role?.name}
                                         errors={editUserRoleForm.errors.role?.name}/>
                    </div>

                    {/*Button*/}
                    <div className="inline-flex gap-2">
                        <button type="submit"
                                className="btn-primary w-full lg:w-min">
                            {t('label.update')}
                        </button>
                        <button type="button"
                                className="btn-light w-full lg:w-min"
                                onClick={() => {
                                    navigate('/admin/user')
                                }}>
                            {t('label.cancel')}
                        </button>
                    </div>
                </form>
            </div>
            <pre className="dark:text-white">{JSON.stringify(editUserProfileForm.values, null, 2)}</pre>
            <pre className="dark:text-white">{JSON.stringify(editUserRoleForm.values, null, 2)}</pre>
        </>
    )
}

export default EditUserPage
