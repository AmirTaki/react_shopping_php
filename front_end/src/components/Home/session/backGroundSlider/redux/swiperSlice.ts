import { createSlice } from "@reduxjs/toolkit";
import { viewImageSliderSessionThunk, createImageSliderSessionThunk } from "./actionsSwiper";

export type TImageSlider = Array<{id: number, image: string, title: string, status: number, created_at: string, updated_at: string}> | boolean | string
export type TImageSliderObject = {id: number, image: string, title: string, status: number, created_at: string, updated_at: string}

interface ISwiperToolkit {
    // swiper
    sliders : TImageSlider,
    extractSliders: TImageSlider,
    slide: number,
    isTransition: boolean,
    widthContainer: number,
    isDrag: boolean,
    startX: number,
    currentX: number,
    dragOffset: number,
    activeIndicator: number

    // panel Admin 
    warningMessage: string,

    // create & edit
    urlImage: string   // save image url
    image: {name: string, warning: string},
    title: {name: string, warning: string},
    callback: boolean, 
    addItems: boolean,

    // status & delete
    loading: boolean

}


const initialState: ISwiperToolkit =  {
    // swiper
    sliders : [],
    extractSliders: [],
    slide: 2,
    isTransition: false, 
    widthContainer: 0,
    isDrag: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,
    activeIndicator: 0,

    // panelAdmin: 
    warningMessage : '',

    // create & edit
    urlImage: '', // save image url
    image: {name: '', warning: ''},
    title: {name: '', warning: ''},

    callback: false, 
    addItems: false,

    // status & delete
    loading: false
}

const SwiperSlicer = createSlice({
    name: 'swiper_toolkit',
    initialState: initialState,
    reducers: {
        // swiper 
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
            if (Array.isArray(state.sliders) && Array.isArray(state.extractSliders)){
                if(state.slide > state.extractSliders.length - 2){
                    state.slide = state.slide - state.sliders.length
                }
                else if (state.slide < 2){
                    state.slide = state.slide + state.sliders.length
                }
            }
           
        },

        handlerWidthContainer: (state, action) => {
            state.widthContainer = action.payload.offset
        },

        handlerExtractSliders : (state) => {
            if (Array.isArray(state.sliders))
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
            if( Array.isArray(state.sliders)){
                state.activeIndicator = (state.slide - 2) % state.sliders.length
                if(state.activeIndicator < 0) state.activeIndicator += state.sliders.length
            }
        },

        // panel admin
        onTitleSwiper: (state, action) => {
            state.title = {name: action.payload.title, warning : ''}
        },
        onSetURLSwiper: (state, action) => {
            state.urlImage = action.payload.result
        },
        onLoadingSwiper: (state) => {
            state.urlImage = ''
            state.image = {name: '', warning: ''},
            state.title = {name: '', warning: ''}
        },
        onWarningSwiper: (state, action) => {
            state.image = {name: state.image.name,  warning: action.payload.image}
            state.title ={ name: state.title.name,  warning: action.payload.title}
        },
        onCallBackSwiper: (state) => {
            state.callback = true
        },
        onSetItemsSwiper: (state) => {
            state.addItems = false
        }

    },
    extraReducers: (builder) => {
        // view items image sliders
        builder.addCase(viewImageSliderSessionThunk.pending, (state)=> {
            state.warningMessage = ''
        })
        builder.addCase(viewImageSliderSessionThunk.rejected, (state, action)=> {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewImageSliderSessionThunk.fulfilled, (state, action)=> {
            state.warningMessage = ''
            state.sliders = action.payload
        })
        
        // create item image slider
        builder.addCase(createImageSliderSessionThunk.pending, (state) => {
            state.callback = false
            state.addItems =false
            state.warningMessage = ''
        })
        builder.addCase(createImageSliderSessionThunk.rejected, (state, action) => {
            state.callback = false
            state.addItems = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(createImageSliderSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
        })
    }
})

export default SwiperSlicer
export const {clickRight, clickLeft, endTransition, handlerWidthContainer, handlerExtractSliders, HandlerMouseDown, HanlderMouseMove, HandlerMouseUp, HandlerActiveButton, HandlerButton,

    onTitleSwiper,onCallBackSwiper,     onLoadingSwiper, onSetItemsSwiper, onSetURLSwiper, onWarningSwiper
} = SwiperSlicer.actions;
