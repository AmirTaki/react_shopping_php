import { createSlice } from "@reduxjs/toolkit";
import { changeStatusItemImageSliderLoopSessionThunk, createItemsImageSliderLoopSessionThunk, viewImageSliderLoopSessionThunk, readingAllItemsImageSliderLoopSessionThunk } from "./actionsImageSlider";
export type TImageSliderLoop = Array<{id: number, image: string, title: string, status: number, created_at: string, updated_at: string}> | boolean | string
export type TImageSliderLoopObject = {id: number, image: string, title: string, status: number, created_at: string, updated_at: string}

interface IScrollSlider {
    items: TImageSliderLoop,
    extra: TImageSliderLoop,
    counter: number,
    smooth: boolean,
    activeIndicatore: number,

    // panelAdmin
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

const initialState: IScrollSlider = {
    items: [],
    extra: [],
    counter: 0,
    smooth: false,
    activeIndicatore: 0,

    // panelAdmin
    warningMessage: '',
    
    // create & edit
    urlImage: '', // save image url
    image: {name: '', warning: ''},
    title: {name: '', warning: ''},

    callback: false, 
    addItems: false,

    // status & delete
    loading: false

}
 
const imageSliderLoopSlice =  createSlice({
    name: 'scroll_slider_loop_toolkit',
    initialState: initialState,
    reducers: {
        extract: (state, ) => {
            if(Array.isArray(state.items))
            state.extra = [...state.items.slice(-2), ...state.items, ...state.items.slice(0, 2)]
        },
        handlerScrollTo: (state, action) => {
            const {number} = action.payload
            const {smooth} = action.payload
           
            state.counter = number
            state.smooth = smooth
        },
        handlerScrollEnd: (state) => {
            if(Array.isArray(state.items) && Array.isArray(state.extra)){

                if(state.counter > state.extra.length - 2 ){
                    state.counter = state.counter - state.items.length
                    state.smooth = false
                }
                else if (state.counter < 2){
                    state.counter = state.counter + state.items.length 
                    state.smooth = false
                }
            }
        },
 
        handlerActiveIndicatore: (state) => {
            if(Array.isArray(state.items)){
                state.activeIndicatore = (state.counter - 2) % state.items.length
                if(state.activeIndicatore < 0) state.activeIndicatore += state.items.length
            }
        },

        
        // panel admin
        onTitleSwiperLoop: (state, action) => {
            state.title = {name: action.payload.title, warning : ''}
        },
        onSetURLSwiperLoop: (state, action) => {
            state.urlImage = action.payload.result
        },
        onLoadingSwiperLoop: (state) => {
            state.urlImage = ''
            state.image = {name: '', warning: ''},
            state.title = {name: '', warning: ''}
        },
        onWarningSwiperLoop: (state, action) => {
            state.image = {name: state.image.name,  warning: action.payload.image}
            state.title ={ name: state.title.name,  warning: action.payload.title}
        },
        onCallBackSwiperLoop: (state) => {
            state.callback = true
        },
        onSetItemsSwiperLoop: (state) => {
            state.addItems = false
        }
    },
    extraReducers: (builder) => {
        //  view image slider loop
        builder.addCase(viewImageSliderLoopSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewImageSliderLoopSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewImageSliderLoopSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })
        
        // create itme image slider loop
        builder.addCase(createItemsImageSliderLoopSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createItemsImageSliderLoopSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createItemsImageSliderLoopSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
        })
        
        // change status item image slider
        builder.addCase(changeStatusItemImageSliderLoopSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.loading = true
        })
        builder.addCase(changeStatusItemImageSliderLoopSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.loading = false
        })
        builder.addCase(changeStatusItemImageSliderLoopSessionThunk.fulfilled, (state, action) => {
           state.loading = false
           state.warningMessage = ''
           state.items = action.payload
        })


        // reading all items image slider looop 
        builder.addCase(readingAllItemsImageSliderLoopSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(readingAllItemsImageSliderLoopSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingAllItemsImageSliderLoopSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })
    }
})

export default imageSliderLoopSlice
export const {extract, handlerScrollTo, handlerActiveIndicatore, handlerScrollEnd,
    onCallBackSwiperLoop, onLoadingSwiperLoop,  onSetItemsSwiperLoop, onSetURLSwiperLoop, onTitleSwiperLoop, onWarningSwiperLoop
} = imageSliderLoopSlice.actions