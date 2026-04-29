import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TImageSliderLoop, TImageSliderLoopObject } from "./imageSliderSlice";
import { baseURL } from "../../../../../baseURL";

export const viewImageSliderLoopSessionThunk =  createAsyncThunk<TImageSliderLoop, void, {rejectValue: string}>(
    `view_image_slider_loop_session_toolkit`,
    async (_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + 'tables/session/imageSliderLoop/slider.php', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                throw new Error ('warning : ')
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)
export const readingAllItemsImageSliderLoopSessionThunk =  createAsyncThunk<TImageSliderLoop, void, {rejectValue: string}>(
    `reading_all_items_image_slider_loop_session_toolkit`,
    async (_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + 'tables/session/imageSliderLoop/reading.php', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                throw new Error ('warning : ')
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)

