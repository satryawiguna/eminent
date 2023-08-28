import {toast} from "react-toastify";

const onErrorDefault = (error: any) => {
    toast.error(error.message)
}

export {
    onErrorDefault
}
