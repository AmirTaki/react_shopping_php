import { createSlice } from "@reduxjs/toolkit";
import { editItemsProdcutHeadersThunk, readingItemProdcutHeadersThunk, changeStatusItemProductThunk, viewProductHeadresThunk, createProductHeadersThunk, deleteItemsProductHeadersThunk } from "./actionsMenuSeries";

export type TProductMenuHeader =  Array<{id: number, series: string,  list: string, title: string,  status: number, created_at: string, updated_at: string }> | boolean  | string
export type TProductMenusHeaderObject = {id: number, series: string,  list: string, title: string,  status: number, created_at: string, updated_at: string }

interface ISeries {
    products: TProductMenuHeader,
    warningMessage: string,

    // create & edit
    series: {name: string, warning: string},
    title: {name: string, warning: string},
    list: {name: string, warning: string},
    callback: boolean, 
    addItems: boolean,


    // delete & status 
    loading: boolean
}

const initialState: ISeries = {
    products: [] ,
    warningMessage: '',

    // create & edit
    series: {name: '', warning: ''},
    title: {name: '', warning: ''},
    list: {name: '', warning: ''},
    callback: false, 
    addItems: false,


    // delete & status 
    loading: false
}

const sereisSlice =  createSlice({
    name: 'series_(product)_menus_toolkit', 
    initialState: initialState, 
    reducers: {
        onSeriesMenus: (state, action) => {
            state.series = {name: action.payload.series, warning : ''}
        },
        onTitleSeries: (state, action) => {
            state.title = {name: action.payload.title, warning : ''}
        },
        onListSeries: (state, action) => {
            state.list = {name: action.payload.list, warning : ''}
        },
        onWarningSeries: (state, action) => {
            state.series = {name: state.series.name, warning: action.payload.series},
            state.title = {name: state.title.name, warning: action.payload.title},
            state.list = {name: state.list.name, warning: action.payload.list}
        },
        onCallBackSeries: (state) => {
            state.callback = true
        },
        onAddItemsSeries: (state) => {
            state.addItems = false
        },
        onLoadingSeries: (state) => {
            state.series =  {name: '', warning: ''},
            state.title =  {name: '', warning: ''},
            state.list = {name: '', warning: ''}
        }

    },
    extraReducers: (builder) => {
        // view series menu headers
        builder.addCase(viewProductHeadresThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewProductHeadresThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewProductHeadresThunk.fulfilled, (state, action) => {
            state.products = action.payload
        })

        // create item series menu headers
        builder.addCase(createProductHeadersThunk.pending, (state) => {
            state.warningMessage  = ''
            state.addItems  = false
            state.callback = false
        })
        builder.addCase(createProductHeadersThunk.rejected, (state, action) => {
            state.callback = false
            state.addItems = false  
            state.warningMessage = action.payload as string
        })
        builder.addCase(createProductHeadersThunk.fulfilled, (state, action) => {
            state.callback =  false;
            state.addItems = action.payload === true ? true : false;

        })
        
        // delete item series menu headers
        builder.addCase(deleteItemsProductHeadersThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteItemsProductHeadersThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteItemsProductHeadersThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.products = action.payload
        })

        // change status item series menu headers
        builder.addCase(changeStatusItemProductThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(changeStatusItemProductThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(changeStatusItemProductThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.products = action.payload
        })
             
        // readign item series menu headers
        builder.addCase(readingItemProdcutHeadersThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(readingItemProdcutHeadersThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingItemProdcutHeadersThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            const answer = action.payload as TProductMenusHeaderObject
            state.list = {name: answer.list, warning : ''}
            state.title = {name: answer.title, warning: ''}
            state.series = {name: answer.series, warning: ''}
        })

        // edit item category menu headers
        builder.addCase(editItemsProdcutHeadersThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
        })
        builder.addCase(editItemsProdcutHeadersThunk.rejected, (state, action) => {
            state.callback = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(editItemsProdcutHeadersThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
        })
    }
})

export default sereisSlice
export const {onAddItemsSeries, onCallBackSeries, onListSeries, onLoadingSeries, onSeriesMenus, onTitleSeries, onWarningSeries} = sereisSlice.actions