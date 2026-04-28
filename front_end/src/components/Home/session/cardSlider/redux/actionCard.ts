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

export const deleteCardSliderSessionThunk = createAsyncThunk<TSwiperCard, {id: number}, {rejectValue: string}>(
    'delete_item_card_slider_session_toolkit', 
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/cardSlider/delete.php/${payload.id}/delete`, {
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

export const changeStatusCardSliderSessionThunk = createAsyncThunk<TSwiperCard, {id: number},{rejectValue: string}>(
    'change_status_item_card_slider_session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/cardSlider/status.php/${payload.id}/changeStatus`, {
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

export const readingItemCardSliderSessionThunk = createAsyncThunk<TSwiperCardObject, {id: number},{rejectValue: string}> (
    'reading_item_card_slider_Session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/cardSlider/card.php/${payload.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                } ,
                // credentials: 'include',
            })
            if(!response.ok){
                throw new Error('message');
            }

            const data =  await response.json()
            return data
   
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)


export const editItemCardSliderSessionThunk = createAsyncThunk<TSwiperCard,  {formData: FormData, id: number}, {rejectValue: string}>(
    'edit_item_card_slider_session_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/cardSlider/edit.php/${payload.id}`, {
                method: 'POST', 
                credentials: 'include',
                body: payload.formData
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningCard({
                        title: 'title is requierd!',      
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
