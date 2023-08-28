import useBreadcrumbs from "use-react-router-breadcrumbs";
import {Link} from "react-router-dom";
import {FC} from "react";
import {useShowUser} from "../hooks";

type BreadcrumbPropType = {
    t: (key: any) => any,
}

const EVSBreadcrumb: FC<BreadcrumbPropType> = ({t}) => {
    const UserBreadcrumb = ({match}: any) => {
        const {data: dataUser} = useShowUser(match.params.userId)

        return (
            <span>{dataUser?.result.profile.firstName + ` ` + dataUser?.result.profile.lastName}</span>
        )

    }

    const routes = [
        {path: "/admin/user/add", breadcrumb: "add"},
        {path: "/admin/user/:userId", breadcrumb: UserBreadcrumb}
    ]
    const breadcrumbs = useBreadcrumbs(routes)

    return (
        <nav className="flex" aria-label="EVSBreadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {breadcrumbs.map(({breadcrumb, match}, index) => (
                    (index > 0) &&
                    <li key={index} className={(index > 1) ? "flex items-center" : "inline-flex items-center"}>
                        <Link to={match.pathname || ""}
                              className={(index > 1) ? "flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white" : "inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"}>
                            {(index < 2) ?
                                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor"
                                     viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg> :
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>}
                            {breadcrumb}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default EVSBreadcrumb
