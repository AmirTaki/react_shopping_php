import { createSlice } from "@reduxjs/toolkit";

interface IScrollSlider {
    items: Array<string>,
    extra: Array<string>,
    counter: number,
    smooth: boolean,
    activeIndicatore: number
}

const initialState: IScrollSlider = {
    items: ['silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'orange', 'silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'orange', 'green'],
    extra: [''],
    counter: 0,
    smooth: false,
    activeIndicatore: 0
}
 
const imageSliderLoopSlice =  createSlice({
    name: 'scroll_slider_loop_toolkit',
    initialState: initialState,
    reducers: {
        extract: (state, ) => {
            state.extra = [...state.items.slice(-2), ...state.items, ...state.items.slice(0, 2)]
        },
        handlerScrollTo: (state, action) => {
            const {number} = action.payload
            const {smooth} = action.payload
           
            state.counter = number
            state.smooth = smooth
        },
        handlerScrollEnd: (state) => {
            if(state.counter > state.extra.length - 2 ){
                state.counter = state.counter - state.items.length
                state.smooth = false
            }
            else if (state.counter < 2){
                state.counter = state.counter + state.items.length 
                state.smooth = false
            }
        },
 
        handlerActiveIndicatore: (state) => {
            state.activeIndicatore = (state.counter - 2) % state.items.length
            if(state.activeIndicatore < 0) state.activeIndicatore += state.items.length
        },


    }
})

export default imageSliderLoopSlice
export const {extract, handlerScrollTo, handlerActiveIndicatore, handlerScrollEnd} = imageSliderLoopSlice.actions