import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../../../baseURL";
import { onCallBackImage, onWarningImage, type TImageMenuHeader, type TImageMenuHeaderObject } from "./sliceImageMenus";

export const viewImageMenuHeadresThunk = createAsyncThunk<TImageMenuHeader, void, {rejectValue: string}>(
    'view_image_menu_headers_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuImage/image.php`, {
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


export const createImageMenuHeadersThunk = createAsyncThunk<TImageMenuHeader, FormData , {rejectValue: string}>(
    'image_menu_add_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuImage/add.php`, {
                method: 'POST', 
                credentials: 'include',
                body:payload
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningImage({
                        title: 'title is requierd!',
                        list: 'list is requierd!',
                        image: 'image is requierd!',
                        body: 'caption is requierd! '
                        
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackImage())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningImage({
                        title: '',
                        list: '',
                        image: 'not upload image ?? repeat again !!',
                        body: ''
                        
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

export const deleteImageMenuHeadersThunk = createAsyncThunk<TImageMenuHeader, {id: number}, {rejectValue: string}>(
    'delete_item_imageMenu_toolkit', 
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuImage/delete.php/${payload.id}/delete`, {
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


export const changeStatusImageMenuThunk = createAsyncThunk<TImageMenuHeader, {id: number},{rejectValue: string}>(
    'change_status_item_imageMenu_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuImage/status.php/${payload.id}/changeStatus`, {
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


export const readingItemImageMenuThunk = createAsyncThunk<TImageMenuHeaderObject, {id: number},{rejectValue: string}> (
    'reading_item_menuImage_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuImage/image.php/${payload.id}`, {
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

export const editImageMenuHeadersThunk = createAsyncThunk<TImageMenuHeader,  {formData: FormData, id: number}, {rejectValue: string}>(
    'update_item_image_menu_header_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuImage/edit.php/${payload.id}`, {
                method: 'POST', 
                credentials: 'include',
                body: payload.formData
            })
            
            if (!response.ok){
               if(response.status === 422){
                    reject.dispatch(onWarningImage({
                        title: 'title is requierd!',
                        list: 'list is requierd!',
                        image: '',
                        body: 'caption is requierd! '
                        
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackImage())
                }

                else if (response.status === 404){
                      reject.dispatch(onWarningImage({
                        title: '',
                        list: '',
                        image: 'not upload image ?? repeat again !!',
                        body: ''
                        
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