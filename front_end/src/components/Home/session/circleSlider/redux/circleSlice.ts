import { createSlice } from "@reduxjs/toolkit";
import { viewCircleSliderSessionThunk } from "./actionsCircle";

export type TCircleSwiper = Array<{id: number, image: string, title: string, status: number, created_at: string, updated_at: string}> | string | boolean
export type  TCircleSwiperObject = {id: number, image: string, title: string, status: number, created_at: string, updated_at: string}

interface ICircle {
    items: TCircleSwiper,
    conter : number,
    isDrag: boolean,
    startX: number,
    currentX: number, 
    dragOffset: number,

    // panel admin
    warningMessage: string,
    loading: boolean, 
}

const initialState: ICircle = {
    items: [],
    conter: 0,
    isDrag: false,
    startX: 0,
    currentX: 0, 
    dragOffset: 0,

    // loading
    warningMessage: '',
    loading: false
}

const circleSlicer  = createSlice({
    name: 'swiper_circle_toolkit',
    initialState: initialState, 
    reducers: {
        handlerConter: (state, action) => {
            state.conter += action.payload.number
        }, 
        circleDown: (state, action) => {
            state.isDrag = true
            state.startX = action.payload.client
        },
        circleMove: (state, action) => {
            if(state.isDrag){
                state.currentX = action.payload.client
                state.dragOffset = (state.currentX - state.startX )/ 3
            }
        },
        circleUp: (state,) => {
            if(state.isDrag){
                state.isDrag = false
                const scale = 150 * .2
                const distance = Math.ceil(Math.abs(state.currentX - state.startX) / 300)

                if(state.dragOffset > scale){
                    state.conter += distance
                }
                else if(state.dragOffset < -scale){
                    state.conter -= distance
                }
                else {

                }

                state.dragOffset = 0
            }
        }

        // panel admin
    },
    extraReducers: (builder) => {
        // view circle sliders 
        builder.addCase(viewCircleSliderSessionThunk.pending, (state, ) => {
            state.warningMessage = ''
        })
        builder.addCase(viewCircleSliderSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewCircleSliderSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload
        })
    }
})

export default circleSlicer;
export const {handlerConter, circleDown, circleMove, circleUp} = circleSlicer.actions