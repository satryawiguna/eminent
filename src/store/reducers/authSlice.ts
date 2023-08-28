import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserInfoType} from "../../types/UserInfoType";

interface AuthState {
    userInfo: UserInfoType,
    accessToken: string,
    refreshToken: string,
    isLogged: boolean
}

const initialState: AuthState = {
    userInfo: {
        userId: '',
        fullName: '',
        email: '',
        roles: []
    },
    accessToken: '',
    refreshToken: '',
    isLogged: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction: (state, {payload: {userInfo, accessToken, refreshToken}}: PayloadAction<any>) => {
            state.userInfo = userInfo
            state.accessToken = accessToken
            state.refreshToken = refreshToken
            state.isLogged = true

            return state
        },
        logoutAction: () => initialState,
        updateUserInfoAction: (state, {payload: userInfo}: PayloadAction<any>) => {
            state.userInfo = userInfo

            return state
        },
        updateAccessTokenAction: (state, {payload: accessToken}: PayloadAction<any>) => {
            state.accessToken = accessToken

            return state
        },
        updateRefreshTokenAction: (state, {payload: refreshToken}: PayloadAction<any>) => {
            state.refreshToken = refreshToken

            return state
        }
    }
})

export const {
    loginAction,
    logoutAction,
    updateUserInfoAction,
    updateAccessTokenAction,
    updateRefreshTokenAction
} = authSlice.actions

export const fetchAuth = (state: any) => state.auth;

export default authSlice.reducer
