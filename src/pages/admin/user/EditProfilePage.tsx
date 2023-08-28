import EVSBreadcrumb from "../../../components/EVSBreadcrumb";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {FC, useEffect, useState} from "react";
import editUserProfileFormValidationSchema from "../../../validations/user/UpdateUserProfileValidation";
import {useFetchAllCountries, useShowUser, useUpdateUserPassword, useUpdateUserProfile} from "../../../hooks";
import EVSMessageAlert from "../../../components/EVSMessageAlert";
import {updateIsLoadingAction} from "../../../store/reducers/globalSlice";
import {toast} from "react-toastify";
import {fetchAuth} from "../../../store/reducers/authSlice";
import editUserCredentialFormValidationSchema from "../../../validations/user/UpdateUserCredentialValidation";
import {UpdateUserCredentialRequestType} from "../../../types/request/user/UpdateUserCredentialRequestType";
import {UpdateUserProfileRequestType} from "../../../types/request/user/UpdateUserProfileRequestType";
import {Dismiss, DismissOptions} from "flowbite";
import {ProfileType} from "../../../types/ProfileType";
import {GenericObjectResponseType} from "../../../types/response/GenericObjectResponseType";
import EVSInput from "../../../components/EVSInput";
import withNameTitle from "../../../utils/hoc/InputText/withNameTitle";
import EVSTextArea from "../../../components/EVSTextArea";
import EVSComboBox from "../../../components/EVSComboBox";
import withVisibilityPassword from "../../../utils/hoc/InputText/withVisibilityPassword";

const EVSInputWithNameTitle = withNameTitle(EVSInput)
const EVSInputWithVisibilityPassword = withVisibilityPassword(EVSInput)

type EditProfilePagePropType = {
    t: (key: any) => any
}

