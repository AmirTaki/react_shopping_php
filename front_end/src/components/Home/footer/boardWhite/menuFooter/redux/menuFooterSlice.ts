import { createSlice } from "@reduxjs/toolkit"
import { changeStatusMenuFooterThunk, createMenuFooterThunk, deleteMenuFooterThunk, editMenuFooterThunk, readingMenuFooterThunk, viewMenuFooterThunk } from "./actionsMenuFooter"

export type TMenuFooter = Array<{id: number, title: string, status: number, created_at: string, updated_at: string }> | boolean  | string
export type TMenuFooterObject  = {id: number, title: string, status: number, created_at: string, updated_at: string }


interface IMenuFooter {
    menus: TMenuFooter ,
    warningMessage: string,

    // create & edit 
    title: {name: string, warning: string},
    addItems: boolean,

    // delete & status
    loading: boolean
}

const initialState: IMenuFooter = {
    menus: [],
    warningMessage: '',

    // create & edit 
    title: {name: '', warning: ''},
    addItems: false,

    // delete & status
    loading: false
   
}


const menuFooterSlice =  createSlice({
    name: 'menu_footer_slice',
    initialState: initialState, 
    reducers: {
        onLoadingMenuBoard: (state) => {
            state.title = {name: '', warning: ''}
            state.warningMessage = ''
        },
        onSetItemsMenuBoard: (state) => {
            state.addItems = false
        },
        onTitleMenuBoard: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onWarningMenuBoard: (state, action) => {
            state.title = {name: state.title.name, warning: action.payload.title}
        }
    },
    extraReducers: (builder) => {
   
        //view menu footer
        builder.addCase(viewMenuFooterThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewMenuFooterThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewMenuFooterThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.menus = action.payload
        })

        
        // create menuFooter
        builder.addCase(createMenuFooterThunk.pending, (state) => {
            state.warningMessage = ''
            state.addItems = false
        })
        builder.addCase(createMenuFooterThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.addItems = false
        })
        builder.addCase(createMenuFooterThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.addItems = action.payload == true ? true : false
        })

        // delete menu footer
        builder.addCase(deleteMenuFooterThunk.pending, (state) => {
            state.loading = true,
            state.warningMessage = ''
        })
        builder.addCase(deleteMenuFooterThunk.rejected, (state, action) => {
            state.loading = false,
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteMenuFooterThunk.fulfilled, (state, action) => {
            state.loading = false,
            state.warningMessage = ''
            state.menus = action.payload
        })
        
        // change status menu footer
        builder.addCase(changeStatusMenuFooterThunk.pending, (state) => {
            state.loading = true,
            state.warningMessage = ''
        })
        builder.addCase(changeStatusMenuFooterThunk.rejected, (state, action) => {
            state.loading = false,
            state.warningMessage = action.payload as string
        })
        builder.addCase(changeStatusMenuFooterThunk.fulfilled, (state, action) => {
            state.loading = false,
            state.warningMessage = ''
            state.menus = action.payload
        })

        // reading menu fotter
        builder.addCase(readingMenuFooterThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(readingMenuFooterThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingMenuFooterThunk.fulfilled, (state, action) => {
            const object = action.payload as TMenuFooterObject
            state.title = {name: object.title, warning: ''}
            state.warningMessage = ''
        })
        
        // update item footer white -> title white
        builder.addCase(editMenuFooterThunk.pending, (state) => {
            state.warningMessage = ''
            state.addItems = false
        })
        builder.addCase(editMenuFooterThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.addItems = false
        })
        builder.addCase(editMenuFooterThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.addItems = action.payload == true ? true : false
        })
    }
})

export default menuFooterSlice

export const {onLoadingMenuBoard, onSetItemsMenuBoard, onTitleMenuBoard, onWarningMenuBoard} = menuFooterSlice.actions