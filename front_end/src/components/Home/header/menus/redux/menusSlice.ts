import { createSlice } from "@reduxjs/toolkit"
import { viewMenusHeaders } from "./actionsMenus"

export type TMenusHeader = Array<{id: number, title: string, status: number, created_at: string, updated_at: string }> | boolean  | string

export interface IMegaMenu {
    Menus: TMenusHeader | []
    loading: boolean, 
    warningMessage: string

    // create 
    title: string,
    warningTitle: string
    addItems: boolean

}

const initialState: IMegaMenu = {
    Menus: [],
    loading: false,
    warningMessage: '',

    // create 
    title: '',
    warningTitle: '',
    addItems: false
}



const menusSlice =  createSlice({
    name: 'menus_headers_slice_toolkit',
    initialState: initialState,
    reducers: {
        onTitleMenus: (state, action) => {
            state.title = action.payload.title
        },
        onWarningTitleMenus: (state, action) => {
            state.warningTitle = action.payload.title
        },
        onLoadingMenus: (state) => {
            state.title = ''
            state.warningTitle = ''
        },
        onAddItemsMenus: (state,) => {
            state.addItems = false
        }
    },
    extraReducers: (builder) => {
       // view item menus 
        builder.addCase(viewMenusHeaders.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewMenusHeaders.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewMenusHeaders.fulfilled, (state, action) => {
            state.Menus = action.payload
            state.warningMessage = ''
        })
    }
})
export default menusSlice
export const {} = menusSlice.actions