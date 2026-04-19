import { createSlice } from "@reduxjs/toolkit";

interface IResponse {
    response: boolean
}

const initialState: IResponse = {
    response: false
}

const responseSlice = createSlice({
    name: 'reponse_slice_toolkit',
    initialState: initialState,
    reducers: {
        onSetResponse: (state) => {
            // md tailwind
            state.response = window.innerWidth <= 768 ? true : false
        }
    }
})

export default responseSlice
export const {onSetResponse} = responseSlice.actions