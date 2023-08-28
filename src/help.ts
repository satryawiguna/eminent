import {FilterRequestType} from "./types/request/FilterRequestType";

export const addSuffixToURL = (url: string, suffix?: string): string => {
    return url.concat('/' + suffix || '/')
}

export const convertArrayToNestedProperty = (arr: string[], obj: any): any => {
    return arr.reduce((acc, key) => {
        if (acc && typeof acc === "object" && key in acc) {
            return acc[key]
        } else {
            throw new Error(`Property "${key}" not found.`)
        }
    }, obj)
}

export const truncate = (input: string, length: number): string => {
    return input?.length > length ? `${input.substring(0, length - 3)}...` : input;
}

export const encrypt = (input: string): string => {
    return btoa(input)
}

export const decrypt = (input: string): string => {
    return atob(input)
}

export const testJSON = (input: string | null): boolean => {
    if (typeof input !== "string") {
        return false
    }

    try {
        JSON.parse(input);
        return true
    } catch (error) {
        return false
    }
}

export const queryParamsDestructure = (params: FilterRequestType): string => {
    const queryParams: string[] = []

    const buildQueryString = (obj: { [key: string]: any }, prefix = ''): void => {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop] !== "") {
                const propName = prefix ? `${prefix}.${prop}` : prop
                if (typeof obj[prop] === 'object') {
                    buildQueryString(obj[prop], propName)
                } else {
                    if (propName === 'pageIndex') {
                        queryParams.push(`${propName}=${encodeURIComponent((obj[prop] === 0) ? obj[prop] + 1 : obj[prop])}`)
                    } else {
                        queryParams.push(`${propName}=${encodeURIComponent(obj[prop])}`)
                    }
                }
            }
        }
    }

    buildQueryString(params)

    return queryParams.length ? `?${queryParams.join("&")}` : ''
}

export const splitCamelCase = (input: string | string[]): string | string[] => {
    if (Array.isArray(input)) {
        return input.map(item =>
            item
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                .replace(/^./, (match) => match.toUpperCase())
        );
    } else {
        return input
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
            .replace(/^./, (match) => match.toUpperCase())
    }
}


export const getNestedProperty = <T>(obj: T, path: string | undefined): any => {
    if (!path) {
        return obj
    }

    const keys = path.split(".")

    return keys.reduce((value: any, key) => (value ? value[key] : undefined), obj)
}

export const scrollableBody = () => {
    const bodyElement = document.body

    bodyElement.removeAttribute('style')
}
