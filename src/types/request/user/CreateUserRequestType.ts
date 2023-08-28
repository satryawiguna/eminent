import {ProfileType} from "../../ProfileType";
import {RoleType} from "../../RoleType";

export type CreateUserRequestType = {
    email: string,
    profile: Partial<ProfileType>,
    roleId?: string | undefined
    role: Partial<RoleType> | null,
}
