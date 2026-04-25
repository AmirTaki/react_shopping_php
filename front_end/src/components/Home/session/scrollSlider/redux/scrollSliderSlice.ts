import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../baseURL";
import { type TScrollSliderObject, type TScrollSlider, onWarningPayloar, onCallBackPayloar } from "./actionsScrollSlider";

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


export const createScrollSliderSessionThunk = createAsyncThunk<TScrollSlider, FormData , {rejectValue: string}>(
    'image_scroll_slider_session_add_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/scrollSlider/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningPayloar({
                        title: 'title is requierd!',
                        image: 'image is requierd!',
                        body: 'body is requierd!',
                        price: 'price is reqierd!'
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackPayloar())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningPayloar({
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