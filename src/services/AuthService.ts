import Api from "../utils/HttpClient";
import {LoginRequestType} from "../types/request/auth/LoginRequestType";
import {SendResetPasswordRequestType} from "../types/request/auth/SendResetPasswordRequestType";
import {LoginType} from "../types/LoginType";
import {RefreshTokenRequestType} from "../types/request/auth/RefreshTokenRequestType";
import {RefreshTokenType} from "../types/RefreshTokenType";
import {AxiosResponse} from "axios";
import {GenericObjectResponseType} from "../types/response/GenericObjectResponseType";


export class AuthService {
    static async login(request: LoginRequestType): Promise<GenericObjectResponseType<LoginType>> {
        const response: AxiosResponse = await Api('identity').post('/authentication/login', request)

        return response.data
    }

    static async logout(): Promise<boolean> {
        const response: AxiosResponse = await Api('identity').get('/authentication/logout')

        return response.data
    }

    static async refreshToken(request: RefreshTokenRequestType): Promise<GenericObjectResponseType<RefreshTokenType>> {
        const response: AxiosResponse = await Api('identity').post('/authentication/refresh-token', request)

        return response.data
    }

    static async sendResetPassword(request: SendResetPasswordRequestType): Promise<boolean> {
        const response: AxiosResponse = await Api('identity').post('/authentication/forgot-password', request)

        return response.data
    }


    static async checkTokenValidity(): Promise<boolean> {
        const response: AxiosResponse = await Api('identity').get('/hello')

        return response.data
    }
}
