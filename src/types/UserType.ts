import {RoleType} from "./RoleType";
import {ProfileType} from "./ProfileType";

export type UserType = {
    id: string,
    email: string,
    isActive: boolean,
    profile: ProfileType,
    role: Partial<RoleType>
}


