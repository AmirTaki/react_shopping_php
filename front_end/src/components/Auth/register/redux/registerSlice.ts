import { createSlice } from "@reduxjs/toolkit";
import { registerThunk, ReadingUserThunk, editUserThunk } from "./actonsRegister";

// export type TAccountUsers = Array{} 
type TUSERObject = {id: number, name: string, email: string, status: number, level: string, password: string, created_at: string, updated_at: string}

interface IRegister {

    // sign up
    submit: boolean,
    warningMessage: string,

    // check onChange input
    username: {name: string, warning: string, check: boolean}, 
    email:  {name: string, warning: string, check: boolean},  
    password:  {pin: string, warning: string, check: boolean}, 
    repPassword: {pin: string, warning: string, check: boolean}, 
    level: string,
    levels: Array<{access: string, message: string }>,
    checkbox: boolean,

    // check input button register 
    disabled: boolean
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
    level: '',
    levels: [{access: 'A', message:  'all components, users'}, {access: 'B', message:  'header, session, footer'}, {access: 'C', message:  'shooping, bank'}, {access: 'D', message:  'discription'}],
    checkbox: false, 
    
    // check input button register 
    disabled : true
}
const registerSlice = createSlice({
    name: 'register_slice_toolkit',
    initialState: initialState,
    reducers: {
        onUsernameRegister: (state, action) => {
            const username = action.payload.username
            if(username.length === 0){
                state.username = {name : username, warning: 'name is requierd', check: false}
            }
            else if (!username.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
                state.username = {name : username, warning: 'Write full Name', check: false}
            }
            else {
                state.username = {name : username, warning: 'ok', check: true}
            }
        },
        onEmailRegister: (state, action) => {
            const email = action.payload.email
            if(email.length === 0){
                state.email = {name : email, warning: 'email is requierd', check: false}
            }
            else if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                state.email = {name : email, warning: 'Write full Name', check: false}
            }
            else {
                state.email = {name : email, warning: 'ok', check: true}
            }
        },
        onPasswordRegister: (state, action) => {
            const password = action.payload.password
            if(password.length === 0){
                state.password = {pin : password, warning: 'password is requierd', check: false}
            }
            else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
                state.password = {pin : password, warning: 'Password should contain 1Uppercase, 1Lowecase, 1 Digit & 1Alphabet', check: false}
            }
            else {
                state.password = {pin : password, warning: 'ok', check: true}
            }
        },
        onRepeatPassowrdRegister: (state, action) => {
            
            const password = action.payload.repPassword
            if(password.length === 0){
                state.repPassword = {pin : password, warning: 'password is requierd', check: false}
            }
            else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
                state.repPassword = {pin : password, warning: 'Password should contain 1Uppercase, 1Lowecase, 1 Digit & 1Alphabet', check: false}
            }
            else if (password !== state.password.pin){
                state.repPassword = {pin : password, warning: 'confirm not password', check: false}
            }
            else {
                state.repPassword = {pin : password, warning: 'ok', check: true}
            }
        },
        onCheckboxRegister: (state, action) => {
            const tick = action.payload.tick
            state.checkbox = tick 
        },
        onLeavelRegister : (state, action) => {
            state.level = action.payload.level
        },
        onWarningRegister: (state, action) => {     
            state.username = {name : '', warning : action.payload.username, check: false},
            state.email = {name : state.email.name, warning : action.payload.email, check: false},
            state.password = {pin : '', warning : action.payload.password, check: false},
            state.repPassword = {pin : '', warning : action.payload.repPassowrd, check: false}
        },
        onSubmitRegister: (state) => {
            state.submit = false
        },
        onLoadingRegister: (state) => {
            state.username = {name : '', warning : '', check: false},
            state.email = {name : '', warning : '', check: false},
            state.password = {pin : '', warning : '', check: false},
            state.repPassword = {pin : '', warning : '', check: false}
            state.checkbox  = false,
            state.disabled = true
        },
        onDisabledRegister: (state) => {
           state.disabled =  state.username.check && state.email.check && state.password.check && state.repPassword.check ? false : true
        }

    },
    extraReducers: (builder) => {
        
        //  registe user to database
        builder.addCase(registerThunk.pending, (state) => {
            state.submit = false
        })
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.submit = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.submit = action.payload == true ? true : false
        })


        // reading item users thunk
        builder.addCase(ReadingUserThunk.pending,(state, ) => {
            state.warningMessage = ''
        })
        builder.addCase(ReadingUserThunk.rejected,(state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(ReadingUserThunk.fulfilled,(state, action) => {
            state.warningMessage = ''
            const object = action.payload as TUSERObject 
            state.username.name = object.name
            state.email.name = object.email
            state.level = object.level
        })

        // edit item users thunk
        builder.addCase(editUserThunk.pending, (state, ) => {
            state.submit = false
        })
        builder.addCase(editUserThunk.rejected, (state, action) => {
            state.submit = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(editUserThunk.fulfilled, (state, action) => {
            state.submit = action.payload == true ? true : false
            state.warningMessage = ''
        })
    }

    

})
export default registerSlice
export const {onLeavelRegister, onDisabledRegister, onLoadingRegister, onSubmitRegister, onWarningRegister, onCheckboxRegister, onUsernameRegister, onEmailRegister, onPasswordRegister, onRepeatPassowrdRegister,} = registerSlice.actions