export type GenericObjectResponseType<T> = {
    status: number
    code: number
    errors: Array<string> | string
    headers?: any
    result: T
}
