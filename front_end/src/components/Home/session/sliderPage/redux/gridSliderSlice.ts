import { createSlice } from "@reduxjs/toolkit";
import {readingItemSliderPageSessionThunk, editItemSliderPageSessionThunk, deleteSliderPageSessionThunk, changeStatusSliderPageSessionThunk, readingAllItemsSliderPageSessionThunk, viewSliderPageSessionThunk, createSliderPageSessionThunk } from "./actionsGridSlider";
import { imgURL } from "../../../../../baseURL";

export type TSliderPage =   Array<{id: number, image: string, body: string, status: number, created_at: string, updated_at: string}> | string | boolean
export type TSliderPageObject = {id: number, image: string, body: string, status: number, created_at: string, updated_at: string}


interface IGridSwiper {
    items: TSliderPage ,
    warningMessage: string

    // create & edit
    urlImage: string , // save url image & view for user

    // image: string,  // save view image for reading item
    image: {url: string, warning: string}
    body: {caption: string, warning: string}    
    addItems: boolean, 
    callback: boolean,

    // stauts & delete
    loading: boolean, 
}

const initialState: IGridSwiper = {
    items: [],
    warningMessage: '',
    // create & edit
    urlImage: '' , // save url image & view for user

    // image: string,  // save view image for reading item
    image: {url: '', warning: ''},
    body: {caption: '', warning: ''},    
    addItems: false, 
    callback: false,

    // stauts & delete
    loading: false, 
}

const GridSwiperSlice =  createSlice({
    name: 'grid_swiper_toolkit',
    initialState: initialState,
    reducers: {

        // panel admin
        onLoadingGrid: (state) => {
            state.urlImage = ''
            state.body = {caption: '', warning: ''},
            state.image = {url: '', warning: ''}
        },
        onSetItemsGrid: (state) => {
            state.addItems = false
        },
        onSetURLGrid: (state, action) => {
            state.urlImage = action.payload.result
        },
        onBodyGrid: (state, action) => {
            state.body = {caption: action.payload.body, warning: ''}
        },
        onWarningGrid: (state, action) => {
            state.image = {url: state.image.url, warning: action.payload.image}
            state.body = {caption: state.body.caption, warning: action.payload.body}
        },
        onCallBackGrid: (state,) => {
            state.callback = true
        }

    },
    extraReducers(builder){

        // view items slider page -> grid image    
        builder.addCase(viewSliderPageSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        
        builder.addCase(viewSliderPageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        
        builder.addCase(viewSliderPageSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload 
        })

        // create items slider page -> grid image
        builder.addCase(createSliderPageSessionThunk.pending, (state)=> {
            state.addItems = false
            state.callback = false
            state.warningMessage = ''
        })
        builder.addCase(createSliderPageSessionThunk.rejected, (state, action)=> {
            state.callback = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(createSliderPageSessionThunk.fulfilled, (state, action)=> {
            state.addItems = action.payload === true ? true : false
            state.callback = false
            state.warningMessage = ''
        })

        // delete item slider page -> grid image
        builder.addCase(deleteSliderPageSessionThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(deleteSliderPageSessionThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteSliderPageSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.items = action.payload
        })

        // change status slider page -> grid image
        builder.addCase(changeStatusSliderPageSessionThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(changeStatusSliderPageSessionThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(changeStatusSliderPageSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.items = action.payload
        })
        
        // reading item slider page -> grid image
        builder.addCase(readingItemSliderPageSessionThunk.pending, (state, ) => {
            state.urlImage = ''
        })
        builder.addCase(readingItemSliderPageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingItemSliderPageSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            const reading = action.payload as TSliderPageObject
            state.urlImage = imgURL + reading.image
            state.body = {caption: reading.body, warning: ''}
        })
        
        // edit  item slider page -> grid image
        builder.addCase(editItemSliderPageSessionThunk.pending, (state) => {
            state.addItems = false;
            state.callback = false
            state.warningMessage = ''
        })
        builder.addCase(editItemSliderPageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.callback = false
            state.addItems = false
        })
        builder.addCase(editItemSliderPageSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload == true ? true : false
            state.callback = false;
            state.warningMessage = ''
        })
        
        // reading all items slider page -> grid image    
        builder.addCase(readingAllItemsSliderPageSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        
        builder.addCase(readingAllItemsSliderPageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        
        builder.addCase(readingAllItemsSliderPageSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload 
        })
    }
})

export default GridSwiperSlice;
export const {onBodyGrid, onCallBackGrid, onLoadingGrid, onSetItemsGrid, onSetURLGrid, onWarningGrid, } = GridSwiperSlice.actions