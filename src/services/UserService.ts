import Api from "../utils/HttpClient";
import {QueryFunctionContext} from "@tanstack/react-query";
import {UserType} from "../types/UserType";
import {CreateUserRequestType} from "../types/request/user/CreateUserRequestType";
import {FilterUserRequestType} from "../types/request/user/FilterUserRequestType";
import {AxiosResponse} from "axios";
import {ProfileType} from "../types/ProfileType";
import {GenericObjectResponseType} from "../types/response/GenericObjectResponseType";
import {GenericCollectionResponseType} from "../types/response/GenericCollectionResponseType";
import {DeleteUsersRequestType} from "../types/request/user/DeleteUsersRequestType";
import {queryParamsDestructure} from "../help";

export class UserService {
    static async getAllUsers(request: QueryFunctionContext<[string, FilterUserRequestType]>): Promise<GenericCollectionResponseType<UserType>> {
        const [key, params] = request.queryKey

        const response: AxiosResponse = await Api('identity').get(`/users/${queryParamsDestructure(params)}`)

        return {...response.data, headers: response.headers}
    }

    static async getUser(request: QueryFunctionContext<[string, string]>): Promise<GenericObjectResponseType<UserType>> {
        const [queryKey, id] = request.queryKey

        const response: AxiosResponse = await Api('identity').get(`/users/${id}`)

        return response.data
    }

    static async createUser(request: CreateUserRequestType): Promise<GenericObjectResponseType<UserType>> {
        const response: AxiosResponse = await Api('identity').post(`/users`, request)

        return response.data
    }

    static async updateUserRole(request: Array<any>): Promise<GenericObjectResponseType<UserType>> {
        const [userId, roleId, body] = request

        const response: AxiosResponse = await Api('identity').put(`/users/${userId}/roles/${roleId}`, body)

        return response.data
    }

    static async updateUserProfile(request: Array<any>): Promise<GenericObjectResponseType<Partial<ProfileType>>> {
        const [userId, profileId, body] = request

        const response: AxiosResponse = await Api('identity').put(`/users/${userId}/profiles/${profileId}`, body)

        return response.data
    }

    static async updateUserPassword(request: Array<any>): Promise<GenericObjectResponseType<boolean>> {
        const [userId, body] = request

        const response: AxiosResponse = await Api('identity').put(`/users/${userId}/password/change`, body)

        return response.data
    }

    static async changePassword(request: Array<any>): Promise<boolean> {
        const [userId, body] = request

        const response: AxiosResponse = await Api('identity').put(`/users/${userId}/password/reset`, body)

        return response.data
    }

    static async deleteUser(id: string): Promise<boolean> {
        const response: AxiosResponse = await Api('identity').delete(`/users/${id}`)

        return response.data
    }

    static async deleteUsers(request: DeleteUsersRequestType): Promise<boolean> {
        const response: AxiosResponse = await Api('identity').post(`/users/`, request.ids)

        return response.data
    }
}
