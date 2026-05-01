import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL } from "../../../../../baseURL"
import { onCallBackWebkit, onWarningWebkit, type TWebkit, type TWebkitObject } from "./webkitSlice"

export const viewWebkitScrollSessionThunk =  createAsyncThunk<TWebkit, void, {rejectValue: string}>(
    'view_webki_scroll_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL +  `tables/session/webkitScroll/webkit.php`, {
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


export const createWebkitScrollSessionThunk = createAsyncThunk<TWebkit, FormData , {rejectValue: string}>(
    'create_item_webkit_scroll_session_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/webkitScroll/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningWebkit({
                        title: 'title is requierd!',
                        image: 'image is requierd!',
                        body: 'body is requierd!',
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackWebkit())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningWebkit({
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



export const deleteWebkitScrollSessionThunk = createAsyncThunk<TWebkit, {id: number}, {rejectValue: string}>(
    'delete_item_webkit_scroll_session_toolkit', 
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/webkitScroll/delete.php/${payload.id}/delete`, {
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

export const changeStatusWebkitScrollSessionThunk = createAsyncThunk<TWebkit, {id: number},{rejectValue: string}>(
    'status_item_webkit_scroll_session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/webkitScroll/status.php/${payload.id}/changeStatus`, {
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


export const readingItemWebkitScrollSessionThunk = createAsyncThunk<TWebkitObject, {id: number},{rejectValue: string}> (
    'reading_item_webkit_scroll_Session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/webkitScroll/webkit.php/${payload.id}`, {
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


export const editItemWebkitScrollSessionThunk = createAsyncThunk<TWebkit,  {formData: FormData, id: number}, {rejectValue: string}>(
    'edit_item_webkit_scroll_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/webkitScroll/edit.php/${payload.id}`, {
                method: 'POST', 
                credentials: 'include',
                body: payload.formData
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningWebkit({
                        title: 'title is requierd!',
                        image: '',
                        body: 'body is requierd!',

                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackWebkit())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningWebkit({
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
