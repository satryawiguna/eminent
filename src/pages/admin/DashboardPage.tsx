import EVSBreadcrumb from "../../components/EVSBreadcrumb";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {FC} from "react";

type DashboardPagePropType = {
    t: (key: any) => any
}

const DashboardPage: FC<DashboardPagePropType> = ({t}) => {
    return (
        <>
            <EVSBreadcrumb t={t}/>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 1v16M1 9h16"/>
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 1v16M1 9h16"/>
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-center h-36 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 1v16M1 9h16"/>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage
