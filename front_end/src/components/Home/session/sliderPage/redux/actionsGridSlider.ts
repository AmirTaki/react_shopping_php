import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../baseURL";

import type { TSliderPage, TSliderPageObject } from "./gridSliderSlice";

export const viewSliderPageSessionThunk = createAsyncThunk<TSliderPage, void, {rejectValue: string}>(
    'image_slider_page_grid_session_toolkit',
        async(_, {rejectWithValue}) => {
            try{
                const response = await fetch (baseURL + `tables/session/sliderPage/slider.php`, {
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