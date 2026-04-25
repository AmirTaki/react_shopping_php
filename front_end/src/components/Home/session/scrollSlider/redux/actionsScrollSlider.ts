import { createSlice } from "@reduxjs/toolkit";
import { viewScrollSliderSessionThunk, createScrollSliderSessionThunk, changeStatusScrollSliderSessionThunk, deleteScrollSliderSessionThunk } from "./scrollSliderSlice";

export type TScrollSlider = Array<{id: number, image: string, title: string, body: string, price: number,  status: number, created_at: string, updated_at: string}> | string | boolean
export type TScrollSliderObject = {id: number, image: string, title: string, body: string, price: number,  status: number, created_at: string, updated_at: string}

interface IPayloarSlider {
    boxses: TScrollSlider | [],
    warningMessage: string,

    // create & edit
    urlImage: string , // save image url

    image: {url: string, warning: string},
    body: {caption: string, warning: string},
    title: {name: string, warning: string},
    price: {money: number, warning: string},
    callback: boolean, 
    addItems: boolean,

    // delete & status 
    loading: boolean
}
const initialState: IPayloarSlider = {
    boxses: [],
    warningMessage: '',

    // create & edit
    urlImage: '' , // save image url
    image: {url: '', warning: ''},
    body: {caption: '', warning: ''},
    title: {name: '', warning: ''},
    price: {money: 0, warning: ''},   
    callback: false, 
    addItems: false ,

    // delete & status 
    loading: false
}

const scrollSliderSlice = createSlice({
    name: 'scroll_slider_swiper_toolkit',
    initialState: initialState,
    reducers: {

        onSetURLPayloar: (state, action) => {
            state.urlImage = action.payload.result
        },
        onTitlePayloar: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onBodyPayloar: (state, action) => {
            state.body = {caption: action.payload.body, warning: ''}
        },
        onPricePayloar: (state, action) => {
            state.price = {money: action.payload.price < 0 ? 0 : action.payload.price, warning: ''}
        }, 
        onWarningPayloar: (state, action) => {
            state.image = {url: state.image.url, warning: action.payload.image},
            state.body ={caption: state.body.caption, warning: action.payload.body},
            state.title = {name: state.title.name, warning: action.payload.title},
            state.price = {money: 0, warning: action.payload.price}
        },
        onCallBackPayloar: (state) => {
            state.callback = true
        },
        onLoadingPayloar: (state) => {
            state.urlImage = ''
            state.image = {url: '', warning: ''},
            state.body ={caption: '', warning: ''},
            state.title = {name: '', warning: ''},
            state.price = {money: 0, warning: ''}
        },
        onSetItemsPayloar: (state) => {
            state.addItems = false
        }
    },
    extraReducers: (builder) => {
        // view item scroll slider
        builder.addCase(viewScrollSliderSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewScrollSliderSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewScrollSliderSessionThunk.fulfilled, (state, action) => {
            state.boxses = action.payload
        })
        
        // create item scroll slider
        builder.addCase(createScrollSliderSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createScrollSliderSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createScrollSliderSessionThunk.fulfilled, (state, action) => {
            state.callback = false
            state.warningMessage = ''
            state.addItems = action.payload === true ? true : false
        })

        
        // delete item scroll slider
        builder.addCase(deleteScrollSliderSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.loading = true
        })
        builder.addCase(deleteScrollSliderSessionThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteScrollSliderSessionThunk.fulfilled, (state) => {
            state.loading = false
            state.warningMessage = ''
        })
        
        // change status item scroll slider
        builder.addCase(changeStatusScrollSliderSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.loading = true
        })
        builder.addCase(changeStatusScrollSliderSessionThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(changeStatusScrollSliderSessionThunk.fulfilled, (state) => {
            state.loading = false
            state.warningMessage = ''
        })
    }
})

export default scrollSliderSlice
export const { onBodyPayloar, onCallBackPayloar, onLoadingPayloar, onPricePayloar, onSetItemsPayloar, onSetURLPayloar, onTitlePayloar, onWarningPayloar} = scrollSliderSlice.actions