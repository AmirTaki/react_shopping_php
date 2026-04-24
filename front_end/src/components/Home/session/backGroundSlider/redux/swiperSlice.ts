import { createSlice } from "@reduxjs/toolkit";

interface ISwiperToolkit {
    sliders : Array<string>,
    extractSliders: Array<string>,
    slide: number,
    isTransition: boolean,
    widthContainer: number,
    isDrag: boolean,
    startX: number,
    currentX: number,
    dragOffset: number,
    activeIndicator: number
}


const initialState: ISwiperToolkit =  {
    sliders : ['blue', 'red', 'yellow', 'pink', 'brown', 'green', 'gray', 'orange', 'silver','blue', 'red', 'yellow', 'pink', 'brown', 'green', 'gray', 'orange', 'silver',],
    extractSliders: [''],
    slide: 2,
    isTransition: false, 
    widthContainer: 0,
    isDrag: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,
    activeIndicator: 0
}

const SwiperSlicer = createSlice({
    name: 'swiper_toolkit',
    initialState: initialState,
    reducers: {
        clickRight: (state, action) => {
            state.slide += action.payload.number
            state.isTransition = true
        },

        clickLeft: (state, action) => {
            state.slide -= action.payload.number
            state.isTransition = true
        },

        endTransition: (state) => {
            state.isTransition = false
            
            if(state.slide > state.extractSliders.length - 2){
                state.slide = state.slide - state.sliders.length
            }
            else if (state.slide < 2){
                state.slide = state.slide + state.sliders.length
            }
           
        },

        handlerWidthContainer: (state, action) => {
            state.widthContainer = action.payload.offset
        },

        handlerExtractSliders : (state) => {
            state.extractSliders = [...state.sliders.slice(-2), ...state.sliders, ...state.sliders.slice(0, 2)]
        },

        HandlerMouseDown: (state, action) => {
            state.isDrag = true;
            state.startX = action.payload.client
            state.isTransition = false
        },

        HanlderMouseMove: (state, action) => {
            if(!state.isDrag) return;
            state.currentX = action.payload.client;
            state.dragOffset = state.currentX - state.startX;
        },

        HandlerMouseUp: (state) => {
            if(!state.isDrag) return;

            state.isDrag = false;
            const scale = state.widthContainer * .2

            const distance = Math.ceil(Math.abs(state.currentX - state.startX) / state.widthContainer)

            if(state.dragOffset > scale){
                state.slide -= distance
                state.isTransition = true
            }
            else if (state.dragOffset < -scale){
                state.slide += distance;
                state.isTransition = true
            }
            else {
                state.isTransition = true
            }

            state.dragOffset = 0
        },
        HandlerButton:(state, action) => {
            state.slide = action.payload.index
            state.isTransition = true
        },

        HandlerActiveButton: (state, ) => {
            state.activeIndicator = (state.slide - 2) % state.sliders.length
            if(state.activeIndicator < 0) state.activeIndicator += state.sliders.length
        }
    }
})

export default SwiperSlicer
export const {clickRight, clickLeft, endTransition, handlerWidthContainer, handlerExtractSliders, HandlerMouseDown, HanlderMouseMove, HandlerMouseUp, HandlerActiveButton, HandlerButton} = SwiperSlicer.actions;
