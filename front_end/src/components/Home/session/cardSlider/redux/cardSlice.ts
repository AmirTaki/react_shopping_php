import { createSlice } from "@reduxjs/toolkit";

interface ISlider {
    sliders: Array<string>;
    extractSliders: Array<string>,
    slide: number,
    isTransition: Boolean,
    widthContiner: number,
    isDrag: boolean,
    startX: number,
    currentX: number,
    dragOffset: number,
    activeIndicatore: number
}

const initialState: ISlider = {
    sliders : ['blue', 'red', 'yellow', 'pink', 'brown', 'green', 'gray', 'orange', 'silver','blue', 'red', 'yellow', 'pink', 'brown', 'green', 'gray', 'orange', 'silver',],
    extractSliders: [''],
    slide: 2,
    isTransition: false,
    widthContiner: 0,
    isDrag: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,
    activeIndicatore: 0
}

const cardSlice = createSlice({
    name: 'SliderSlicer_toolkit',
    initialState: initialState, 
    reducers: {
        handlerExtractSliders: (state, ) => {
            state.extractSliders = [...state.sliders.slice(-2), ...state.sliders, ...state.sliders.slice(0, 2)]
        },
        nextSlide: (state, action) => {
            state.slide = state.slide += action.payload.index
            state.isTransition = true
        },
        prevSlide: (state, action) => {
            state.slide = state.slide -= action.payload.index
            state.isTransition = true
        },
        transitionEnd: (state) => {
            state.isTransition = false;
            if(state.slide > state.extractSliders.length - 2){
                state.slide = state.slide - state.sliders.length
            }
            else if (state.slide < 2){
                state.slide = state.slide + state.sliders.length
            }
        },
        handlerWidthContainer: (state, action) => {
            state.widthContiner = action.payload.offsetWidth
        },
        handlerDownSlide: (state, action) => {
            state.startX = action.payload.client
            state.isDrag = true
            state.isTransition = false
        },
        handlerMoveSlide: (state, action) => {
            if(state.isDrag){
                state.currentX = action.payload.client
                state.dragOffset = state.currentX - state.startX
            }
        },
        handlerUpSlide: (state) => {
            if(state.isDrag){
                state.isDrag = false
                
                const scale = state.widthContiner * .2;
                const distance =  Math.ceil(Math.abs(state.dragOffset) / state.widthContiner)

                if(state.dragOffset > scale){
                    state.slide -= distance;
                    state.isTransition = true
                }
                else if(state.dragOffset < -scale){
                    state.slide += distance;
                    state.isTransition = true
                }
                else {
                    state.isTransition = true
                }
                state.dragOffset = 0
            }
        },
        buttonCircle: (state, action) => {
            state.slide = action.payload.index;
            state.isTransition = true
        },
        handlerActiveButton: (state) => {
            state.activeIndicatore = (state.slide - 2) % state.sliders.length;
            if(state.activeIndicatore < 0) state.activeIndicatore += state.sliders.length
        }


    }
})

export default cardSlice;
export const {handlerExtractSliders, nextSlide, prevSlide, transitionEnd, handlerWidthContainer, handlerDownSlide, handlerMoveSlide, handlerUpSlide, buttonCircle, handlerActiveButton} = cardSlice.actions