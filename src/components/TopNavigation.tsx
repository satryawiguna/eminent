import {useSelector} from "react-redux";
import {fetchAuth} from "../store/reducers/authSlice";
import EVSDarkModeToggle from "./EVSDarkModeToggle";
import EVSLanguageSelector from "./EVSLanguageSelector";
import EVSNotificationToggle from "./EVSNotificationToggle";
import EVSApplicationToggle from "./EVSApplicationToggle";
import {FC} from "react";

type TopNavigationPropType = {
    t: (key: any) => any
    i18n: any
}

const TopNavigation: FC<TopNavigationPropType> = ({t, i18n}) => {
    const {isLogged} = useSelector(fetchAuth)

    return isLogged ? (
        <nav
            className="top-nav-wrapper">
            <div className="top-nav">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd"
                                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="src/components/TopNavigation#"
                           className="flex ml-2 md:mr-24">
                                <span
                                    className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    TehMaster <span className="text-blue-600 dark:text-blue-500">System</span>
                                </span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ml-3 gap-x-2">
                            <div className="relative mr-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="search-navbar"
                                       className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Search..."/>
                            </div>
                            <EVSNotificationToggle t={t}/>
                            <EVSApplicationToggle t={t}/>
                            <EVSDarkModeToggle/>
                            <EVSLanguageSelector t={t} i18n={i18n}/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    ) : (
        <nav className="top-nav-wrapper-mobile">
            <div className="max-w-screen-xl flex flex-row-reverse items-center mx-auto p-4 gap-x-2">
                <EVSDarkModeToggle/>
                <EVSLanguageSelector t={t} i18n={i18n}/>
            </div>
        </nav>
    );
};

export default TopNavigation;
