import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackCircle, onWarningCircle, type TCircleSwiper } from "./circleSlice";
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



export const createCircleSlidersSessionThunk = createAsyncThunk<TCircleSwiper, FormData , {rejectValue: string}>(
    'create_item_circle_session_tookit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/circleSlider/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body: payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningCircle({
                        title: 'title is requierd!',
                        image: 'image is requierd!'
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackCircle())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningCircle({
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



export const changeStatusCircleSlidersSessionThunk = createAsyncThunk<TCircleSwiper, {id: number}, {rejectValue: string}>(
    'change_status_item_circle_sliders_session_thunk',
    async(payload, {rejectWithValue}) =>{
        try{
            const response = await fetch (baseURL + `tables/session/circleSlider/status.php/${payload.id}/changeStatus`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw new Error('warning: ')
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return  rejectWithValue(`warning: ${err.message}`)
        }
    }
)



export  const readingAllItemsCircleSliderSessionThunk =  createAsyncThunk<TCircleSwiper, void, {rejectValue: string}>(
    'reading_all_items_circle_slider_session_thunk', 
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + 'tables/session/circleSlider/reading.php', {
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


