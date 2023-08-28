import {FC} from "react";
import {DropdownList} from "react-widgets/cjs";

export type EVSListBoxPropType = {
    t: (key: any) => any,
    name: string,
    label?: string,
    placeholder?: string,
    className?: string,
    data: Array<any>,
    dataKey: string,
    textField: string,
    handleOnChange: (value: any) => void,
    value?: string | number,
    touched?: boolean,
    errors?: string
}

const EVSDropdownList: FC<EVSListBoxPropType> = ({
                                                     t,
                                                     label,
                                                     name,
                                                     placeholder,
                                                     className,
                                                     data,
                                                     dataKey,
                                                     textField,
                                                     handleOnChange,
                                                     value,
                                                     touched,
                                                     errors
                                                 }) => {
    return (
        <div className={className}>
            {label && <label htmlFor={name}
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t(`${label}`)}
            </label>}
            <DropdownList
                id={name}
                name="role"
                data={data}
                dataKey={dataKey}
                textField={textField}
                placeholder={t(placeholder)}
                value={value}
                onChange={handleOnChange}
            />
            <div className="error-text">
                {(touched && errors) && <span>{t(errors)}</span>}
            </div>
        </div>
    )
}

export default EVSDropdownList
