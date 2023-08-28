export type GenericCollectionResponseType<T> = {
    status: number
    code: number
    errors: Array<string> | string
    headers?: any
    result: Array<T>
}
