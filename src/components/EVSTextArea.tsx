import {ChangeEvent, FC, FocusEvent} from "react";

export type EVSTextAreaPropType = {
    t: (key: any) => any,
    name: string,
    label?: string,
    placeholder?: string,
    className?: string,
    rows?: number,
    handleOnChange: (e: ChangeEvent<any>) => void,
    handleOnBlur?: (e: FocusEvent<any>) => void,
    value?: string | number,
    touched?: boolean,
    errors?: string
}

const EVSTextArea: FC<EVSTextAreaPropType> = ({
                                                  t,
                                                  label,
                                                  name,
                                                  placeholder,
                                                  className,
                                                  rows,
                                                  handleOnChange,
                                                  handleOnBlur,
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
            <textarea name={name}
                      id={name}
                      className="input-primary"
                      placeholder={t(`${placeholder}`)}
                      rows={rows}
                      onChange={handleOnChange}
                      onBlur={handleOnBlur}
                      value={value}>
                            </textarea>
            <div className="error-text">
                {(touched && errors) && <span>{t(errors)}</span>}
            </div>
        </div>
    )
}

export default EVSTextArea
