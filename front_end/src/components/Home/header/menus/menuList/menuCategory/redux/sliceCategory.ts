import { createSlice } from "@reduxjs/toolkit";


export type TCategoryMenuHeader =  Array<{id: number, category: string,  list: string, title: string, sign: string, status: number, created_at: string, updated_at: string }> | boolean  | string
export type TCategoryMenusHeaderObject = {id: number, category: string,  list: string, title: string, sign: string, status: number, created_at: string, updated_at: string }

interface ICategory {
    categories: TCategoryMenuHeader,
    warningMessage: string,

    // create & edit
    category: {name: string, warning: string},
    title: {name: string, warning: string},
    list: {name: string, warning: string},
    sign: {name: string, warning: string},
    callback: boolean,
    addItems: boolean, 

    // delete & edit
    loading: boolean
}
const initialState: ICategory = {
    categories: [],
    warningMessage: '',

    // create & edit
    category: {name: '', warning: ''},
    title: {name: '', warning: ''},
    list: {name: '', warning: ''},
    sign: {name: '', warning: ''},
    callback: false,
    addItems: false, 

    // delete & edit
    loading: false
}

const categorySlice = createSlice({
    name: 'category_headers_toolkit',
    initialState: initialState,
    reducers: {
        onCategoryMenus: (state, action) => {
            state.category = {name: action.payload.category, warning: ''}
        },
        onListCategory: (state, action) => {
            state.list = {name: action.payload.list, warning: ''}
        },
        onTitleCategory: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onWarningCategory: (state, action) => {
            state.category = {name: state.category.name, warning: action.payload.category}
            state.list = {name: state.list.name, warning: action.payload.list}
            state.title = {name: state.title.name, warning: action.payload.title}
        },
        onCallBackCategory: (state, action) => {
            state.callback = false
        },
        onAddItemsCategory: (state) => {
            state.addItems = false
        },
        onLoadingCategory: (state) => {
            state.category = {name: '', warning: ''},
            state.title =  {name: '', warning: ''},
            state.list =  {name: '', warning: ''},
            state.sign = {name: '', warning: ''}
        }

    },
    extraReducers: (builder) => {}
})

export default categorySlice
export const {} = categorySlice.actions