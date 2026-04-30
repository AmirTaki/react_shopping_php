import { createSlice } from "@reduxjs/toolkit";

interface ICube {
    items: Array<{id: number, color: string, deg: number}>,
    degree: number, 
    isTransition: boolean,
    isDrag: boolean,
    startX: number,
    currentX: number, 
    dragOffset: number

}

const initialState: ICube = {
    items: [{id: 0, color: 'blue', deg: 0 }, {id: 1, color: 'red', deg: 90 },{id: 2, color: 'green', deg: 180 }, {id: 3, color: 'yellow', deg: 270 }],
    degree: 0,
    isTransition: false,
    isDrag: false,
    startX: 0,
    currentX: 0, 
    dragOffset: 0
}

const cubeSlicer =  createSlice({
    name: 'cube_Toolkit',
    initialState: initialState, 
    reducers: {
        clickRight: (state, action) => {
            state.degree -= action.payload.degree
            state.isTransition = true
        },
        clickLeft: (state, action) => {
            state.degree += action.payload.degree
            state.isTransition = true
        },
        endTransitionEnd: (state) => {
            state.isTransition = false
        },
        downCube: (state, action) => {
            state.isDrag = true
            state.isTransition = false
            state.startX = action.payload.client
        },
        moveCube: (state, action) => {
            if(state.isDrag){
                state.currentX = action.payload.client
                state.dragOffset = (state.currentX - state.startX)  / 2
            }
        },

        upCube: (state) => {
            if(state.isDrag){
                state.isDrag = false
                const scale = 300 * .2

                if(state.dragOffset > scale){
                    const distance = Math.ceil(state.dragOffset / 180) * 90
                    state.degree += distance
                    // state.degree += 90
                    state.isTransition = true
                }

                else if(state.dragOffset < -scale){
                    const distance = Math.ceil(Math.abs(state.dragOffset) /180 ) * 90
                    state.degree -= distance;
                    // state.degree -= 90;
                    state.isTransition = true
                }
                
                else {
                    state.isTransition = true
                }
                state.dragOffset = 0
            }
        }
    }
})
export default cubeSlicer;
export const {clickRight, clickLeft, endTransitionEnd, downCube, moveCube, upCube} = cubeSlicer.actions