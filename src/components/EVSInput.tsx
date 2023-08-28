import {ChangeEvent, FC, FocusEvent} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {DropdownList} from "react-widgets/cjs";
import {NameTitlePropType} from "../utils/hoc/InputText/withNameTitle";
import {VisibilityPropType} from "../utils/hoc/InputText/withVisibilityPassword";
import {DynamicPropType} from "../utils/hoc/InputText/withDynamic";
import {MdAddCircleOutline} from "react-icons/md";
import {RiDeleteBin5Line} from "react-icons/ri";

export type EVSInputPropType = {
    t: (key: any) => any,
    name: string,
    type?: string,
    withType?: string
    label?: string,
    placeholder?: string,
    className?: string,
    handleOnChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    handleOnBlur?: (event: FocusEvent<HTMLInputElement>) => void,
    formik?: any,
    value?: string | number,
    touched?: boolean,
    errors?: string,
} & VisibilityPropType
    & NameTitlePropType
    & DynamicPropType

const EVSInput: FC<EVSInputPropType> = ({
                                            t,
                                            label,
                                            type,
                                            withType = 'DEFAULT',
                                            name,
                                            placeholder,
                                            className,
                                            handleOnChange,
                                            handleOnBlur,
                                            value,
                                            touched,
                                            errors,
                                            ...props
                                        }) => {

    if (withType === 'NAME_TITLE') {
        return (
            <div className={className}>
                {label && <label htmlFor={name}
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t(`${label}`)}
                </label>}
                <div className="relative flex flex-row group">
                    <DropdownList
                        id={props.nameNameTitle}
                        name={props.nameNameTitle}
                        data={props.dataNameTitle}
                        placeholder={t('label.title')}
                        value={props.valueNameTitle}
                        onChange={props.handleOnChangeNameTitle}
                        className="w-36 rounded-none name-title"
                    />
                    <input type={type}
                           id={name}
                           name={name}
                           className="with-name-title input-primary"
                           placeholder={t(`${placeholder}`)}
                           onChange={handleOnChange}
                           onBlur={handleOnBlur}
                           value={value}/>
                </div>
                <div className="error-text flex flex-col">
                    {(props.touchedTitle && props.errorsTitle) && <span>{t(props.errorsTitle)}</span>}
                    {(touched && errors) && <span>{t(errors)}</span>}
                </div>
            </div>
        )
    }

    if (withType === 'VISIBILITY_PASSWORD') {
        return (
            <div className={className}>
                {label && <label htmlFor={name}
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t(`${label}`)}
                </label>}
                <div className="relative group">
                    <input type={props.newType}
                           id={name}
                           name={name}
                           className="input-primary"
                           placeholder={t(`${placeholder}`)}
                           onChange={handleOnChange}
                           onBlur={handleOnBlur}
                           value={value}/>
                    <button type="button"
                            className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={props.onChangeVisibilityPassword}>
                        {type === 'password' ? <AiFillEyeInvisible/> : <AiFillEye/>}
                    </button>
                </div>
                <div className="error-text flex flex-col">
                    {(touched && errors) && <span>{t(errors)}</span>}
                </div>
            </div>
        )
    }

    if (withType === 'DYNAMIC') {
        return (
            <div className={className}>
                {label && <label htmlFor={name}
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t(`${label}`)}
                </label>}
                <div className="grid md:grid-cols-2 gap-4 items-start">
                    <div className="flex flex-col gap-4">
                        {(props.valueInput || []).map((item, index: number) =>
                            <div key={index}>
                                <div className="relative group">
                                    <input type="text"
                                           className="input-primary"
                                           value={item.value}
                                           onChange={(e) => props.handleOnChangeInput?.(index, e)}
                                    />
                                    <div
                                        className="flex flex-row absolute top-0 right-0 h-full">
                                        <div className="h-full p-2 dark:bg-gray-500">
                                            <input type="checkbox"
                                                   checked={item.default}
                                                   onChange={() => props.handleOnChangeCheckbox?.(index, props.selectedIndexInput === index ? -1 : index)}
                                            />
                                        </div>
                                        <button type="button"
                                                className="p-2.5 h-full text-sm font-medium text-white bg-red-700 rounded-r-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex gap-x-2"
                                                {...((props.valueInput || []).length < 2 ? {disabled: true} : '')}
                                                onClick={() => props.handleRemoveInput?.(index)}>
                                            <RiDeleteBin5Line className="h-5 w-5"/>
                                            {t('label.delete')}
                                        </button>
                                    </div>
                                </div>
                                <div className="error-text flex flex-col">
                                    {(touched && errors) && <span>{t(errors)}</span>}
                                </div>
                            </div>
                        )}
                    </div>
                    <button type="button"
                            className="btn-primary justify-self-start "
                            onClick={props.handleAddInput}>
                        <MdAddCircleOutline className="h-5 w-5"/>
                        {t('label.add')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={className}>
            {label && <label htmlFor={name}
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t(`${label}`)}
            </label>}
            <input type={type}
                   id={name}
                   name={name}
                   className="input-primary"
                   placeholder={t(`${placeholder}`)}
                   onChange={handleOnChange}
                   onBlur={handleOnBlur}
                   value={value}/>
            <div className="error-text flex flex-col">
                {(touched && errors) && <span>{t(errors)}</span>}
            </div>
        </div>
    )
}

export default EVSInput
