import { createSlice } from "@reduxjs/toolkit";
import { editItemsListHeadersThunk, readingItemListHeadersThunk, changeStatusItemListHeadersThunk, viewListHeadersThunk, createListHeadersThunk, deleteItemListHeadersThunk } from "./actionsMenuList";

export type TListMenusHeader = Array<{id: number,list: string, title: string, status: number, created_at: string, updated_at: string }> | boolean  | string
export type TListMenusHeaderObject = {id: number,list: string, title: string, status: number, created_at: string, updated_at: string }


interface IList {
    Lists: TListMenusHeader | [],
    warningMessage: string, 

    // create & edit
    list: {name: string, warning: string},
    title: {name: string, warning: string},
    callback: boolean, 
    addItems: boolean,

    // delete & change status
    loading: boolean
      
}

const initialState: IList = {
    Lists:  [],
    warningMessage: '', 

    // create & edit
    list: {name: '', warning: ''},
    title: {name: '', warning: ''},
    callback: false, 
    addItems: false,

    // delete & change status
    loading: false   
}

const listMenus =  createSlice({
    name: 'list_menus_toolkit_slice',
    initialState: initialState,
    reducers: {
        onListMenus: (state, action) => {
            state.list = {name: action.payload.list, warning : ''}
        },
        onTitleListMenus: (state, action) => {
            state.title =  {name: action.payload.title, warning : ''}
        },
        onWarningListMenus: (state, action) => {
            state.list = {name: state.list.name, warning: action.payload.list}
            state.title = {name: state.title.name, warning: action.payload.title}
        },
        onCallBackListMenus: (state) => {
            state.callback = true
        },
        onAddItemsListMenus: (state) => {
            state.addItems = false
        },
        onLoadingListMenus: (state) => {
            state.list = {name: '', warning: ''},
            state.title = {name: '', warning: ''}
        },
    },
    extraReducers: (builder) => {
        // view items menu list headers
        builder.addCase(viewListHeadersThunk.pending, (state) =>{
            state.warningMessage = ''
        })
        builder.addCase(viewListHeadersThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewListHeadersThunk.fulfilled, (state, action) => {
            state.Lists = action.payload
        })

        
        // create item list menu headers
        builder.addCase(createListHeadersThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createListHeadersThunk.rejected, (state, action) => {
            state.callback = false
            state.addItems = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(createListHeadersThunk.fulfilled, (state, action) => {
            state.callback = false
            state.addItems = action.payload === true ? true : false     
                  
        })

        
        // delete item list menu headers
        builder.addCase(deleteItemListHeadersThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteItemListHeadersThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteItemListHeadersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage  = ''
            state.Lists = action.payload
        })

        // change status item list menu headers
        builder.addCase(changeStatusItemListHeadersThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(changeStatusItemListHeadersThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(changeStatusItemListHeadersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage  = ''
            state.Lists = action.payload
        })

        // reading item list menu Headers 
        builder.addCase(readingItemListHeadersThunk.pending, (state) => {
            state.warningMessage = ''
        })        
        builder.addCase(readingItemListHeadersThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })        
        builder.addCase(readingItemListHeadersThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            const answer =  action.payload as TListMenusHeaderObject
            state.list = {name: answer.list, warning: ''},
            state.title = {name: answer.title, warning: ''}
            
        })        

        // edit item list menu Headrs
        builder.addCase(editItemsListHeadersThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
        })
        builder.addCase(editItemsListHeadersThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.callback = false
        })
        builder.addCase(editItemsListHeadersThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false   
        })


        // found list in title 
        // builder.addCase(foundITemsListHeadersThunk.pending, (state) => {
        //     state.warningMessage = ''
        // })
        // builder.addCase(foundITemsListHeadersThunk.rejected, (state, action) => {
        //     state.warningMessage = action.payload as string
        // })
        // builder.addCase(foundITemsListHeadersThunk.fulfilled, (state, action) => {
        //     state.Lists = action.payload
        // })
    }
})

export default listMenus
export const {onLoadingListMenus, onAddItemsListMenus, onCallBackListMenus, onListMenus, onTitleListMenus, onWarningListMenus, } = listMenus.actions