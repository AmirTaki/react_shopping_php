import { createSlice } from "@reduxjs/toolkit";

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
        }
    },
    extraReducers: (builder) => {}
})

export default listMenus
export const {onAddItemsListMenus, onCallBackListMenus, onListMenus, onTitleListMenus, onWarningListMenus, } = listMenus.actions