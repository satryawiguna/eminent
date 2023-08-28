import {useQuery} from "@tanstack/react-query";
import {CommonService} from "../../services/CommonService";
import {onErrorDefault} from "../useError";

const useFetchAllCountries = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-countries'], CommonService.getAllCountries,
        onSuccess ? {onSuccess, onError} : {onError});
}

const useFetchAllEvents = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-events'], CommonService.getAllEvents,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useFetchAllLanguages = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-languages'], CommonService.getAllLanguages,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useFetchAllNameTitles = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-name-titles'], CommonService.getAllNameTitles,
        onSuccess ? {onSuccess, onError} : {onError})
}

const useFetchAllDefaultColumns = (onSuccess?: (res: any) => void, onError: (err: any) => void = onErrorDefault) => {
    return useQuery(['fetch-all-default-unvisibility-columns'], CommonService.getAllDefaultColumns,
        onSuccess ? {onSuccess, onError} : {onError})
}

export {
    useFetchAllCountries,
    useFetchAllEvents,
    useFetchAllLanguages,
    useFetchAllNameTitles,
    useFetchAllDefaultColumns
}
