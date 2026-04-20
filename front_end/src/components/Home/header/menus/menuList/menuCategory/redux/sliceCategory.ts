import { createSlice } from "@reduxjs/toolkit";
import { viewCategoryHeadresThunk, createCategoryHeadersThunk, deleteItemsCategoryHeadersThunk } from "./actionCategory";

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
        onSignCategory: (state, action) => {
            state.sign = {name: action.payload.sign, warning: ''}
        },
        onWarningCategory: (state, action) => {
            state.category = {name: state.category.name, warning: action.payload.category}
            state.list = {name: state.list.name, warning: action.payload.list}
            state.title = {name: state.title.name, warning: action.payload.title}
        },
        onCallBackCategory: (state) => {
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
    extraReducers: (builder) => {
        // view category menu headers
        builder.addCase(viewCategoryHeadresThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewCategoryHeadresThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewCategoryHeadresThunk.fulfilled, (state, action) => {
            state.categories = action.payload
        })

        // create category item menu headers
        builder.addCase(createCategoryHeadersThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createCategoryHeadersThunk.rejected, (state, action) => {
            state.callback = false
            state.addItems = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(createCategoryHeadersThunk.fulfilled, (state, action) => {
            state.callback = false
            state.addItems = action.payload === true ? true : false
        })

        // delete item category menu headers
        builder.addCase(deleteItemsCategoryHeadersThunk.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteItemsCategoryHeadersThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteItemsCategoryHeadersThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.warningMessage = ''
            state.categories = action.payload
        })


    }
})

export default categorySlice
export const {onSignCategory, onLoadingCategory, onAddItemsCategory, onCallBackCategory, onCategoryMenus,    onListCategory,    onTitleCategory,   onWarningCategory, } = categorySlice.actions