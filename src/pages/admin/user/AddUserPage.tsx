import {FC, useCallback, useEffect, useState} from "react";
import EVSBreadcrumb from "../../../components/EVSBreadcrumb";
import EVSMessageAlert from "../../../components/EVSMessageAlert";
import {useBeforeUnload, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useFetchAllCountries, useFetchAllRoles, useStoreUser} from "../../../hooks";
import {Dismiss, DismissOptions} from "flowbite";
import {useFormik} from "formik";
import {CreateUserRequestType} from "../../../types/request/user/CreateUserRequestType";
import createUserFormValidationSchema from "../../../validations/user/CreateUserValidation";
import {updateIsLoadingAction} from "../../../store/reducers/globalSlice";
import {toast} from "react-toastify";
import {UserType} from "../../../types/UserType";
import withNameTitle from "../../../utils/hoc/InputText/withNameTitle";
import EVSInput from "../../../components/EVSInput";
import EVSTextArea from "../../../components/EVSTextArea";
import EVSComboBox from "../../../components/EVSComboBox";
import EVSDropdownList from "../../../components/EVSDropdownList";
import {GenericObjectResponseType} from "../../../types/response/GenericObjectResponseType";

const EVSInputWithNameTitle = withNameTitle(EVSInput)

type AddUserPagePropType = {
    t: (key: any) => any
}

