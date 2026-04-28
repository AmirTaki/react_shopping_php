import { createSlice } from "@reduxjs/toolkit";
import { changeStatusCircleSlidersSessionThunk, viewCircleSliderSessionThunk, readingAllItemsCircleSliderSessionThunk, createCircleSlidersSessionThunk, deleteItemsCircleSlidersSessionThunk } from "./actionsCircle";

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
     
    // create & edit 
    urlImage: string , // save url image & view for user
    image: {url: string, warning: string}, // save view image for reading item
    title: {name: string, warning: string},
    addItems: boolean,
    callback: boolean,

    // status & delete 
    loading: boolean
}


const initialState: ICircle = {
    items: [],
    conter: 0,
    isDrag: false,
    startX: 0,
    currentX: 0, 
    dragOffset: 0,

    // panel admin
    warningMessage: '',

    // create & edit 
    urlImage: '' , // save url image & view for user
    
    image: {url: '', warning: ''}, // save view image for reading item
    title: {name: '', warning: ''},
    
    addItems: false    ,
    callback: false,

    // status & delete
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
        },

        // panel admin
        onLoadingCircle: (state) => {
            state.warningMessage = ''
            state.urlImage = ''
            state.image = {url: '', warning: ''}
            state.title = {name: '', warning: ''}
        },
        onSetItemsCircle: (state) => {
            state.addItems = false
        },
        onSetURLCircle: (state, action) => {
            state.urlImage = action.payload.result
        },
        onTitleCircle: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onWarningCircle: (state, action) => {
            state.image = {url: state.image.url, warning: action.payload.image}
            state.title = {name: state.title.name , warning: action.payload.title }
        },
        onCallBackCircle: (state) => {
            state.callback = true
        }
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

        // create item circle sliders
        builder.addCase(createCircleSlidersSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createCircleSlidersSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createCircleSlidersSessionThunk.fulfilled, (state, action) => {
            state.callback = false
            state.addItems = action.payload == true ? true : false
            state.warningMessage = ''
        })
        
        // change status item circle sliders
        builder.addCase(changeStatusCircleSlidersSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.loading = true
        })
        builder.addCase(changeStatusCircleSlidersSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.loading = false
        })
        builder.addCase(changeStatusCircleSlidersSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
            state.warningMessage = ''
        })

        // delete item circle sliders
        builder.addCase(deleteItemsCircleSlidersSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.loading = true
        })
        builder.addCase(deleteItemsCircleSlidersSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.loading = false
        })
        builder.addCase(deleteItemsCircleSlidersSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
            state.warningMessage = ''
        })

        // reading all items circle sliders
        builder.addCase(readingAllItemsCircleSliderSessionThunk.pending, (state, ) => {
            state.warningMessage = ''
        })
        builder.addCase(readingAllItemsCircleSliderSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingAllItemsCircleSliderSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload
        })
    }
})

export default circleSlicer;
export const {handlerConter, circleDown, circleMove, circleUp,
    onCallBackCircle, onLoadingCircle, onSetItemsCircle,   onSetURLCircle, onTitleCircle, onWarningCircle
} = circleSlicer.actions