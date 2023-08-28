import {useNavigate} from "react-router-dom";
import {FC} from "react";

type NotFoundPagePropType = {
    t: (key: any) => any
}

const NotFoundPage: FC<NotFoundPagePropType> = ({t}) => {
    const navigate = useNavigate()

    const handleGoToRootPage = () => {
        navigate("/")
    }

    return (
        <div
            className="bg-gray-50 dark:bg-gray-900 min-h-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-gray-800 dark:text-white font-bold text-2xl">
                                {t('looks_like_you_have_found_the_door_way_to_the_great_nothing')}
                            </h1>
                            <p className="my-2 text-gray-800 dark:text-white">
                                {t('sorry_about_that_Please_visit_our_hom_page_to_get_where_you_need_to_go')}
                            </p>
                            <button
                                className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                                onClick={handleGoToRootPage}>
                                {t('take_me_there')}
                            </button>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png"/>
                    </div>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png"/>
            </div>
        </div>
    )

}

export default NotFoundPage
