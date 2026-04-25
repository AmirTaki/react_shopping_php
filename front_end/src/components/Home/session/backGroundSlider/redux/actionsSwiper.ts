import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TImageSlider } from "./swiperSlice";
import { baseURL } from "../../../../../baseURL";

export const viewImageSliderSessionThunk = createAsyncThunk<TImageSlider, void, {rejectValue: string}>(
    'image_slider_session_toolkit',
        async(_, {rejectWithValue}) => {
            try{
                const response = await fetch (baseURL + `tables/session/backGroundSlider/slider.php`, {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!response.ok){
                    throw new Error('warning: ');
                }
                const data = await response.json();
                return Array.isArray(data) ? data : []
            }
            catch(err: any){
                return rejectWithValue (`warning: ${err.message}`)
            }
        }
)
