import {EVSInputPropType} from "../../../components/EVSInput";
import {ComponentType} from "react";
import {useFetchAllNameTitles} from "../../../hooks";
import {getNestedProperty} from "../../../help";

export type NameTitlePropType = {
    nameNameTitle?: string
    dataNameTitle?: Array<any>
    valueNameTitle?: string
    handleOnChangeNameTitle?: (value: any) => void
    touchedTitle?: boolean
    errorsTitle?: string
}

const withNameTitle = <T extends EVSInputPropType>(OriginalComponent: ComponentType<T>) => {
    return (props: T) => {
        const {data: dataNameTitle} = useFetchAllNameTitles()

        const handleOnChangeNameTitle = (value: any) => {
            props.formik.setFieldValue(props.nameNameTitle, value)
        }

        return (
            <>
                <OriginalComponent withType="NAME_TITLE"
                                   nameNameTitle={props.nameNameTitle || ''}
                                   dataNameTitle={dataNameTitle}
                                   valueNameTitle={getNestedProperty(props.formik.values, props.nameNameTitle)}
                                   handleOnChangeNameTitle={handleOnChangeNameTitle}
                                   touchedNameTitle={getNestedProperty(props.formik.touched, props.nameNameTitle)}
                                   errorsNameTitle={getNestedProperty(props.formik.errors, props.nameNameTitle)}
                                   {...props as T}/>
            </>
        );
    }
}

export default withNameTitle
