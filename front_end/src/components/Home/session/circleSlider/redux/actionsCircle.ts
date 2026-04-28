import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCircleSwiper } from "./circleSlice";
import { baseURL } from "../../../../../baseURL";

export  const viewCircleSliderSessionThunk =  createAsyncThunk<TCircleSwiper, void, {rejectValue: string}>(
    'view_circle_slider_session_thunk', 
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + 'tables/session/circleSlider/slider.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw new Error('warning: ');
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning ${err.message}` )
        }
    }
)


