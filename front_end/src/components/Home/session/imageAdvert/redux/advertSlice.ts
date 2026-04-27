import { createSlice } from "@reduxjs/toolkit";
import { readingAllItemsImageAdvertSessionThunk, viewImageAdvertSessionThunk } from "./actionAdvert";

export type TImageAdvert = Array<{id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}> | string | boolean
export type TImageAdvertObject = {id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}

interface IScrollSlider {
    items: TImageAdvert ,
    counter: number,

    warningMessage: string
}

const initialState: IScrollSlider = {
    items: [],
    counter: 0,

    warningMessage: ''
}

const advertSlice = createSlice({
    name: 'scroll_slider_toolkit',
    initialState: initialState,
    reducers: {
        handlerScrollTo: (state, action) => {
            const {index} = action.payload
            const maxIndex =  Array.isArray(state.items) ? state.items.length - 1 : 0
            const newIndex = Math.max(0, Math.min(index, maxIndex))
            state.counter = newIndex
        },

        handlerButtons: (state, action) => {
            state.counter = action.payload.index
        },
        
    },
    extraReducers: (builder) => {
        // view item image advert : advert image
        builder.addCase(viewImageAdvertSessionThunk.pending, (state) =>  {
            state.warningMessage = ''
        })
        builder.addCase(viewImageAdvertSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })
        
        //  reading all items image advert: advert image
        builder.addCase(readingAllItemsImageAdvertSessionThunk.pending, (state) =>  {
            state.warningMessage = ''
        })
        builder.addCase(readingAllItemsImageAdvertSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingAllItemsImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })

    }
            
})
export default advertSlice;
export const {handlerScrollTo, handlerButtons} = advertSlice.actions