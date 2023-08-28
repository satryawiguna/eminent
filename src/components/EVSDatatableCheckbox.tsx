import {FC, HTMLProps, useEffect, useRef} from "react";

type EVSCheckboxPropType = {
    indeterminate?: boolean
} & HTMLProps<HTMLInputElement>

const EVSDatatableCheckbox: FC<EVSCheckboxPropType> = ({indeterminate, className = '', ...props}) => {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !props.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...props}
        />
    )
}

export default EVSDatatableCheckbox
