import {ComponentType, useEffect, useState} from "react";
import {EVSInputPropType} from "../../../components/EVSInput";
import {TokenDecodedType} from "../../../types/TokenDecodedType";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";

const withSwitchAccount = <T extends EVSInputPropType>(OriginalComponent: ComponentType<T>) => {
    return (props: T) => {
        const location = useLocation()
        const queryParams = new URLSearchParams(location.search)
        const token = queryParams.get('token')

        const [isSwitchAccount, setIsSwitchAccount] = useState<boolean>(false)

        useEffect(() => {
            try {
                if (token) {
                    const tokenDecoded: TokenDecodedType = jwtDecode(token)

                    props.formik.setFieldValue('email', tokenDecoded.email)

                    setIsSwitchAccount(false)
                } else {
                    setIsSwitchAccount(true)
                }
            } catch (err: any) {
                toast.error(err.message)

                setIsSwitchAccount(true)
            }
        }, [])

        const handleSwitchAccount = () => {
            setIsSwitchAccount(true)

            props.formik.setFieldValue('email', '')
        }

        return (
            <>
                {isSwitchAccount ? <OriginalComponent {...props as T}/> :
                    <div className="flex items-center justify-between text-white">
                        <strong>{props.value}</strong>
                        <a
                            href="#"
                            onClick={handleSwitchAccount}
                            className="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300"
                        >
                            {props.t('label.switch_account')}
                        </a>
                    </div>
                }
            </>
        );
    }
}

export default withSwitchAccount
