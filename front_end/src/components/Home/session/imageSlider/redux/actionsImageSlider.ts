import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackSwiperLoop, onWarningSwiperLoop, type TImageSliderLoop, type TImageSliderLoopObject } from "./imageSliderSlice";
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

export const createItemsImageSliderLoopSessionThunk = createAsyncThunk<TImageSliderLoop, FormData, {rejectValue: string}>(
    'create_item_image_slider_loop_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + 'tables/session/imageSliderLoop/add.php', {
                method: 'POST',
                credentials: 'include',
                body: payload
            })
            if(!response.ok){
                 if(response.status === 422){
                    reject.dispatch(onWarningSwiperLoop({
                        title: 'title is requierd!',    
                        image: 'image is requierd! '  
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackSwiperLoop())
                }

                else if (response.status === 404){
                        reject.dispatch(onWarningSwiperLoop({
                        image: 'not upload image ?? repeat again !!',                        
                    }))
                }
                
                else {
                    throw new Error ('warning ');
                }
            }
            const data = await response.json()
            return data
        }
        catch(err: any){
            return (`warning: ${err.message}`)
        }
    }

) 
export const changeStatusItemImageSliderLoopSessionThunk = createAsyncThunk<TImageSliderLoop, {id: number}, {rejectValue: string}>(
    'change_status_item_image_slider_loop_toolkit',
    async(payload, {rejectWithValue}) => {
        try{    
            const response = await fetch (baseURL + `tables/session/imageSliderLoop/status.php/${payload.id}/changeStatus`, {
                method: 'GET',
                credentials: 'include'
            })
            if(!response.ok){
                throw new Error (`warning: ...`)
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue(`warning: ${err.message}`)
        }
    }
) 

export const deleteItemImageSliderLoopSessionThunk = createAsyncThunk<TImageSliderLoop, {id: number}, {rejectValue: string}>(
    'delete_item_image_slider_loop_toolkit',
    async(payload, {rejectWithValue}) => {
        try{    
            const response = await fetch (baseURL + `tables/session/imageSliderLoop/delete.php/${payload.id}/changeStatus`, {
                method: 'DELETE',
                // credentials: 'include'
            })
            if(!response.ok){
                throw new Error (`warning: ...`)
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue(`warning: ${err.message}`)
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

