import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    linkValidation : [
        {id: -1, name: "HOME", link : '/'},
        {id: 0, name: "REGISTER", link : 'register'},
        {id: 1, name: "LOGIN", link : 'login'},
    ],
    numberAuth: 0
}

const validationSlice  = createSlice({
    name: 'validation_slice_toolkit',
    initialState: initialState,
    reducers: {
        changeAuth: (state, action) => {
            state.numberAuth = action.payload.id
            
        }
    },   
})

export default validationSlice
export const {changeAuth} = validationSlice.actions