import {FC, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ChangePasswordRequestType} from "../types/request/auth/ChangePasswordRequestType";
import {toast} from "react-toastify";
import {useChangePassword} from "../hooks";
import {updateIsLoadingAction} from "../store/reducers/globalSlice";
import {useFormik} from "formik";
import changePasswordFormValidationSchema from "../validations/ChangePasswordValidation";
import EVSMessageAlert from "../components/EVSMessageAlert";
import {useDispatch} from "react-redux";
import {Dismiss, DismissOptions} from "flowbite";
import withVisibilityPassword from "../utils/hoc/InputText/withVisibilityPassword";
import EVSInput from "../components/EVSInput";

type ChangePasswordPropType = {
    t: (key: any) => any
}

const EVSInputWithVisibilityPassword = withVisibilityPassword(EVSInput)

const ChangePasswordPage: FC<ChangePasswordPropType> = ({t}) => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userId = queryParams.get('userId')
    const resetToken = queryParams.get('resetToken')

    const [isErrorChangePassword, setIsErrorChangePassword] = useState<boolean>(false)

    const InitialChangePasswordFormValues: ChangePasswordRequestType = {
        resetToken: resetToken ?? '',
        newPassword: '',
        passwordConfirmation: ''
    }

    const {
        mutate: mutateChangePassword,
        error: errorChangePassword
    } = useChangePassword(
        (res: boolean) => {
            navigate("/login", {replace: true})
        },
        (err: any) => {
            setIsErrorChangePassword(true)
            toast.error(err.message)
        }
    )

    const changePasswordForm = useFormik({
        initialValues: InitialChangePasswordFormValues,
        validationSchema: changePasswordFormValidationSchema,
        onSubmit: async (values: ChangePasswordRequestType) => {
            dispatch(updateIsLoadingAction({isLoading: true}))

            mutateChangePassword([userId, values])
        }
    })

    useEffect(() => {
        if (isErrorChangePassword) {
            const timeoutId = setTimeout(() => {
                dispatch(updateIsLoadingAction({isLoading: false}))
            }, 500)

            return () => clearTimeout(timeoutId)
        }
    }, [isErrorChangePassword])

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('message-alert')
        const $triggerEl: HTMLElement | null = document.getElementById('dismissing-message-alert')
        const options: DismissOptions = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out',
            onHide: () => {
                setIsErrorChangePassword(false)
            }
        }

        new Dismiss($targetEl, $triggerEl, options)
    })

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                {isErrorChangePassword && <EVSMessageAlert t={t}
                                                           error={errorChangePassword}
                                                           className="sm:max-w-md"/>}
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('text.send_reset_password')}
                        </h1>
                        <form onSubmit={changePasswordForm.handleSubmit} className="space-y-4 md:space-y-6">
                            {/*New Password*/}
                            <EVSInputWithVisibilityPassword t={t}
                                                            type="password"
                                                            name="newPassword"
                                                            label="label.new_password"
                                                            placeholder="label.new_password"
                                                            handleOnChange={changePasswordForm.handleChange}
                                                            handleOnBlur={changePasswordForm.handleBlur}
                                                            value={changePasswordForm.values.newPassword}
                                                            touched={changePasswordForm.touched.newPassword}
                                                            errors={changePasswordForm.errors.newPassword}
                            />

                            {/*New Password Confirmation*/}
                            <EVSInputWithVisibilityPassword t={t}
                                                            type="password"
                                                            name="passwordConfirmation"
                                                            label="label.password_confirmation"
                                                            placeholder="label.password_confirmation"
                                                            handleOnChange={changePasswordForm.handleChange}
                                                            handleOnBlur={changePasswordForm.handleBlur}
                                                            value={changePasswordForm.values.passwordConfirmation}
                                                            touched={changePasswordForm.touched.passwordConfirmation}
                                                            errors={changePasswordForm.errors.passwordConfirmation}
                            />

                            <div className="flex items-center justify-between">
                                <button type="submit"
                                        className="btn-primary">
                                    {t('label.change_password')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChangePasswordPage
