import { createSlice } from "@reduxjs/toolkit";
import { viewImageSliderLoopSessionThunk, readingAllItemsImageSliderLoopSessionThunk } from "./actionsImageSlider";
export type TImageSliderLoop = Array<{id: number, image: string, title: string, status: number, created_at: string, updated_at: string}> | boolean | string
export type TImageSliderLoopObject = {id: number, image: string, title: string, status: number, created_at: string, updated_at: string}

interface IScrollSlider {
    items: TImageSliderLoop,
    extra: TImageSliderLoop,
    counter: number,
    smooth: boolean,
    activeIndicatore: number,

    // panelAdmin
    warningMessage: string
}

const initialState: IScrollSlider = {
    items: [],
    extra: [],
    counter: 0,
    smooth: false,
    activeIndicatore: 0,

    // panelAdmin
    warningMessage: ''

}
 
const imageSliderLoopSlice =  createSlice({
    name: 'scroll_slider_loop_toolkit',
    initialState: initialState,
    reducers: {
        extract: (state, ) => {
            if(Array.isArray(state.items))
            state.extra = [...state.items.slice(-2), ...state.items, ...state.items.slice(0, 2)]
        },
        handlerScrollTo: (state, action) => {
            const {number} = action.payload
            const {smooth} = action.payload
           
            state.counter = number
            state.smooth = smooth
        },
        handlerScrollEnd: (state) => {
            if(Array.isArray(state.items) && Array.isArray(state.extra)){

                if(state.counter > state.extra.length - 2 ){
                    state.counter = state.counter - state.items.length
                    state.smooth = false
                }
                else if (state.counter < 2){
                    state.counter = state.counter + state.items.length 
                    state.smooth = false
                }
            }
        },
 
        handlerActiveIndicatore: (state) => {
            if(Array.isArray(state.items)){
                state.activeIndicatore = (state.counter - 2) % state.items.length
                if(state.activeIndicatore < 0) state.activeIndicatore += state.items.length
            }
        },


        // panel admin
    },
    extraReducers: (builder) => {
        //  view image slider loop
        builder.addCase(viewImageSliderLoopSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewImageSliderLoopSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewImageSliderLoopSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })
        

        // reading all items image slider looop 
        builder.addCase(readingAllItemsImageSliderLoopSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(readingAllItemsImageSliderLoopSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingAllItemsImageSliderLoopSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })
    }
})

export default imageSliderLoopSlice
export const {extract, handlerScrollTo, handlerActiveIndicatore, handlerScrollEnd} = imageSliderLoopSlice.actions