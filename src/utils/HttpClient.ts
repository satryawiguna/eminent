import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {logoutAction, updateAccessTokenAction, updateRefreshTokenAction} from "../store/reducers/authSlice";
import {store} from "../store";
import {addSuffixToURL} from "../help";

const attemptToRefreshToken = async () => {
    try {
        const response: AxiosResponse = await Api('identity').post('/authentication/refresh-token', {
            accessToken: `${store.getState().auth.accessToken}`,
            refreshToken: `${store.getState().auth.refreshToken}`
        })

        return response.data
    } catch (e) {
        store.dispatch(logoutAction())
        setHeaderAuthorization(null)

        Promise.resolve(false)

        window.location.reload()
    }
}

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    return request;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response: AxiosResponse) => {
    response.data = response.data || {}
    response.status = response.status || 0
    response.headers = response.headers || {}

    return response
}, async (error) => {
    const originalRequest = error.config

    if (!error.response) throw new Error('Error connection')

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
            const newToken = await attemptToRefreshToken()

            store.dispatch(updateAccessTokenAction(newToken.result.accessToken))
            store.dispatch(updateRefreshTokenAction(newToken.result.refreshToken))

            setHeaderAuthorization(newToken.result.accessToken)

            return axios(originalRequest)
        } catch (refreshError) {
            return Promise.reject(refreshError)
        }
    }

    return Promise.reject(error.response.data);
});


export const setHeaderAuthorization = (accessToken: string | null) => {
    if (accessToken) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else {
        delete instance.defaults.headers.common['Authorization']
    }
}

const Api = (service?: string): AxiosInstance => {
    if (service) {
        instance.defaults.baseURL = addSuffixToURL(import.meta.env.VITE_BASE_API_URL, service)
    } else {
        instance.defaults.baseURL = import.meta.env.VITE_BASE_API_URL
    }

    return instance
}

export default Api
