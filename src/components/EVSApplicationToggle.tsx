import {AiTwotoneAppstore} from "react-icons/ai";
import {SiMoneygram} from "react-icons/si";
import {FC, useEffect, useState} from "react";
import {Dropdown, DropdownInterface, DropdownOptions} from "flowbite";
import {fetchAuth} from "../store/reducers/authSlice";
import {useSelector} from "react-redux";

type ApplicationsPropType = {
    t: (key: any) => any,
}
const EVSApplicationToggle: FC<ApplicationsPropType> = ({t}) => {
    const {accessToken} = useSelector(fetchAuth)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [dropDownApp, setDropDownApp] = useState<DropdownInterface>(null)

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('appDropdownTarget')
        const $triggerEl: HTMLElement | null = document.getElementById('appDropdownButton')

        const options: DropdownOptions = {
            placement: 'bottom',
            triggerType: 'click',
            offsetSkidding: 0,
            offsetDistance: 10,
            delay: 300
        }

        setDropDownApp(new Dropdown($targetEl, $triggerEl, options))
    }, [])


    return (
        <>
            <button type="button"
                    id="appDropdownButton"
                    className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <span className="sr-only">View notifications</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
            </button>
            <div
                className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600"
                id="appDropdownTarget">
                <div
                    className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    Apps
                </div>
                <div className="grid grid-cols-3 gap-4 p-4">
                    <a href={`${import.meta.env.VITE_SALE_APP_URL}/admin/dashboard/?token=${accessToken}`}
                       className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <svg aria-hidden="true"
                             className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                             fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">Sales</div>
                    </a>
                    <a href={`${import.meta.env.VITE_FINANCE_APP_URL}/admin/dashboard/?token=${accessToken}`}
                       className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <SiMoneygram
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"/>
                        <div className="text-sm text-gray-900 dark:text-white">Finance</div>
                    </a>
                    <a href={`${import.meta.env.VITE_EVENT_CRM_APP_URL}/admin/dashboard/?token=${accessToken}`}
                       className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <svg aria-hidden="true"
                             className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                             fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                  clipRule="evenodd"></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">Event & CRM
                        </div>
                    </a>
                    <a href={`${import.meta.env.VITE_MASTER_APP_URL}/admin/dashboard/?token=${accessToken}`}
                       className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <AiTwotoneAppstore
                            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"/>
                        <div className="text-sm text-gray-900 dark:text-white">Master</div>
                    </a>
                    <a href={`${import.meta.env.VITE_HR_APP_URL}/admin/dashboard/?token=${accessToken}`}
                       className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                        <svg aria-hidden="true"
                             className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                             fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                        </svg>
                        <div className="text-sm text-gray-900 dark:text-white">HR</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default EVSApplicationToggle
