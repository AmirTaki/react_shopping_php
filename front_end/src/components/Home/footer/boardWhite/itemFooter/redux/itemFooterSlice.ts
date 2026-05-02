import { createSlice } from "@reduxjs/toolkit";
import { viewItemFooterThunk } from "./actionsItemFooter";

export type TItemFooter = Array<{id: number,item: string, title: string, status: number, created_at: string, updated_at: string }> | boolean  | string
export type TItemFooterObject = {id: number,item: string, title: string, status: number, created_at: string, updated_at: string }


interface  IItemFooter  {
    items: [] | TItemFooter,
    warningMessage: string, 
   
    // create & edit
    item: {name: string, warning: string},
    title: {name: string, warning: string},

    callback: boolean,
    addItems: boolean,

    // delete & status
    loading: boolean
}

const initialState: IItemFooter = {
    items: [] ,
    warningMessage: '', 
    
    // create & edit
    item: {name: '', warning: ''},
    title: {name: '', warning: ''},
    callback: false,
    addItems: false,

    // delete & status
    loading: false
}
const itemFooterSlice = createSlice({
    name: 'item_footer_toolkit_slice',
    initialState: initialState, 
    reducers: {
        onTitleItemBoard: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onItemBoard: (state, action) => {
            state.item = {name: action.payload.item, warning: ''}
        },
        onWarningItemBoard: (state, action) => {
            state.title = {name: state.title.name, warning: action.payload.title}
            state.item = {name: state.item.name, warning: action.payload.item}
        },
        onCallBackItemBoard: (state, ) => {
            state.callback = true
        },
        onSetItemsBoard: (state) => {
            state.addItems = false
        },
        onLoadingItemBoard: (state) => {
            state.warningMessage = ''
            state.item = {name: '', warning: ''}
            state.title = {name: '', warning:''}
        }

    }, 
    extraReducers: (builder) => {
       // view item footer
        builder.addCase(viewItemFooterThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewItemFooterThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewItemFooterThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload
        })

        // create item white : footer white
        // builder.addCase(createItemWhiteFooterThunk.pending, (state) => {
        //     state.warningMessage = ''
        //     state.callback = false
        //     state.addItems = false
        //     state.warningItem = ''
        //     state.warningTitle = ''
        // })
        // builder.addCase(createItemWhiteFooterThunk.rejected, (state, action) => {
        //     state.warningMessage = action.payload as string
        // })
        // builder.addCase(createItemWhiteFooterThunk.fulfilled, (state, action) => {
        //     state.warningMessage = ''
        //     state.callback = false
        //     state.addItems = action.payload === true ? true : false
        // })

        // delete item white : footer white
        // builder.addCase(deleteItemWhtieFooterThunk.pending, (state) => {
        //     state.warningMessage = ''
        //     state.loading = true
        // })
        // builder.addCase(deleteItemWhtieFooterThunk.rejected, (state, action) => {
        //     state.warningMessage = action.payload as string
        //     state.loading = false
        // })
        // builder.addCase(deleteItemWhtieFooterThunk.fulfilled, (state, action) => {
        //     state.warningMessage = ''
        //     state.items = action.payload
        //     state.loading = false
        // })

        // change ststus item white : footer white
        // builder.addCase(changeStatusItemWhiteFooterThunk.pending, (state) => {
        //     state.warningMessage = ''
        //     state.loading = true
        // })
        // builder.addCase(changeStatusItemWhiteFooterThunk.rejected, (state, action) => {
        //     state.warningMessage = action.payload as string
        //     state.loading = false
        // })
        // builder.addCase(changeStatusItemWhiteFooterThunk.fulfilled, (state, action) => {
        //     state.warningMessage = ''
        //     state.items = action.payload
        //     state.loading = false
        // })

        // reading item white : footer white 
        // builder.addCase(readingItemWhiteFooterThunk.pending, (state) => {
        //     state.warningMessage = ''
        // })
        // builder.addCase(readingItemWhiteFooterThunk.rejected, (state, action) => {
        //     state.warningMessage = action.payload as string
        // })
        // builder.addCase(readingItemWhiteFooterThunk.fulfilled, (state, action) => {
        //     const object = action.payload as TItemWhiteFooterObject
        //     state.title = object.title
        //     state.item = object.item
        // })

        // edit item white : footer white 
        // builder.addCase(editItemWhiteFooterThunk.pending, (state) => {
        //     state.warningMessage = ''
        //     state.callback = false
        //     state.addItems = false
        //     state.warningItem = ''
        //     state.warningTitle = ''
        // })
        // builder.addCase(editItemWhiteFooterThunk.rejected, (state, action) => {
        //     state.warningMessage = action.payload as string
        // })
        // builder.addCase(editItemWhiteFooterThunk.fulfilled, (state, action) => {
        //     state.warningMessage = ''
        //     state.callback = false
        //     state.addItems = action.payload === true ? true : false
        // })
    }
})

export default itemFooterSlice
export const {onCallBackItemBoard, onItemBoard, onLoadingItemBoard, onSetItemsBoard, onTitleItemBoard, onWarningItemBoard} = itemFooterSlice.actions