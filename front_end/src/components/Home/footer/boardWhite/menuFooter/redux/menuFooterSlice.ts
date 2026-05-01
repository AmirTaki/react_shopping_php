import { createSlice } from "@reduxjs/toolkit"

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

    }
})

export default menuFooterSlice

export const {} = menuFooterSlice.actions