import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL } from "../../../../../baseURL"
import { onCallBackAdvert, onWarningAdvert, type TImageAdvert } from "./advertSlice"

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
