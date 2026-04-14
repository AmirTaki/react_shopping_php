import { createSlice } from "@reduxjs/toolkit";

interface IDarkMode {
    dark : boolean,
    loading: boolean, 
}


const saveedDark = localStorage.getItem('darkMode_Shopping_React_php');

const initialState: IDarkMode = {
    dark: saveedDark ? JSON.parse(saveedDark) : false,
    loading: true
}

const darkModeSlice =  createSlice({
    name: 'dark_mode_slice_toolkit', 
    initialState: initialState, 
    reducers: {
        changeModeDark: (state, ) =>{
            state.loading = true
            state.dark = !state.dark
            localStorage.setItem('darkMode_Shopping_React_php', JSON.stringify(state.dark))
            state.loading = false
        }
    },
})

export default darkModeSlice 
export const {changeModeDark} = darkModeSlice.actions