const EditProfilePage: FC<EditProfilePagePropType> = ({t}) => {
    const dispatch = useDispatch()

    const {userInfo} = useSelector(fetchAuth)

    const {data: dataUserProfile, refetch: refetchUserProfile} = useShowUser(userInfo.userId)
    const {data: dataCountry, isLoading: isLoadingCountry} = useFetchAllCountries()

    const [isErrorUpdateUserProfile, setIsErrorUpdateUserProfile] = useState<boolean>(false)
    const [isErrorUpdateUserCredential, setIsErrorUpdateUserCredential] = useState<boolean>(false)

    const InitialEditProfileFormValues: UpdateUserProfileRequestType = {
        title: dataUserProfile?.result.profile.title || '',
        firstName: dataUserProfile?.result.profile.firstName || '',
        lastName: dataUserProfile?.result.profile.lastName || '',
        address1: dataUserProfile?.result.profile.address1 || '',
        city: dataUserProfile?.result.profile.city || '',
        stateProvince: dataUserProfile?.result.profile.stateProvince || '',
        country: dataUserProfile?.result.profile.country || null,
        postalCode: dataUserProfile?.result.profile.postalCode || ''
    }

    const InitialEditCredentialFormValues: UpdateUserCredentialRequestType = {
        oldPassword: '',
        newPassword: '',
        passwordConfirmation: ''
    }

    const {
        mutate: mutateUpdateUserProfile,
        error: errorUpdateUserProfile
    } = useUpdateUserProfile(
        (res: GenericObjectResponseType<Partial<ProfileType>>) => {
            dispatch(updateIsLoadingAction({isLoading: false}))

            toast.success(t('text.edit_user_profile_success'));

            refetchUserProfile()
        },
        (err: any) => {
            setIsErrorUpdateUserProfile(true)
            toast.error(err.message)
        }
    )

    const {
        mutate: mutateUpdateUserCredential,
        error: errorUpdateUserCredential
    } = useUpdateUserPassword(
        (res: boolean) => {
            dispatch(updateIsLoadingAction({isLoading: false}))

            toast.success(t('text.edit_user_credential_success'))

            editUserCredentialForm.resetForm()
        },
        (err: any) => {
            setIsErrorUpdateUserCredential(true)
            toast.error(err.message)
        }
    )

    const editUserProfileForm = useFormik({
        initialValues: InitialEditProfileFormValues,
        validationSchema: editUserProfileFormValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values: UpdateUserProfileRequestType) => {
            dispatch(updateIsLoadingAction({isLoading: true}))

            values.countryId = values.country?.id

            mutateUpdateUserProfile([userInfo.userId, dataUserProfile?.result.profile.id, values])
        }
    })

    const editUserCredentialForm = useFormik({
        initialValues: InitialEditCredentialFormValues,
        validationSchema: editUserCredentialFormValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values: UpdateUserCredentialRequestType) => {
            mutateUpdateUserCredential([userInfo.userId, values])
        }
    })

    useEffect(() => {
        if (isErrorUpdateUserProfile || isErrorUpdateUserCredential) {
            const timeoutId = setTimeout(() => {
                dispatch(updateIsLoadingAction({isLoading: false}));
            }, 500);

            return () => clearTimeout(timeoutId)
        }
    }, [isErrorUpdateUserProfile, isErrorUpdateUserCredential])

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('message-alert')
        const $triggerEl: HTMLElement | null = document.getElementById('dismissing-message-alert')
        const options: DismissOptions = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out',
            onHide: () => {
                setIsErrorUpdateUserProfile(false)
                setIsErrorUpdateUserCredential(false)
            }
        }

        new Dismiss($targetEl, $triggerEl, options)
    })

    return (
        <>
            <EVSBreadcrumb t={t}/>
            {isErrorUpdateUserProfile && <EVSMessageAlert t={t} error={errorUpdateUserProfile} className="mt-6"/>}
            {isErrorUpdateUserCredential && <EVSMessageAlert t={t} error={errorUpdateUserCredential} className="mt-6"/>}
            <div className="rounded bg-gray-50 dark:bg-gray-800 mb-4 mt-8 p-8">
                <h2 className="text-4xl font-extrabold dark:text-white mb-10">{t('text.edit_profile')}</h2>
                <form onSubmit={editUserProfileForm.handleSubmit}
                      className="space-y-4 md:space-y-6 lg:w-3/4 md:w-full">
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
                                               formik={editUserProfileForm}
                        />

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
                                  type="text"
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
                    <div className="inline-flex">
                        <button type="submit"
                                className="btn-primary w-full lg:w-min">
                            {t('label.update_profile')}
                        </button>
                    </div>
                </form>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                <form onSubmit={editUserCredentialForm.handleSubmit}
                      className="space-y-4 md:space-y-6 lg:w-3/4 md:w-full">
                    {/*Two Columns*/}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/*Old Password*/}
                        <EVSInputWithVisibilityPassword t={t}
                                                        type="password"
                                                        name="oldPassword"
                                                        label="label.old_password"
                                                        placeholder="label.old_password"
                                                        handleOnChange={editUserCredentialForm.handleChange}
                                                        handleOnBlur={editUserCredentialForm.handleBlur}
                                                        value={editUserCredentialForm.values.oldPassword}
                                                        touched={editUserCredentialForm.touched.oldPassword}
                                                        errors={editUserCredentialForm.errors.oldPassword}/>

                        <div></div>

                        {/*New Password*/}
                        <EVSInputWithVisibilityPassword t={t}
                                                        type="password"
                                                        name="newPassword"
                                                        label="label.new_password"
                                                        placeholder="label.new_password"
                                                        handleOnChange={editUserCredentialForm.handleChange}
                                                        handleOnBlur={editUserCredentialForm.handleBlur}
                                                        value={editUserCredentialForm.values.newPassword}
                                                        touched={editUserCredentialForm.touched.newPassword}
                                                        errors={editUserCredentialForm.errors.newPassword}/>

                        <div></div>

                        {/*Confirm Password*/}
                        <EVSInputWithVisibilityPassword t={t}
                                                        type="password"
                                                        name="passwordConfirmation"
                                                        label="label.password_confirmation"
                                                        placeholder="label.password_confirmation"
                                                        handleOnChange={editUserCredentialForm.handleChange}
                                                        handleOnBlur={editUserCredentialForm.handleBlur}
                                                        value={editUserCredentialForm.values.passwordConfirmation}
                                                        touched={editUserCredentialForm.touched.passwordConfirmation}
                                                        errors={editUserCredentialForm.errors.passwordConfirmation}/>
                    </div>

                    {/*Button*/}
                    <div className="inline-flex">
                        <button type="submit"
                                className="btn-primary w-full lg:w-min">
                            {t('label.update_credential')}
                        </button>
                    </div>
                </form>
            </div>
            <pre className="dark:text-white">{JSON.stringify(editUserProfileForm.values, null, 2)}</pre>
            <pre className="dark:text-white">{JSON.stringify(editUserCredentialForm.values, null, 2)}</pre>
        </>
    )
}

export default EditProfilePage
