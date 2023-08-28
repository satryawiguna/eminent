import {RoleType} from "./RoleType";

export type UserInfoType = {
    userId: string,
    fullName: string,
    email: string,
    roles: Array<RoleType>
}
