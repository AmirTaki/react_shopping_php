import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackSwiper, onWarningSwiper, type TImageSlider } from "./swiperSlice";
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


export const createImageSliderSessionThunk = createAsyncThunk<TImageSlider, FormData , {rejectValue: string}>(
    'image_slider_add_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/backGroundSlider/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningSwiper({
                        title: 'title is requierd!',
                        image: 'image is requierd!'
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackSwiper())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningSwiper({
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

export const deleteImageSliderSessionThunk = createAsyncThunk<TImageSlider, {id: number}, {rejectValue: string}>(
    'delete_item_imageSlider_session_toolkit', 
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/backGroundSlider/delete.php/${payload.id}/delete`, {
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



export const changeStatusImageSliderSessionThunk = createAsyncThunk<TImageSlider, {id: number},{rejectValue: string}>(
    'status_item_imageSliderSession_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/backGroundSlider/status.php/${payload.id}/changeStatus`, {
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
