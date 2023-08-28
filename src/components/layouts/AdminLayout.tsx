import TopNavigation from "../TopNavigation";
import SideNavigation from "../SideNavigation";
import {useTranslation} from "react-i18next";
import {FC, ReactNode} from "react";

type AdminLayoutPropType = {
    children: ReactNode
}
const AdminLayout: FC<AdminLayoutPropType> = ({children}) => {
    const {t, i18n} = useTranslation()

    return (
        <>
            <TopNavigation t={t} i18n={i18n}/>
            <SideNavigation t={t}/>
            <main>
                <div className="p-4 sm:ml-64 bg-white dark:bg-gray-900 min-h-screen overflow-auto">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminLayout
