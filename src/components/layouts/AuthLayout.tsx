import TopNavigation from "../TopNavigation";
import {useTranslation} from "react-i18next";
import {FC, ReactNode} from "react";

type AuthLayoutPropType = {
    children: ReactNode
}

const AuthLayout: FC<AuthLayoutPropType> = ({children}) => {
    const {t, i18n} = useTranslation();

    return (
        <>
            <TopNavigation t={t} i18n={i18n}/>
            <main>{children}</main>
        </>
    )
}

export default AuthLayout
