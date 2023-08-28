import {BiSolidMessageCheck, BiSolidMessageError, BiSolidMessageX} from "react-icons/bi";
import {FC} from "react";

type Themes = 'danger' | 'warning' | 'success' | 'info'
type MessageAlertPropType = {
    t: (key: any) => any,
    type: Themes,
    iconable: boolean,
    dismissable: boolean,
    title: string,
    error: unknown
}
const EVSMessageAlert: FC<MessageAlertPropType & any> = ({
                                                             t,
                                                             type,
                                                             iconable,
                                                             dismissable,
                                                             title,
                                                             error
                                                             , ...props
                                                         }) => {

    const renderIcon = (type: string | unknown) => {
        switch (type) {
            case 'info':
                return <BiSolidMessageError className="icon"/>
            case 'success':
                return <BiSolidMessageCheck className="icon"/>
            case 'warning':
                return <BiSolidMessageError className="icon"/>
            case 'danger':
            default:
                return <BiSolidMessageX className="icon"/>
        }
    }

    return (
        <>
            <div id="message-alert"
                 className={`alert-${type} ${props.className}`}
                 role="alert">
                {iconable && renderIcon(type)}
                {title && <span className="sr-only">{title}</span>}
                {!Array.isArray(error.errors) ? Object.keys(error.errors).map((key: string, indexA: number) => Array.isArray(error.errors[key]) && error.errors[key].map((message: string, indexB: number) =>
                    <p
                        key={`${indexA}-${indexB}`}>{t(message)}</p>)) : error.errors.map((message: string, indexA: number) =>
                    <p
                        key={`${indexA}`}>{t(message)}</p>)}
                {dismissable && <button id="dismissing-message-alert"
                                        type="button"
                                        className="dismissing"
                                        data-dismiss-target="#message-alert"
                                        aria-label="Close">
                    <span className="sr-only">Dismiss</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>}
            </div>
        </>
    )
}

EVSMessageAlert.defaultProps = {
    type: 'danger',
    iconable: true,
    dismissable: true,
    title: ''
}

export default EVSMessageAlert
