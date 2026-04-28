import { createSlice } from "@reduxjs/toolkit";

interface ICircle {
    items: Array<{id: number, color: string, }>,
    conter : number,
    isDrag: boolean,
    startX: number,
    currentX: number, 
    dragOffset: number
}

const initialState: ICircle = {
    items: [
        {id: 0, color: 'blue', }, {id: 1, color: 'red',  },{id: 2, color: 'green', }, {id: 3, color: 'yellow', },
        {id: 4, color: 'silver', }, {id: 5, color: 'brown', },{id: 6, color: 'pink', }, {id: 7, color: 'white',  },
        {id: 8, color: 'silver', }, {id: 9, color: 'brown', },{id: 10, color: 'pink', }, {id: 11, color: 'white',  },
        {id: 12, color: 'silver', }, {id: 13, color: 'brown', },{id: 14, color: 'pink', }, {id: 15, color: 'white', }
    ],
    conter: 0,
    isDrag: false,
    startX: 0,
    currentX: 0, 
    dragOffset: 0
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
    }
})

export default circleSlicer;
export const {handlerConter, circleDown, circleMove, circleUp} = circleSlicer.actions