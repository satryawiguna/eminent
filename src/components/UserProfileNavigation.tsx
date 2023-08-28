import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {FC, useEffect, useState} from "react";
import {Dropdown, DropdownInterface, DropdownOptions} from "flowbite";
import {fetchAuth, logoutAction} from "../store/reducers/authSlice";
import {truncate} from "../help";

type UserProfilePropType = {
    t: (key: any) => any
}

const UserProfileNavigation: FC<UserProfilePropType> = ({t}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfo} = useSelector(fetchAuth);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [dropDownMenu, setDropDownMenu] = useState<DropdownInterface>(null)

    const LogoutSwal = withReactContent(Swal)

    const handleLogout = () => {
        LogoutSwal.fire({
            title: t('text.are_you_sure_?'),
            text: t('text.you_want_to_logout_from_system'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('text.yes_logout')
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutAction())
                navigate("/login", {replace: true})
            }
        })
    }

    useEffect(() => {
        const $targetEl: HTMLElement | null = document.getElementById('dropdownMenuTarget')
        const $triggerEl: HTMLElement | null = document.getElementById('dropdownMenuButton')

        const options: DropdownOptions = {
            placement: 'bottom',
            triggerType: 'click',
            offsetSkidding: 0,
            offsetDistance: 10,
            delay: 300
        };

        setDropDownMenu(new Dropdown($targetEl, $triggerEl, options))
    }, [])

    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-start px-4 pt-4">
                <button
                    id="dropdownMenuButton"
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                >
                    <span className="sr-only">Open dropdown</span>
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
                    id="dropdownMenuTarget"
                    className="z-10 hidden text-base list-none bg-white divide-y divide-gray-500 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2">
                        <li>
                            <Link
                                to={"/admin/edit-profile"}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                {t('menu.edit_profile')}
                            </Link>
                        </li>
                    </ul>
                    <a href="#" onClick={handleLogout}
                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        {t('menu.log_out')}
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {truncate(userInfo.fullName, 20)}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {userInfo.roles[0].name}
                </span>
            </div>
        </div>
    );
};

export default UserProfileNavigation;
