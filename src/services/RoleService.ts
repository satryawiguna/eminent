import {RoleType} from "../types/RoleType";
import {QueryFunctionContext} from "@tanstack/react-query";
import Api from "../utils/HttpClient";
import {AxiosResponse} from "axios";
import {GenericCollectionResponseType} from "../types/response/GenericCollectionResponseType";
import {GenericObjectResponseType} from "../types/response/GenericObjectResponseType";
import {CreateRoleRequestType} from "../types/request/role/CreateRoleRequestType";

export class RoleService {
    static async getAllRoles(request: QueryFunctionContext<[string]>): Promise<GenericCollectionResponseType<RoleType>> {
        const response: AxiosResponse = await Api('identity').get(`/roles`)

        return response.data
    }

    static async getRole(request: QueryFunctionContext<[string, string]>): Promise<GenericObjectResponseType<RoleType>> {
        const [queryKey, id] = request.queryKey

        const response: AxiosResponse = await Api('identity').get(`/roles/${id}`)

        return response.data
    }

    static async createRole(request: CreateRoleRequestType): Promise<GenericObjectResponseType<RoleType>> {
        const response: AxiosResponse = await Api('identity').post(`/users`, request)

        return response.data
    }

    static async updateRole(request: Array<any>): Promise<boolean> {
        const [roleId, body] = request

        const response: AxiosResponse = await Api('identity').put(`/roles/${roleId}`, body)

        return response.data
    }
}
