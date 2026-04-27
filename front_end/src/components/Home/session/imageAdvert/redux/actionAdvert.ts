import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL } from "../../../../../baseURL"
import { onCallBackAdvert, onWarningAdvert, type TImageAdvert, type TImageAdvertObject } from "./advertSlice"

export const viewImageAdvertSessionThunk =  createAsyncThunk<TImageAdvert, void, {rejectValue: string}>(
    'image_advert_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL +  `tables/session/imageAdvert/advert.php`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                throw new Error('warning')
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }   
)

export const createImageAdvertSessionThunk = createAsyncThunk<TImageAdvert, FormData , {rejectValue: string}>(
    'create_item_image_advert_session_thunk',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/imageAdvert/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningAdvert({
                        title: 'title is requierd!',
                        image: 'image is requierd!',
                        body: 'body is requierd!',
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackAdvert())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningAdvert({
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


export const deleteImageAdvertSessionThunk = createAsyncThunk<TImageAdvert, {id: number}, {rejectValue: string}>(
    'delete_item_image_advert_session_toolkit', 
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/imageAdvert/delete.php/${payload.id}/delete`, {
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

export const changeStatusImageAdvertSessionThunk = createAsyncThunk<TImageAdvert, {id: number},{rejectValue: string}>(
    'status_item_image_advert_session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/imageAdvert/status.php/${payload.id}/changeStatus`, {
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

export const readingItemImageAdvertSessionThunk = createAsyncThunk<TImageAdvertObject, {id: number},{rejectValue: string}> (
    'reading_item_image_advert_Session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/imageAdvert/advert.php/${payload.id}`, {
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

export const editItemImageAdvertSessionThunk = createAsyncThunk<TImageAdvert,  {formData: FormData, id: number}, {rejectValue: string}>(
    'edit_image_advert_session_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/imageAdvert/edit.php/${payload.id}`, {
                method: 'POST', 
                credentials: 'include',
                body: payload.formData
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningAdvert({
                        title: 'title is requierd!',
                        image: '',
                        body: 'body is requierd!',

                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackAdvert())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningAdvert({
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



export const readingAllItemsImageAdvertSessionThunk =  createAsyncThunk<TImageAdvert, void, {rejectValue: string}>(
    'reading_all_items_image_advert_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL +  `tables/session/imageAdvert/reading.php`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                throw new Error('warning')
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }   
)
