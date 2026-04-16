import { createSlice } from "@reduxjs/toolkit"
import { loginThunk } from "./actionsLogin"



interface ILogin {
    // login
    login: boolean, 
    warningMessage: string, 

    // check onChange input
    email: {name: string ,warning: string, check: boolean},
    password: {pin: string, warning: string, check: boolean},
    checkbox: boolean
}

const initialState: ILogin = {
    // login
    login: false, 
    warningMessage: '', 

    // check onChange input
    email: {name: '' ,warning: '', check: false},
    password: {pin: '', warning: '', check: false},
    checkbox: false
}

const loginSlice =  createSlice ({
    name: 'login_slice_toolkit', 
    initialState: initialState,
    reducers: {
        onEmailLogin: (state, action) => {
            state.email.name = action.payload.email
        },
        onPasswordLogin: (state, action) => {
            state.password.pin = action.payload.password
        },
        onCheckboxLogin: (state, action) => {
            state.checkbox = action.payload.tick
        },
        onWarningLogin: (state, action) => {
            state.email = {name: state.email.name, warning: action.payload.email, check: false},
            state.password = {pin: '', warning: action.payload.password, check: false}
        },
        onLogin: (state) => {
            state.login = false
        },
        onLoadingLogin: (state) => {
            state.email = {name: '', warning: '', check: false},
            state.password = {pin: '', warning: '', check: false},
            state.checkbox = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.email.warning = ''
            state.password.warning = ''
            state.warningMessage = ''
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.login = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.login = action.payload == true ? true : false
            state.warningMessage = ''

        })
    }
})

export default loginSlice
export const {onCheckboxLogin, onEmailLogin, onLoadingLogin, onLogin, onPasswordLogin,onWarningLogin} = loginSlice.actions