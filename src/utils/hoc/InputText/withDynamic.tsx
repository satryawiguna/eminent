import {EVSInputPropType} from "../../../components/EVSInput";
import {ChangeEvent, ComponentType, useState} from "react";

export type DynamicPropType = {
    valueInput?: Array<any>
    initialValueInput?: object
    selectedIndexInput?: number | null
    handleAddInput?: () => void
    handleRemoveInput?: (index: number) => void
    handleOnChangeInput?: (index: number, event: ChangeEvent<HTMLInputElement>) => void
    handleOnChangeCheckbox?: (index: number, selectedIndex: number) => void
    touchedTitle?: boolean
    errorsTitle?: string
}

const withDynamic = <T extends EVSInputPropType>(OriginalComponent: ComponentType<T>) => {
    return (props: T) => {
        const [selectedIndexInput, setSelectedIndexInput] = useState<number | null>(
            (props.valueInput || []).findIndex((input) => input.default)
        )

        const handleAddInput = () => {
            const newInputs = [...(props.valueInput || []), props.initialValueInput]

            props.formik.setFieldValue(props.name, newInputs)
        }

        const handleRemoveInput = (index: number) => {
            const newInputs = [...(props.valueInput || [])]

            newInputs.splice(index, 1)

            props.formik.setFieldValue(props.name, newInputs)
        }

        const handleOnChangeInput = (index: number, event: ChangeEvent<HTMLInputElement>) => {
            const newInputs = [...(props.valueInput || [])]

            newInputs[index].value = event.target.value

            props.formik.setFieldValue(props.name, newInputs)
        }

        const handleOnChangeCheckbox = (index: number, selectedIndex: number) => {
            setSelectedIndexInput(selectedIndex)

            const newInputs = [...(props.valueInput || []).map(item => ({
                ...item,
                default: false
            }))]

            newInputs[index].default = !newInputs[index].default

            props.formik.setFieldValue(props.name, newInputs)
        }

        return (
            <>
                <OriginalComponent withType="DYNAMIC"
                                   selectedIndexInput={selectedIndexInput}
                                   valueInput={props.valueInput || []}
                                   handleAddInput={handleAddInput}
                                   handleRemoveInput={handleRemoveInput}
                                   handleOnChangeInput={handleOnChangeInput}
                                   handleOnChangeCheckbox={handleOnChangeCheckbox}
                                   {...props as T}/>
            </>
        )
    }
}

export default withDynamic
