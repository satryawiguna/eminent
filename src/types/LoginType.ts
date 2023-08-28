import {RoleType} from "./RoleType";
import {TokenType} from "./TokenType";

export type LoginType = {
    tokens: TokenType
    userId: string
    fullName: string
    email: string
    roles: Array<Partial<RoleType>>
}
