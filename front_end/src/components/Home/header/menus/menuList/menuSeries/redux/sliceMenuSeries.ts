import { createSlice } from "@reduxjs/toolkit";
import { viewProductHeadresThunk } from "./actionsMenuSeries";

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
    }
})

export default sereisSlice
export const {onAddItemsSeries, onCallBackSeries, onListSeries, onLoadingSeries, onSeriesMenus, onTitleSeries, onWarningSeries} = sereisSlice.actions