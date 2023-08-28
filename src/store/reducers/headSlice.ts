import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface HeadState {
    title: string,
    description: string
}

const initialState: HeadState = {
    title: "TehMaster System",
    description: "Master Management"
}

export const headSlice = createSlice({
    name: "head",
    initialState,
    reducers: {
        updateHeadInfoAction: (state, {payload: {title, description}}: PayloadAction<any>) => {
            state.title = title
            state.description = description
        }
    }
})

export const {
    updateHeadInfoAction
} = headSlice.actions

export const fetchHead = (state: any) => state.head;

export default headSlice.reducer
