import {useMutation, useQuery} from "@tanstack/react-query";
import {UserService} from "../../services/UserService";
import {onErrorDefault} from "../useError";
import {FilterUserRequestType} from "../../types/request/user/FilterUserRequestType";

const useFetchAllUser = (filter: FilterUserRequestType, onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-user', filter], UserService.getAllUsers,
        onSuccess ? {onSuccess, onError} : {onError});
}

const useShowUser = (id: string, onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['show-user', id], UserService.getUser,
        onSuccess ? {onSuccess, onError} : {onError});
}

const useStoreUser = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(UserService.createUser,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useUpdateUserRole = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(UserService.updateUserRole,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useUpdateUserProfile = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(UserService.updateUserProfile,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useUpdateUserPassword = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(UserService.updateUserPassword,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useChangePassword = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(UserService.changePassword,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useDeleteUser = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(UserService.deleteUser,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useDeleteUsers = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(UserService.deleteUsers,
        onSuccess ? {onSuccess, onError} : {onError})
}

export {
    useFetchAllUser,
    useShowUser,
    useStoreUser,
    useUpdateUserRole,
    useUpdateUserProfile,
    useUpdateUserPassword,
    useChangePassword,
    useDeleteUser,
    useDeleteUsers
}
