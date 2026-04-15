import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./actonsRegister";


// export type TAccountUsers = Array{} 

interface IRegister {

    // sign up
    submit: boolean,
    warningMessage: string,

    // check onChange input
    username: string, 
    email: string, 
    password: string, 
    repPassword: string, 
    checkbox: boolean,
}

const initialState: IRegister = {
    // sign up
    submit: false,
    warningMessage: '',

    //  check onChange input
    username: '', 
    email: '', 
    password: '', 
    repPassword: '', 
    checkbox: false, 
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
    extraReducers: (builder) => {
        //  registe user to database
        builder.addCase(registerThunk.pending, (state) => {
            state.submit = false
            state.warningMessage = ''
        })
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.submit = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.submit = action.payload ? true : false
        })
    }

})
export default registerSlice
export const {onCheckboxRegister, onUsernameRegister, onEmailRegister, onPasswordRegister, onRepeatPassowrdRegister,} = registerSlice.actions