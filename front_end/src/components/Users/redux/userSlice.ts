import { createSlice } from "@reduxjs/toolkit";
import { viewUsersThunk } from "./actionsUsers";

export type TUSER = Array<{id: number, name: string, email: string, status: number, level: string, password: string, created_at: string, updated_at: string}> | string | boolean
export type TUSERObject = {id: number, name: string, email: string, status: number, level: string, password: string, created_at: string, updated_at: string}

interface IUser {
    data: [] | TUSER, 
    warningMessage: string,
    loading: boolean,
    addItems: boolean
}

const initialState: IUser = {
    // 
    data: [], 
    warningMessage: '',
    loading: false,
    addItems: false
}

const userSlice =  createSlice({
    name: 'user_slice_toolkit_panelAdmin', 
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(viewUsersThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewUsersThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewUsersThunk.fulfilled, (state, action) => {
            state.data = action.payload
            state.warningMessage = ''
        })
    }
})
export default userSlice