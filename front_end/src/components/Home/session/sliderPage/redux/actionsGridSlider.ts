import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../baseURL";

import { onCallBackGrid, onWarningGrid, type TSliderPage, type TSliderPageObject } from "./gridSliderSlice";

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

export const createSliderPageSessionThunk = createAsyncThunk<TSliderPage, FormData , {rejectValue: string}>(
    'image_slider_page_grid_session_add_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/sliderPage/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningGrid({
                        image: 'image is requierd!',
                        body: 'body is requierd!',
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackGrid())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningGrid({
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

export const deleteSliderPageSessionThunk = createAsyncThunk<TSliderPage, {id: number}, {rejectValue: string}>(
    'delete_item_slider_page_grid_session_toolkit', 
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/sliderPage/delete.php/${payload.id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }  ,
            })
            if(!response.ok){
                throw new Error('message warning')
            }
            const data = await response.json();
            return Array.isArray(data) ? data : []
        }   
        catch(error: any){
            return rejectWithValue (`warning: ${error.message}`)
        }
    }
)


export const changeStatusSliderPageSessionThunk = createAsyncThunk<TSliderPage, {id: number},{rejectValue: string}>(
    'status_item_slider_page-grid_session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/sliderPage/status.php/${payload.id}/changeStatus`, {
                method: 'GET', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },  

            })
            if(!response.ok){
                throw new Error('warning: ');
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(error: any){
            return rejectWithValue (`warning: ${error.message}`)
        }
    }
)

export const readingAllItemsSliderPageSessionThunk = createAsyncThunk<TSliderPage, void, {rejectValue: string}>(
    'reading_all_item_grid_swiper_session_toolkit',
        async(_, {rejectWithValue}) => {
            try{
                const response = await fetch (baseURL + `tables/session/sliderPage/reading.php`, {
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
