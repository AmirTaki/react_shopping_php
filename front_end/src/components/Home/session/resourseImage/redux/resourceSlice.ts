import { createSlice } from "@reduxjs/toolkit";

interface IPayloar {
    items: Array<string>,
    translateX: number,
    isTransition: boolean,
    widthContainer: number,
    isDrag: boolean,
    startX: number,
    currentX: number,
    dragOffset: number,
    sizeContainer: number,
    widthScroll: number,
    sizeThumble: number,
    isScroll: boolean,
    startScroll: number,
    currentScroll: number,
    dragScroll: number,
    translateThumble: number
}
const initialState: IPayloar = {
    items: ['silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'orange', 'silver','blue', 'pink', 'green', 'red', 'white', 'yellow', 'pink', 'gray', 'orange',],
   
    // scroll slide
    translateX: 0,
    isTransition: true,
    widthContainer: 0,
    isDrag: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,

    // scroll thumb
    sizeContainer: 0,
    widthScroll: 0,
    sizeThumble: 0,
    isScroll: false,
    startScroll: 0,
    currentScroll: 0,
    dragScroll: 0,

    translateThumble: 0

}

const resourceImageSlice = createSlice({
    name: 'payloar_toolkit',
    initialState: initialState,
    reducers: {
        handlerSizeContainer: (state) => {
            const sizeRef = (state.items.length * 350) + (state.items.length * 20)
            state.sizeContainer = sizeRef - state.widthContainer
        },
        rightClick: (state, action) => {           
            const newTranslate = state.translateX + action.payload.distance >= state.sizeContainer ? state.sizeContainer - state.translateX : action.payload.distance
            
            state.isTransition = true
            state.translateX += newTranslate
        },
        leftClick: (state, action) => {
            const newTranslate = state.translateX - action.payload.distance <= 0 ? state.translateX : action.payload.distance
           
            state.isTransition = true,
            state.translateX -= newTranslate
        },
        endTranistion: (state) => {
            state.isTransition = false
        },
        handlerWidthContainer: (state, action) => {
            state.widthContainer = action.payload.offset
        },  
        payloarDown: (state, action) => {
            state.isDrag = true
            state.startX = action.payload.client
            state.isTransition = false
        },
        payloarMove: (state, action) => {
            if (state.isDrag){
                state.currentX = action.payload.client
                state.dragOffset = state.currentX - state.startX
            }
        },
        payloarUp: (state, ) => {
            if(state.isDrag){
                state.isDrag = false
               
                if(state.dragOffset > 0){
                    const newTranslate = state.translateX - (state.dragOffset * 2) <= 0 ? state.translateX : state.dragOffset * 2
                    state.isTransition = true,
                    state.translateX -= newTranslate
                }
               
                else if(state.dragOffset < 0){
                    const newTranslate = state.translateX + (-state.dragOffset * 2) >= state.sizeContainer ? state.sizeContainer - state.translateX : -state.dragOffset * 2
                    state.isTransition = true
                    state.translateX += newTranslate
                }
               
                else {
                    state.isTransition = true
                }
                state.dragOffset = 0
            }
        },
   
        handlerContainerScroll: (state, action) => {
            state.widthScroll = action.payload.offset
        },
        sizeThumbe: (state,) => {
            const size = (state.items.length * 350) + (state.items.length * 20) 
            state.sizeThumble =  state.widthScroll / ( size / state.widthContainer )

        },
        scrollStart: (state, action) => {
            state.isScroll = true
            state.startScroll =  action.payload.client
            state.isTransition = false
        },
        scrollMove: (state, action) => {
            if(!state.isScroll) return;
            state.currentScroll = action.payload.client  
            state.dragScroll = state.currentScroll - state.startScroll
            
        },
        scrollUp: (state) => {
            if(!state.isScroll) return;

            state.isScroll = false;

            if(state.currentScroll > state.startScroll){

                const translate = state.dragScroll * (((state.items.length * 350) + (state.items.length * 20)) / state.widthContainer)

                const newTranslate = state.translateX + translate >= state.sizeContainer ? state.sizeContainer - state.translateX : translate
            
                state.isTransition = true
                state.translateX += newTranslate
            }
            else if (state.currentScroll < state.startScroll){
                const translate = - state.dragScroll * (((state.items.length * 350) + (state.items.length * 20)) / state.widthContainer)
                
                const newTranslate = state.translateX - translate <= 0 ? state.translateX : translate
           
                state.isTransition = true,
                state.translateX -= newTranslate
            }
            else {
                state.isTransition = true
            }
            state.dragScroll = 0
        },
        handlerTranslateThumble: (state, action) => {
            state.translateThumble= action.payload.thumble
        },

        // panel admin
        

    }
})

export default resourceImageSlice
export const {rightClick, endTranistion, leftClick, handlerWidthContainer, payloarDown, payloarMove, payloarUp, handlerSizeContainer, handlerContainerScroll ,sizeThumbe, scrollStart, scrollMove, scrollUp, handlerTranslateThumble, } = resourceImageSlice.actions