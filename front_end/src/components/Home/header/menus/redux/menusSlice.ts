import { createSlice } from "@reduxjs/toolkit"
import { changeStatusMenuHeaders, createMenusHeaders, viewMenusHeaders } from "./actionsMenus"

export type TMenusHeader = Array<{id: number, title: string, status: number, created_at: string, updated_at: string }> | boolean  | string

export interface IMegaMenu {
    Menus: TMenusHeader | []
    loading: boolean, 
    warningMessage: string

    // create 
    title: {name: string, warning: string},
    addItems: boolean

}

const initialState: IMegaMenu = {
    Menus: [],
    loading: false,
    warningMessage: '',

    // create 
    title: {name: '', warning: ''},
    addItems: false
}



const menusSlice =  createSlice({
    name: 'menus_headers_slice_toolkit',
    initialState: initialState,
    reducers: {
        onTitleMenus: (state, action) => {
            state.title.name = action.payload.title
        },
        onWarningTitleMenus: (state, action) => {
            state.title.warning = action.payload.title
        },
        onLoadingMenus: (state) => {
            state.title = {name: '', warning: ''}
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

        // create item menus header
        builder.addCase(createMenusHeaders.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(createMenusHeaders.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(createMenusHeaders.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
        })

        // change status menu headers
        builder.addCase(changeStatusMenuHeaders.pending, (state) => {
            state.warningMessage = ''
            state.loading = true
        })
        builder.addCase(changeStatusMenuHeaders.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.loading = false
        })
        builder.addCase(changeStatusMenuHeaders.fulfilled, (state, action) => {
            state.Menus = action.payload
            state.warningMessage = ''
            state.loading = false
        })

    }
})
export default menusSlice
export const {onAddItemsMenus, onLoadingMenus, onTitleMenus, onWarningTitleMenus} = menusSlice.actions