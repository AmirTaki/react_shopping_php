import { createSlice } from "@reduxjs/toolkit";

interface IHeader {
    scrollHide: boolean   
}

const initialState: IHeader = {
    scrollHide: true
}

const headerSlice = createSlice({
    name: 'header_slice_toolkit', 
    initialState: initialState, 
    reducers: {
        hideScrollTop: (state, action) => {
            state.scrollHide = action.payload.target
        }
    }
})

export default headerSlice
export const {hideScrollTop} = headerSlice.actions