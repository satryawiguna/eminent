import {FC} from "react";
import DatePicker from "react-widgets/DatePicker";

export type EVSDatePickerPropType = {
    t: (key: any) => any,
    name: string,
    label?: string,
    placeholder?: string,
    className?: string,
    handleOnChange: (value: any) => void,
    defaultValue?: Date | null,
    valueFormat?: any,
    valueEditFormat?: any,
    valueDisplayFormat?: any,
    includeTime?: boolean,
    max?: Date,
    min?: Date,
    touched?: boolean,
    errors?: string
}

const EVSDatePicker: FC<EVSDatePickerPropType> = ({
                                                      t,
                                                      label,
                                                      name,
                                                      placeholder,
                                                      className,
                                                      handleOnChange,
                                                      defaultValue,
                                                      valueFormat = {dateStyle: "medium"},
                                                      valueEditFormat,
                                                      valueDisplayFormat,
                                                      includeTime = false,
                                                      max,
                                                      min,
                                                      touched,
                                                      errors
                                                  }) => {
    return (
        <div className={className}>
            {label && <label htmlFor={name}
                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t(`${label}`)}
            </label>}
            <DatePicker
                name={name}
                placeholder={placeholder}
                className=""
                onChange={handleOnChange}
                defaultValue={defaultValue}
                valueFormat={valueFormat}
                valueEditFormat={valueEditFormat}
                valueDisplayFormat={valueDisplayFormat}
                {...(includeTime ? {includeTime: true} : ``)}
                max={max}
                min={min}
            />
            <div className="error-text">
                {(touched && errors) && <span>{t(errors)}</span>}
            </div>
        </div>
    )
}

export default EVSDatePicker