const AddUserPage: FC<AddUserPagePropType> = ({t}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isErrorStoreUser, setIsErrorStoreUser] = useState<boolean>(false)
    const [formDirty, setFormDirty] = useState<boolean>(false)

    const {
        data: dataCountry,
        isLoading: isLoadingCountry
    } = useFetchAllCountries()
    const {data: dataRole} = useFetchAllRoles()

    const InitialAddUserFormValue: CreateUserRequestType = {
        email: '',
        profile: {
            title: '',
            firstName: '',
            lastName: '',
            address1: '',
            city: '',
            stateProvince: '',
            country: null,
            postalCode: ''
        },
        role: null
    }

    const {
        mutate: mutateStoreUser,
        error: errorStoreUser
    } = useStoreUser(
        (res: GenericObjectResponseType<UserType>) => {
            dispatch(updateIsLoadingAction({isLoading: false}))

            toast.success(t('text.add_user_success'));
            addUserForm.resetForm();

            navigate('/admin/user')
        },
        (err: any) => {
            setIsErrorStoreUser(true)
            toast.error(err.message)
        }
    )

    const addUserForm = useFormik({
        initialValues: InitialAddUserFormValue,
        validationSchema: createUserFormValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values: CreateUserRequestType) => {
            dispatch(updateIsLoadingAction({isLoading: true}))

            values.profile.countryId = values.profile?.country?.id
            values.profile.postalCode = values.profile?.postalCode?.toString()
            values.roleId = values.role?.id

            setFormDirty(false)

            mutateStoreUser(values)
        }
    })

    useEffect(() => {
        if (isErrorStoreUser) {
            const timeoutId = setTimeout(() => {
                dispatch(updateIsLoadingAction({isLoading: false}));
            }, 500);

            return () => clearTimeout(timeoutId)
        }
    }, [isErrorStoreUser])

    useEffect(() => {
        setFormDirty(addUserForm.dirty)
    }, [addUserForm.dirty])

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('message-alert')
        const $triggerEl: HTMLElement | null = document.getElementById('dismissing-message-alert')
        const options: DismissOptions = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out',
            onHide: () => {
                setIsErrorStoreUser(false)
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
            {isErrorStoreUser && <EVSMessageAlert t={t} error={errorStoreUser} className="mt-6"/>}
            <div className="rounded bg-gray-50 dark:bg-gray-800 mb-4 mt-8 p-8">
                <h2 className="text-4xl font-extrabold dark:text-white mb-10">{t('text.add_user')}</h2>
                <form onSubmit={addUserForm.handleSubmit}
                      className="space-y-4 md:space-y-6 lg:w-3/4 md:w-full">
                    {/*Two Columns*/}
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {/*Name Title & First Name*/}
                        <EVSInputWithNameTitle t={t}
                                               type="text"
                                               name="profile.firstName"
                                               label="label.first_name"
                                               placeholder="label.first_name"
                                               handleOnChange={addUserForm.handleChange}
                                               handleOnBlur={addUserForm.handleBlur}
                                               value={addUserForm.values.profile?.firstName}
                                               touched={addUserForm.touched.profile?.firstName}
                                               errors={addUserForm.errors.profile?.firstName}
                                               nameNameTitle="profile.title"
                                               formik={addUserForm}/>

                        {/*Last Name*/}
                        <EVSInput t={t}
                                  type="text"
                                  name="profile.lastName"
                                  label="label.last_name"
                                  placeholder="label.last_name"
                                  handleOnChange={addUserForm.handleChange}
                                  handleOnBlur={addUserForm.handleBlur}
                                  value={addUserForm.values.profile?.lastName}
                                  touched={addUserForm.touched.profile?.lastName}
                                  errors={addUserForm.errors.profile?.lastName}/>

                        {/*Address*/}
                        <EVSTextArea t={t}
                                     name="profile.address1"
                                     label="label.address"
                                     placeholder="label.address"
                                     className="md:col-span-2"
                                     rows={3}
                                     handleOnChange={addUserForm.handleChange}
                                     handleOnBlur={addUserForm.handleBlur}
                                     value={addUserForm.values.profile?.address1}
                                     touched={addUserForm.touched.profile?.address1}
                                     errors={addUserForm.errors.profile?.address1}/>

                        {/*City*/}
                        <EVSInput t={t}
                                  type="text"
                                  name="profile.city"
                                  label="label.city"
                                  placeholder="label.city"
                                  handleOnChange={addUserForm.handleChange}
                                  handleOnBlur={addUserForm.handleBlur}
                                  value={addUserForm.values.profile?.city}
                                  touched={addUserForm.touched.profile?.city}
                                  errors={addUserForm.errors.profile?.city}/>

                        {/*State or Province*/}
                        <EVSInput t={t}
                                  type="text"
                                  name="profile.stateProvince"
                                  label="label.state_or_province"
                                  placeholder="label.state_or_province"
                                  handleOnChange={addUserForm.handleChange}
                                  handleOnBlur={addUserForm.handleBlur}
                                  value={addUserForm.values.profile?.stateProvince}
                                  touched={addUserForm.touched.profile?.stateProvince}
                                  errors={addUserForm.errors.profile?.stateProvince}/>

                        {/*Country*/}
                        <EVSComboBox t={t}
                                     name="profile.country"
                                     label="label.country"
                                     placeholder="label.country"
                                     data={dataCountry?.result}
                                     isLoading={isLoadingCountry}
                                     dataKey="id"
                                     textField="name"
                                     handleOnChange={(value: any) => {
                                         addUserForm.setFieldValue('profile.country', value)
                                     }}
                                     value={addUserForm.values.profile?.country?.name}
                                     touched={addUserForm.touched.profile?.country}
                                     errors={addUserForm.errors.profile?.country}/>

                        {/*Postal Code*/}
                        <EVSInput t={t}
                                  type="number"
                                  name="profile.postalCode"
                                  label="label.postal_code"
                                  placeholder="label.postal_code"
                                  handleOnChange={addUserForm.handleChange}
                                  handleOnBlur={addUserForm.handleBlur}
                                  value={addUserForm.values.profile?.postalCode}
                                  touched={addUserForm.touched.profile?.postalCode}
                                  errors={addUserForm.errors.profile?.postalCode}/>

                    </div>

                    {/*Horizontal Line*/}
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                    {/*Two Columns*/}
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-4">
                        {/*Roles*/}
                        <EVSDropdownList t={t}
                                         name="role"
                                         label="label.role"
                                         placeholder="label.role"
                                         data={dataRole?.result}
                                         dataKey="id"
                                         textField="name"
                                         handleOnChange={(value: any) => {
                                             addUserForm.setFieldValue('role', value)
                                         }}
                                         value={addUserForm.values.role?.name}
                                         touched={addUserForm.touched.role}
                                         errors={addUserForm.errors.role}/>

                        {/*Email*/}
                        <EVSInput t={t}
                                  type="email"
                                  name="email"
                                  label="label.email"
                                  placeholder="label.email"
                                  handleOnChange={addUserForm.handleChange}
                                  handleOnBlur={addUserForm.handleBlur}
                                  value={addUserForm.values.email}
                                  touched={addUserForm.touched.email}
                                  errors={addUserForm.errors.email}/>
                    </div>

                    {/*Button*/}
                    <div className="inline-flex gap-2">
                        <button type="submit"
                                className="btn-primary w-full lg:w-min">
                            {t('label.save')}
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
            <pre className="dark:text-white">{JSON.stringify(addUserForm.values, null, 2)}</pre>
        </>
    )
}

export default AddUserPage
