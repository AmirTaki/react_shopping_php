import { createSlice } from "@reduxjs/toolkit";

interface IRegister {
    username: string, 
    email: string, 
    password: string, 
    repPassword: string, 
    checkbox: boolean
}

const initialState: IRegister = {
    username: '', 
    email: '', 
    password: '', 
    repPassword: '', 
    checkbox: false
}
const registerSlice = createSlice({
    name: 'register_slice_toolkit',
    initialState: initialState,
    reducers: {
        onUsernameRegister: (state, action) => {
            state.username = action.payload.username
        },
        onEmailRegister: (state, action) => {
            state.email = action.payload.email
        },
        onPasswordRegister: (state, action) => {
            state.password = action.payload.password
        },
        onRepeatPassowrdRegister: (state, action) => {
            state.repPassword = action.payload.repPassword
        },
        onCheckboxRegister: (state, action) => {
            const tick = action.payload.tick
            state.checkbox = tick 
        }

    },
    extraReducers: (builder) => {}

})
export default registerSlice
export const {onCheckboxRegister, onUsernameRegister, onEmailRegister, onPasswordRegister, onRepeatPassowrdRegister,} = registerSlice.actions