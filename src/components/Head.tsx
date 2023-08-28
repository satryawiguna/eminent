import {Helmet} from "react-helmet";
import {fetchHead} from "../store/reducers/headSlice";
import {useSelector} from "react-redux";
import {FC} from "react";

type HeadPropType = {
    t: (key: any) => any
}
const Head: FC<HeadPropType> = ({t}) => {
    const {title, description} = useSelector(fetchHead);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title}/>
            <meta name="description" content={description}/>
            <meta name="og:title" content={title}/>
            <meta name="og:description" content={description}/>
            <link rel="icon" type="image/x-icon" href="src/components/Head"/>
        </Helmet>
    )
}

export default Head
