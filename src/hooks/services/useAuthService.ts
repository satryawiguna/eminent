import {useMutation, useQuery} from "@tanstack/react-query";
import {AuthService} from "../../services/AuthService";
import {onErrorDefault} from "../useError";

const useLogin = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(AuthService.login,
        onSuccess ? {onSuccess, onError} : {onError});
}

const useLogout = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['logout'], AuthService.logout,
        onSuccess ? {onSuccess, onError} : {onError});
}

const useRefreshToken = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(AuthService.refreshToken,
        onSuccess ? {onSuccess, onError} : {onError});
}

const useSendResetPassword = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(AuthService.sendResetPassword,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useCheckTokenValidity = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['check-token-validity'], AuthService.checkTokenValidity,
        onSuccess ? {onSuccess, onError} : {onError});
}

export {
    useLogin,
    useRefreshToken,
    useLogout,
    useSendResetPassword,
    useCheckTokenValidity,
}
