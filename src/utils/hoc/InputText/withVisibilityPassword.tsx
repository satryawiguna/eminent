import {EVSInputPropType} from "../../../components/EVSInput";
import {ComponentType, useState} from "react";

export type VisibilityPropType = {
    onChangeVisibilityPassword?: () => void
    newType?: string
}

const withVisibilityPassword = <T extends EVSInputPropType>(OriginalComponent: ComponentType<T>) => {
    return (props: T) => {
        const [type, setType] = useState<string>(props.type || "password")

        const handleVisibilityPassword = () => {
            if (type === "password") {
                setType("text")
            } else {
                setType("password")
            }
        }

        return (
            <>
                <OriginalComponent withType="VISIBILITY_PASSWORD"
                                   newType={type}
                                   onChangeVisibilityPassword={handleVisibilityPassword}
                                   {...props as T}/>
            </>
        );
    }
}

export default withVisibilityPassword
