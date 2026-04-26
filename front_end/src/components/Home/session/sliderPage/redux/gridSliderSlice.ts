import { createSlice } from "@reduxjs/toolkit";

interface IGridSwiper {
    items: Array<string>,
    slide: number,
    isTransition : boolean,
    widthContainer: number,
    innerWidth: number,
    isDrag: boolean,
    startX: number,
    currentX: number, 
    dragOffset: number,
    sizeItmes: number,
    buttons: Array<string>,

    slideSM: number,
    slideMD: number, 
    slideLG: number
}

const initialState: IGridSwiper = {
    items: ['silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'orange', 'silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'blue', 'green' ],
    slide: 0,
    isTransition: false,
    widthContainer: 0,
    innerWidth: 0,
    isDrag: false, 
    startX: 0,
    currentX: 0, 
    dragOffset: 0,
    sizeItmes: 0,
    buttons: [''],

    slideSM: 0,
    slideMD: 0, 
    slideLG: 0
}

const GridSwiperSlice =  createSlice({
    name: 'grid_swiper_toolkit',
    initialState: initialState,
    reducers: {
        transitionEnd: (state ) => {
            state.isTransition = false
        },
        rightClick: (state, action) => {
            state.slide + action.payload.distance >= state.sizeItmes ? state.slide = state.sizeItmes -1 : state.slide += action.payload.distance
            state.isTransition = true
        },

        leftClick: (state, action) => {
            const distance =  state.slide - action.payload.distance < 0 ? 0 : action.payload.distance
            state.slide -= distance
            state.isTransition = true
        },
        handlerWidthContainer: (state, action) => {
            state.widthContainer = action.payload.offset
            
            if(window.innerWidth <= 768) {
                state.sizeItmes =  state.items.length 
            }
            else if (window.innerWidth > 768 && window.innerWidth <= 1024){
                state.sizeItmes =  Math.ceil (state.items.length / 2) 
            }
            else if (window.innerWidth > 1024){
                state.sizeItmes =  Math.ceil(state.items.length / 3) 
            } 
            else {
                state.sizeItmes = 0 
            }
        },
        
        gridDown: (state, action) => {
            state.isDrag = true
            state.isTransition = false;
            state.startX = action.payload.client
        },  

        gridMove: (state, action) => {
           if (!state.isDrag) return;
            state.currentX = action.payload.client
            state.dragOffset = state.currentX - state.startX
        },

        gridUp: (state) => {
            if (!state.isDrag) return;
            state.isDrag = false

            const scale = state.widthContainer * .2

            if(state.dragOffset > scale){
                const distance =  state.slide - 1 < 0 ? 0 : 1
                state.slide -= distance
                state.isTransition = true
            }
            else if (state.dragOffset < -scale){
                state.slide + 1 >= state.sizeItmes ? state.slide = state.sizeItmes -1 : state.slide += 1
                state.isTransition = true
            }
            else {  
                state.isTransition = true
            }
            state.dragOffset = 0
        },
        handlerButtons: (state )  => {
            state.buttons = Array.from({length: state.sizeItmes}, (_, i) => `item ${i + 1}`)
        },
        handlerChangeButton: (state, action) => {
            state.slide = action.payload.index;
            state.isTransition = true
        }
    }
})

export default GridSwiperSlice;
export const {transitionEnd, rightClick, leftClick, handlerWidthContainer,  gridDown, gridMove, gridUp, handlerButtons, handlerChangeButton} = GridSwiperSlice.actions