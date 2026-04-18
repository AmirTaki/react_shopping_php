import { createSlice } from "@reduxjs/toolkit";
import { changeStatusUsersThunk, viewUsersThunk, deleteUsersThunk } from "./actionsUsers";

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
        // view users thunk
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

        // change status item users thunk
        builder.addCase(changeStatusUsersThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(changeStatusUsersThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(changeStatusUsersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            console.log(action.payload)
            state.data = action.payload
        })

        // delete item users thunk
        builder.addCase(deleteUsersThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(deleteUsersThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteUsersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            console.log(action.payload)
            state.data = action.payload
        })
    }
})
export default userSlice