import {FC} from "react";
import {Combobox} from "react-widgets/cjs";
import {Filter} from "react-widgets/Filter";

export type EVSComboBoxPropType = {
    t: (key: any) => any,
    name: string,
    label?: string,
    placeholder?: string,
    className?: string,
    isLoading?: boolean,
    data: Array<any>,
    dataKey: string,
    textField: string,
    handleOnChange: (value: any) => void,
    handleOnSelect?: (value: any) => void,
    filter?: Filter<any>,
    value?: any,
    touched?: boolean,
    errors?: string
}

const EVSComboBox: FC<EVSComboBoxPropType> = ({
                                                  t,
                                                  label,
                                                  name,
                                                  placeholder,
                                                  className,
                                                  data,
                                                  isLoading,
                                                  dataKey,
                                                  textField,
                                                  handleOnChange,
                                                  handleOnSelect,
                                                  filter,
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
            <Combobox
                id={name}
                name={name}
                data={data}
                dataKey={dataKey}
                textField={textField}
                placeholder={t(`${placeholder}`)}
                value={value}
                onChange={handleOnChange}
                onSelect={handleOnSelect}
                filter={filter}
                {...(isLoading ? {busy: true, hideCaret: true} : ``)}
            />

            <div className="error-text">
                {(touched && errors) && <span>{t(errors)}</span>}
            </div>
        </div>
    )
}

export default EVSComboBox
