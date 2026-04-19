import { createSlice } from "@reduxjs/toolkit";

interface IHeader {
    scrollHide: boolean,
    search: boolean | null  
}

const initialState: IHeader = {
    scrollHide: true,
    search: null

}

const headerSlice = createSlice({
    name: 'header_slice_toolkit', 
    initialState: initialState, 
    reducers: {
        hideScrollTop: (state, action) => {
            state.scrollHide = action.payload.target
        },
        onSearchHandler: (state, action) => {
            state.search = action.payload.search
        }
    }
})

export default headerSlice
export const {hideScrollTop, onSearchHandler} = headerSlice.actions