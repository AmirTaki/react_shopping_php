import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackCard, onWarningCard, type TSwiperCard, type TSwiperCardObject } from "./cardSlice";
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

export const createCardSliderSessionThunk = createAsyncThunk<TSwiperCard, FormData , {rejectValue: string}>(
    'create_slider_session_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/cardSlider/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningCard({
                        title: 'title is requierd!',
                        image: 'image is requierd!'
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackCard())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningCard({
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

export const readingAllItemsCardSliderSessionThunk = createAsyncThunk<TSwiperCard, void, {rejectValue: string}>(
    'reading_all_items_status_card_slider_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/cardSlider/reading.php`, {
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
