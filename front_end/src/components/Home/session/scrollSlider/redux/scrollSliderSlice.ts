import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../baseURL";
import type { TScrollSliderObject, TScrollSlider } from "./actionsScrollSlider";

export const viewScrollSliderSessionThunk = createAsyncThunk<TScrollSlider, void, {rejectValue: string}>(
    'image_scrollSldier_session_toolkit',
        async(_, {rejectWithValue}) => {
            try{
                const response = await fetch (baseURL + `tables/session/scrollSlider/slider.php`, {
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
