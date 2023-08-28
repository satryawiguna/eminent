import EVSMessageAlert from "../components/EVSMessageAlert";
import sendResetPasswordFormValidationSchema from "../validations/SendResetPasswordValidation";
import {Link, useBeforeUnload, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateIsLoadingAction} from "../store/reducers/globalSlice";
import {useFormik} from "formik";
import {useSendResetPassword} from "../hooks";
import {FC, useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {SendResetPasswordRequestType} from "../types/request/auth/SendResetPasswordRequestType";
import EVSInput from "../components/EVSInput";
import {Dismiss, DismissOptions} from "flowbite";

type ForgotPasswordPagePropType = {
    t: (key: any) => any
}

const ForgotPasswordPage: FC<ForgotPasswordPagePropType> = ({t}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isErrorSendResetPassword, setIsErrorSendResetPassword] = useState<boolean>(false)
    const [formDirty, setFormDirty] = useState<boolean>(false)

    const {
        mutate: mutateSendResetPassword,
        error: errorSendResetPassword
    } = useSendResetPassword(
        (res: boolean) => {
            dispatch(updateIsLoadingAction({isLoading: false}))

            toast.success(t('text.password_request_change_success'));
            sendResetPasswordForm.resetForm();

            navigate("/admin/login")
        },
        (err: any) => {
            setIsErrorSendResetPassword(true)
            toast.error(err.message)
        }
    )

    const InitialSendResetPasswordFormValues: SendResetPasswordRequestType = {
        email: '',
        landingPage: `${import.meta.env.VITE_BASE_APP_URL}/change-password`
    }

    const sendResetPasswordForm = useFormik({
        initialValues: InitialSendResetPasswordFormValues,
        validationSchema: sendResetPasswordFormValidationSchema,
        onSubmit: async (values: SendResetPasswordRequestType) => {
            dispatch(updateIsLoadingAction({isLoading: true}))

            setFormDirty(false)

            mutateSendResetPassword(values)
        }
    })

    useEffect(() => {
        if (isErrorSendResetPassword) {
            const timeoutId = setTimeout(() => {
                dispatch(updateIsLoadingAction({isLoading: false}))
            }, 500)

            return () => clearTimeout(timeoutId)
        }
    }, [isErrorSendResetPassword])

    useEffect(() => {
        setFormDirty(sendResetPasswordForm.dirty)
    }, [sendResetPasswordForm.dirty])

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('message-alert')
        const $triggerEl: HTMLElement | null = document.getElementById('dismissing-message-alert')
        const options: DismissOptions = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out',
            onHide: () => {
                setIsErrorSendResetPassword(false)
            }
        }

        new Dismiss($targetEl, $triggerEl, options)
    })

    useBeforeUnload(
        useCallback((e) => {
            if (formDirty) {
                e.preventDefault()
                e.returnValue = ''
            }

        }, [formDirty])
    )


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                {isErrorSendResetPassword && <EVSMessageAlert t={t}
                                                              error={errorSendResetPassword}
                                                              className="sm:max-w-md"/>}
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('text.send_reset_password')}
                        </h1>
                        <form onSubmit={sendResetPasswordForm.handleSubmit} className="space-y-4 md:space-y-6">
                            <EVSInput t={t}
                                      type="text"
                                      name="email"
                                      label="label.email"
                                      placeholder="label.email"
                                      handleOnChange={sendResetPasswordForm.handleChange}
                                      handleOnBlur={sendResetPasswordForm.handleBlur}
                                      value={sendResetPasswordForm.values.email}
                                      touched={sendResetPasswordForm.touched.email}
                                      errors={sendResetPasswordForm.errors.email}/>

                            <div className="flex items-center justify-between">
                                <button type="submit"
                                        className="btn-primary">
                                    {t('label.send_reset_password')}
                                </button>
                                <Link to={"/login"}
                                      className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300">{t('label.back_to_login')}</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPasswordPage
