import { createSlice, type PayloadAction,  } from "@reduxjs/toolkit";



interface IMegaMenu {
    [key: string]: boolean
}

interface IInitialMega{
    megaMenu: IMegaMenu,
    InteractedMegaMenu: null | boolean
}

const initialState: IInitialMega  = {
    megaMenu: {},
    InteractedMegaMenu: null
}

const megaMenuSlice = createSlice({
    name : 'megaMenuSlice', 
    initialState: initialState,
    reducers: {
        openMegaMenu: (state, action: PayloadAction<{id: number}>) => {
            state.InteractedMegaMenu = true
            state.megaMenu[action.payload.id] = true
        },
        closeMegaMenu: (state, action: PayloadAction<{id: number}>) => {
            state.InteractedMegaMenu = false
            state.megaMenu[action.payload.id] = false
        },
        closeAllMegeMenu: (state) => {
            Object.keys(state.megaMenu).forEach((key) => {
                state.megaMenu[key]  = false
            })
        },
        nullInceractedMegaMenu: (state) => {
            state.InteractedMegaMenu = null
        } 

    }
})
export default megaMenuSlice
export const {openMegaMenu, closeAllMegeMenu, closeMegaMenu} = megaMenuSlice.actions