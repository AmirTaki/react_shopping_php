import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL } from "../../../../../baseURL"
import { onCallBackResource, onWarningResource, type TResouceImage, type TResouceImageObject } from "./resourceSlice"

export const viewResourceImageSessionThunk =  createAsyncThunk<TResouceImage, void, {rejectValue: string}>(
    'resource_image_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL +  `tables/session/resourceImage/resource.php`, {
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


export const createResourceImageSessionThunk = createAsyncThunk<TResouceImage, FormData , {rejectValue: string}>(
    'image_scroll_slider_session_add_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/resourceImage/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningResource({
                        title: 'title is requierd!',
                        image: 'image is requierd!',
                        body: 'body is requierd!',
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackResource())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningResource({
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
export const readingAllResourceImageSessionThnk =  createAsyncThunk<TResouceImage, void, {rejectValue: string}>(
    'reading_all_item_resource_image_session_thunk',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL +  `tables/session/resourceImage/reading.php`, {
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

