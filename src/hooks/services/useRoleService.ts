import {useMutation, useQuery} from "@tanstack/react-query";
import {onErrorDefault} from "../useError";
import {RoleService} from "../../services/RoleService";

const useFetchAllRoles = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-roles'], RoleService.getAllRoles,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useShowRole = (id: string, onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['show-role', id], RoleService.getRole,
        onSuccess ? {onSuccess, onError} : {onError});
}

const useStoreRole = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(RoleService.createRole,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useUpdateRole = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useMutation(RoleService.updateRole,
        onSuccess ? {onSuccess, onError} : {onError})
}

export {
    useFetchAllRoles,
    useShowRole,
    useStoreRole,
    useUpdateRole
}
