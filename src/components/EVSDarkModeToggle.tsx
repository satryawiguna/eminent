import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGlobal, updateIsDarkAction} from "../store/reducers/globalSlice";

type DarkModePropType = {}

const EVSDarkModeToggle: FC<DarkModePropType> = (props) => {
    const {isDark} = useSelector(fetchGlobal)
    const dispatch = useDispatch()

    const handleDarkToggle = () => dispatch(updateIsDarkAction({
        isDark: !
            isDark
    }))

    useEffect(() => {
        document.body.classList.toggle("dark", isDark)
    }, [isDark])

    return (
        <div
            className="flex items-center text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 p-2">
            <button onClick={handleDarkToggle}>
                {isDark ? (
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                )}
            </button>
        </div>
    )
}

export default EVSDarkModeToggle

