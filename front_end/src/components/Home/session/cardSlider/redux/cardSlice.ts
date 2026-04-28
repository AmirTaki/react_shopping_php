import { createSlice } from "@reduxjs/toolkit";
import { imgURL } from "../../../../../baseURL";
import { viewCardSliderSessionThunk } from "./actionCard";

export type TSwiperCard = Array<{id: number, image: string, title: string, status: number, created_at: string, updated_at: string}> | string | boolean
export type TSwiperCardObject = {id: number, image: string, title: string, status: number, created_at: string, updated_at: string}

interface ISlider {
    sliders: TSwiperCard;
    extractSliders: TSwiperCard,
    slide: number,
    isTransition: Boolean,
    widthContiner: number,
    isDrag: boolean,
    startX: number,
    currentX: number,
    dragOffset: number,
    activeIndicatore: number
    

    // panel admin
    warningMessage: string, 
     
    // status & delete 
    loading: boolean
}

const initialState: ISlider = {
    sliders : [],
    extractSliders: [],
    slide: 2,
    isTransition: false,
    widthContiner: 0,
    isDrag: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,
    activeIndicatore: 0,

    // panel admin
    warningMessage: '', 
     
    // status & delete 
    loading: false
}

const cardSlice = createSlice({
    name: 'SliderSlicer_toolkit',
    initialState: initialState, 
    reducers: {
        handlerExtractSliders: (state, ) => {
            if(Array.isArray(state.sliders))
            {
                state.extractSliders = [...state.sliders.slice(-2), ...state.sliders, ...state.sliders.slice(0, 2)]
            }
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
            if(Array.isArray(state.sliders) && Array.isArray(state.extractSliders)){

                if(state.slide > state.extractSliders.length - 2){
                    state.slide = state.slide - state.sliders.length
                }
                else if (state.slide < 2){
                    state.slide = state.slide + state.sliders.length
                }
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
            if(Array.isArray(state.sliders)){
                state.activeIndicatore = (state.slide - 2) % state.sliders.length;
                if(state.activeIndicatore < 0) state.activeIndicatore += state.sliders.length
            }
        }
        // panel admin
    },
    extraReducers: (builder) => {
        // view item card slider
        builder.addCase(viewCardSliderSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewCardSliderSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewCardSliderSessionThunk.fulfilled, (state, action) => {
            state.sliders = action.payload
            state.warningMessage = ''
        })

    }
})

export default cardSlice;
export const {handlerExtractSliders, nextSlide, prevSlide, transitionEnd, handlerWidthContainer, handlerDownSlide, handlerMoveSlide, handlerUpSlide, buttonCircle, handlerActiveButton} = cardSlice.actions