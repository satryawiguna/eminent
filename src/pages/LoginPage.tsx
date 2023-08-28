import {useDispatch} from "react-redux";
import {useLogin} from "../hooks";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import loginFormValidationSchema from "../validations/LoginValidation";
import {updateIsLoadingAction} from "../store/reducers/globalSlice";
import {Dismiss, DismissOptions} from "flowbite";
import EVSMessageAlert from "../components/EVSMessageAlert";
import {loginAction} from "../store/reducers/authSlice";
import {setHeaderAuthorization} from "../utils/HttpClient";
import {toast} from "react-toastify";
import {FC, useEffect, useState} from "react";
import {LoginRequestType} from "../types/request/auth/LoginRequestType";
import {LoginType} from "../types/LoginType";
import {GenericObjectResponseType} from "../types/response/GenericObjectResponseType";
import withSwitchAccount from "../utils/hoc/InputText/withSwitchAccount";
import EVSInput from "../components/EVSInput";
import withVisibilityPassword from "../utils/hoc/InputText/withVisibilityPassword";

const EVSInputWithSwitchAccount = withSwitchAccount(EVSInput)
const EVSInputWithVisibilityPassword = withVisibilityPassword(EVSInput)

type LoginPagePropType = {
    t: (key: any) => any
}

const LoginPage: FC<LoginPagePropType> = ({t}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isErrorLogin, setIsErrorLogin] = useState<boolean>(false)

    const InitialLoginFormValues: LoginRequestType = {
        email: '',
        password: '',
        rememberMe: []
    }

    const {
        mutate: mutateLogin,
        error: errorLogin
    } = useLogin(
        (res: GenericObjectResponseType<LoginType>) => {
            dispatch(updateIsLoadingAction({isLoading: false}))
            dispatch(loginAction({
                userInfo: {
                    userId: res.result.userId,
                    fullName: res.result.fullName,
                    email: res.result.email,
                    roles: res.result.roles
                },
                accessToken: res.result.tokens.accessToken,
                refreshToken: res.result.tokens.refreshToken
            }))

            setHeaderAuthorization(res.result.tokens.accessToken)

            navigate("/admin/dashboard", {replace: true})
        },
        (err: any) => {
            setIsErrorLogin(true)
            toast.error(err.message)
        }
    )

    const loginForm = useFormik({
        initialValues: InitialLoginFormValues,
        validationSchema: loginFormValidationSchema,
        onSubmit: async (values: LoginRequestType) => {
            dispatch(updateIsLoadingAction({isLoading: true}))

            setIsErrorLogin(false)

            mutateLogin(values)
        }
    })

    useEffect(() => {
        if (isErrorLogin) {
            const timeoutId = setTimeout(() => {
                dispatch(updateIsLoadingAction({isLoading: false}))
            }, 500)

            return () => clearTimeout(timeoutId)
        }
    }, [isErrorLogin])

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('message-alert')
        const $triggerEl: HTMLElement | null = document.getElementById('dismissing-message-alert')
        const options: DismissOptions = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out',
            onHide: () => {
                setIsErrorLogin(false)
            }
        }

        new Dismiss($targetEl, $triggerEl, options)
    })

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <h1 className="mb-12 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">TehMaster <span
                    className="text-blue-600 dark:text-blue-500">System</span>
                </h1>
                {isErrorLogin && <EVSMessageAlert t={t}
                                                  error={errorLogin}
                                                  className="sm:max-w-md"/>}
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('text.signin_to_your_account')}
                        </h1>
                        <form onSubmit={loginForm.handleSubmit} className="space-y-4 md:space-y-6">
                            {/*Email*/}
                            <EVSInputWithSwitchAccount t={t}
                                                       type="text"
                                                       name="email"
                                                       label="label.email"
                                                       placeholder="label.email"
                                                       handleOnChange={loginForm.handleChange}
                                                       handleOnBlur={loginForm.handleBlur}
                                                       value={loginForm.values.email}
                                                       touched={loginForm.touched.email}
                                                       errors={loginForm.errors.email}
                                                       formik={loginForm}
                            />

                            {/*Password*/}
                            <EVSInputWithVisibilityPassword t={t}
                                                            type="password"
                                                            name="password"
                                                            label="label.password"
                                                            placeholder="label.password"
                                                            handleOnChange={loginForm.handleChange}
                                                            handleOnBlur={loginForm.handleBlur}
                                                            value={loginForm.values.password}
                                                            touched={loginForm.touched.password}
                                                            errors={loginForm.errors.password}
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input type="checkbox"
                                               id="rememberMe"
                                               name="rememberMe"
                                               aria-describedby="rememberMe"
                                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                               onChange={loginForm.handleChange}
                                               onBlur={loginForm.handleBlur}/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="rememberMe"
                                               className="text-gray-500 dark:text-gray-300">
                                            {t('label.remember_me')}
                                        </label>
                                    </div>
                                </div>
                                <Link to={"/forgot-password"}
                                      className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300">{t('label.forgot_password')}</Link>
                            </div>
                            <button type="submit"
                                    className="btn-primary">
                                {t('label.sign_in')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
