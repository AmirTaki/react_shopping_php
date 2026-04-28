import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TSwiperCard, TSwiperCardObject } from "./cardSlice";
import { baseURL } from "../../../../../baseURL";

export const viewCardSliderSessionThunk = createAsyncThunk<TSwiperCard, void, {rejectValue: string}>(
    'view_card_slider_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/cardSlider/card.php`, {
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
