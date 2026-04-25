import { createSlice } from "@reduxjs/toolkit";
import { viewScrollSliderSessionThunk } from "./scrollSliderSlice";

export type TScrollSlider = Array<{id: number, image: string, title: string, body: string, price: number,  status: number, created_at: string, updated_at: string}> | string | boolean
export type TScrollSliderObject = {id: number, image: string, title: string, body: string, price: number,  status: number, created_at: string, updated_at: string}

interface IPayloarSlider {
    boxses: TScrollSlider | [],
    warningMessage: string,

    // create & edit
    urlImage: string , // save image url

    // delete & status 
    loading: boolean
}
const initialState: IPayloarSlider = {
    boxses: [],
    warningMessage: '',

    // create & edit
    urlImage: '' , // save image url

    // delete & status 
    loading: false
}

const scrollSliderSlice = createSlice({
    name: 'scroll_slider_swiper_toolkit',
    initialState: initialState,
    reducers: {},
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
    }
})

export default scrollSliderSlice
export const {} = scrollSliderSlice.actions