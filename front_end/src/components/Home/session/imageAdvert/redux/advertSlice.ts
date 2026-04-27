import { createSlice } from "@reduxjs/toolkit";

interface IScrollSlider {
    items: Array<string>,
    counter: number
}

const initialState: IScrollSlider = {
    items: ['silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'orange', 'silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'orange', 'green'],
    counter: 0
}

const advertSlice = createSlice({
    name: 'scroll_slider_toolkit',
    initialState: initialState,
    reducers: {
        handlerScrollTo: (state, action) => {
            const {index} = action.payload
            const maxIndex =  state.items.length - 1
            const newIndex = Math.max(0, Math.min(index, maxIndex))
            state.counter = newIndex
        },

        handlerButtons: (state, action) => {
            state.counter = action.payload.index
        },
        
    }
            
})
export default advertSlice;
export const {handlerScrollTo, handlerButtons} = advertSlice.actions