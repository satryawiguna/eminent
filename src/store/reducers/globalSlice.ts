import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GlobalState {
    isLoading: boolean,
    isDark: boolean,
    lang: string
}

const initialState: GlobalState = {
    isLoading: false,
    isDark: false,
    lang: "en"
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        updateIsLoadingAction: (state, {payload: {isLoading}}: PayloadAction<any>) => {
            state.isLoading = isLoading
        },
        updateIsDarkAction: (state, {payload: {isDark}}: PayloadAction<any>) => {
            state.isDark = isDark
        },
        updateLangAction: (state, {payload: {lang}}: PayloadAction<any>) => {
            state.lang = lang
        }
    }
})

export const {
    updateIsLoadingAction,
    updateIsDarkAction,
    updateLangAction
} = globalSlice.actions

export const fetchGlobal = (state: any) => state.global;

export default globalSlice.reducer
