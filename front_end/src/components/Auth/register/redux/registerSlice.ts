import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./actonsRegister";


// export type TAccountUsers = Array{} 

interface IRegister {

    // sign up
    submit: boolean,
    warningMessage: string,

    // check onChange input
    username: {name: string, warning: string, check: boolean}, 
    email:  {name: string, warning: string, check: boolean},  
    password:  {pin: string, warning: string, check: boolean}, 
    repPassword: {pin: string, warning: string, check: boolean}, 
    checkbox: boolean,
}

const initialState: IRegister = {
    // sign up
    submit: false,
    warningMessage: '',

    //  check onChange input
    username: {name: '', warning: '', check: false}, 
    email:  {name: '', warning: '', check: false},  
    password:  {pin: '', warning: '', check: false}, 
    repPassword: {pin: '', warning: '', check: false}, 
    checkbox: false, 
}
const registerSlice = createSlice({
    name: 'register_slice_toolkit',
    initialState: initialState,
    reducers: {
        onUsernameRegister: (state, action) => {
            state.username.name = action.payload.username
        },
        onEmailRegister: (state, action) => {
            state.email.name = action.payload.email
        },
        onPasswordRegister: (state, action) => {
            state.password.pin = action.payload.password
        },
        onRepeatPassowrdRegister: (state, action) => {
            state.repPassword.pin = action.payload.repPassword
        },
        onCheckboxRegister: (state, action) => {
            const tick = action.payload.tick
            state.checkbox = tick 
        },
        onWarningRegister: (state, action) => {
            state.username.warning  = action.payload.username
            state.email.warning  = action.payload.email
            state.password.warning  = action.payload.password
            state.repPassword.warning = action.payload.repPassowrd
        },
        onSubmitRegister: (state) => {
            state.submit = false
        },
        onLoadingRegister: (state) => {
            state.username = {name : '', warning : '', check: false},
            state.email = {name : '', warning : '', check: false},
            state.password = {pin : '', warning : '', check: false},
            state.repPassword = {pin : '', warning : '', check: false}
            state.checkbox  = false
        }

    },
    extraReducers: (builder) => {
        //  registe user to database
        builder.addCase(registerThunk.pending, (state) => {
            state.submit = false
            state.warningMessage = ''
            state.password.warning = ''
            state.repPassword.warning = ''
            state.email.warning = ''
            state.username.warning = ''
        })
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.submit = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.submit = action.payload == true ? true : false
        })
    }

})
export default registerSlice
export const {onLoadingRegister, onSubmitRegister, onWarningRegister, onCheckboxRegister, onUsernameRegister, onEmailRegister, onPasswordRegister, onRepeatPassowrdRegister,} = registerSlice.actions