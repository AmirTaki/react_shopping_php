import { createSlice } from "@reduxjs/toolkit";
import { viewCubeSessionThunk } from "./actionsCube";

export type TCube = Array<{id: number, degree: number, status: number, image: string, created_at: string, updated_at: string}> | string | boolean
export type TCubeObject = {id: number, degree: number, status: number, image: string, created_at: string, updated_at: string}

interface ICube {
    items: TCube,
    degree: number, 
    isTransition: boolean,
    isDrag: boolean,
    startX: number,
    currentX: number, 
    dragOffset: number

    // panel admin
    warningMessage: string,

    
    // create & edit
    urlImage: string   // save image url
    image: {url: string, warning: string},
    angle: {deg: number, warning: string},
    callback: boolean, 
    addItems: boolean,

    // status & delete
    loading: boolean
    

}

const initialState: ICube = {
    items: [],
    degree: 0,
    isTransition: false,
    isDrag: false,
    startX: 0,
    currentX: 0, 
    dragOffset: 0,

    // panel admin
    warningMessage: '',
    
    // create & edit
    urlImage: '', // save image url
    image: {url: '', warning: ''},
    angle: {deg: 0, warning: ''},

    callback: false, 
    addItems: false,

    // status & delete
    loading: false
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
        },

        // panel admin
        onAngleCube: (state, action) => {
            state.angle = {deg: action.payload.deg, warning: ''}
        },
        onSetURLCube: (state, action) => {
            state.urlImage = action.payload.result
        },
        onLoadingCube: (state) => {
            state.urlImage = ''
            state.image = {url: '', warning: ''},
            state.angle = {deg: 0, warning: ''}
        },
        onWarningCube: (state, action) => {
            state.image = {url: state.image.url, warning: action.payload.image}
            state.angle = {deg: state.angle.deg, warning: action.payload.deg}
        },
        onCallBackCube: (state) => {
            state.callback = true
        },
        onSetItemsCube: (state) => {
            state.addItems = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(viewCubeSessionThunk.pending, (state) => {
            state.warningMessage = ''
        } )
        builder.addCase(viewCubeSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewCubeSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload
        })
    }
})
export default cubeSlicer;
export const {clickRight, clickLeft, endTransitionEnd, downCube, moveCube, upCube,
    onAngleCube, onCallBackCube, onLoadingCube, onSetItemsCube, onSetURLCube, onWarningCube
} = cubeSlicer.actions