import {Drawer, DrawerInterface} from "flowbite";
import {FC, useState} from "react";

type RightNavigationPropType = {
    t: (key: any) => any
}

const RightNavigation: FC<RightNavigationPropType> = ({t}) => {
    const [isOpen, setIsOpen] = useState(false)

    const initDrawer = () => {
        const $targetEl: HTMLElement | null = document.getElementById("right-drawer")
        
        const options = {
            placement: "right",
            backdrop: false,
            bodyScrolling: false,
        }

        return {
            target: $targetEl,
            options: options,
        }
    }

    const handleDrawer = () => {
        const open = !isOpen;

        setIsOpen(open)

        const target = initDrawer().target
        const option = initDrawer().options

        const drawer: DrawerInterface = new Drawer(target, option)

        open ? drawer.show() : drawer.hide()
    }

    return (
        <>
            <div className="text-left">
                <button
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                    onClick={() => handleDrawer()}
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>
                </button>
                <div
                    id="right-drawer"
                    className="fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-700 border-l dark:border-l-0 border-gray-300"
                    tabIndex={-1}
                    aria-labelledby="drawer-right-label"
                >
                    {/*Header*/}
                    <div className="border-b border-gray-300 dark:border-gray-500">
                        <h5 className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400 p-4">
                            <svg
                                className="w-4 h-4 mr-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            {t('label.info')}
                        </h5>
                        <button
                            type="button"
                            onClick={() => handleDrawer()}
                            aria-controls="drawer-right-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                    </div>
                    {/*Timeline*/}
                    <div className="p-4 h-[40vh] overflow-y-auto">
                        <ol className="relative border-l border-gray-200 dark:border-gray-700">
                            <li className="mb-10 ml-4">
                                <div
                                    className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                <time
                                    className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February
                                    2022
                                </time>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application UI code
                                    in Tailwind CSS</h3>
                                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to
                                    over 20+ pages including a dashboard layout, charts, kanban board, calendar, and
                                    pre-order E-commerce & Marketing pages.</p>
                                <a href="src/components/RightNavigation#"
                                   className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn
                                    more <svg className="w-3 h-3 ml-2" aria-hidden="true"
                                              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg></a>
                            </li>
                            <li className="mb-10 ml-4">
                                <div
                                    className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                <time
                                    className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March
                                    2022
                                </time>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Marketing UI design
                                    in Figma</h3>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages
                                    and components are first designed in Figma and we keep a parity between the two
                                    versions even as we update the project.</p>
                            </li>
                            <li className="ml-4">
                                <div
                                    className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                <time
                                    className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April
                                    2022
                                </time>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">E-Commerce UI code
                                    in Tailwind CSS</h3>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with
                                    dozens of web components and interactive elements built on top of Tailwind CSS.</p>
                            </li>
                        </ol>
                    </div>
                    {/*Header*/}
                    <div className="border-y border-gray-300 dark:border-gray-500">
                        <h5 className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400 p-4">
                            <svg
                                className="w-4 h-4 mr-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            {t('label.online')}
                        </h5>
                        <button
                            type="button"
                            onClick={() => handleDrawer()}
                            aria-controls="drawer-right-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                    </div>
                    {/*Online*/}
                    <div className="p-4">

                        <ul role="list" className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full"
                                             src="/docs/images/people/profile-picture-5.jpg" alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                            Neil Sims
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@flowbite.com
                                        </p>
                                    </div>
                                    <span
                                        className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                Available
            </span>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full"
                                             src="/docs/images/people/profile-picture-4.jpg" alt="Neil image"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                            Bonnie Green
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@flowbite.com
                                        </p>
                                    </div>
                                    <span
                                        className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                Unavailable
            </span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}

export default RightNavigation;
