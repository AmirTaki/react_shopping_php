import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackItemBoard, onWarningItemBoard, type TItemFooter, type TItemFooterObject } from "./itemFooterSlice";
import { baseURL } from "../../../../../../baseURL";

export const viewItemFooterThunk = createAsyncThunk<TItemFooter, void, {rejectValue: string}>(
    'view_item_footer_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/footer/itemFooter/item.php`, {
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

export const createItemFooterThunk = createAsyncThunk<TItemFooter, {title: string, item: string}, {rejectValue: string}>(
    'create_item_footer_toolkit',
    async(payload, rejectValue) => {
        try{
            const response = await fetch (baseURL + `tables/footer/itemFooter/add.php`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({title: payload.title, item: payload.item})
            })
            if(!response.ok){
                if(response.status === 422){
                    rejectValue.dispatch(onWarningItemBoard({
                        title: 'title is requierd!',
                        item: 'item is requierd!'
                    }))
                }
                else if (response.status === 405){
                    rejectValue.dispatch(onCallBackItemBoard())
                }

                else if (response.status === 415){
                    rejectValue.dispatch(onWarningItemBoard({
                        title: '',
                        item: 'name item repeat ??? change name item !!!'
                    }))
                }
                
                else {
                    throw new Error(`message`)
                }
            }
            const data = await response.json()
            return data;

            
        }
        catch(err: any){
            return `warning: ${err.message}`
        }
    }
)

export const deleteItemFooterThunk = createAsyncThunk<TItemFooter, {id: number},{rejectValue: string}>(
    'delete_item_toolkit',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/footer/itemFooter/delete.php/${payload.id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }  ,
            })
            if(!response.ok){
                throw new Error('message Warning');
            }
            const data =  await response.json()
            return Array.isArray(data) ? data : [];
        }
        catch(error: any){
            return rejectWithValue (`warning: ${error.message}`)
        }
    }
)

export const changeStatusItemFooterThunk = createAsyncThunk<TItemFooter, {id: number},{rejectValue: string}>(
    'change_status_item_footer_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/footer/itemFooter/status.php/${payload.id}/changeStatus`, {
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

export const readingItemFooterThunk = createAsyncThunk<TItemFooterObject, {id: number},{rejectValue: string}> (
    'reading_item_footer_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/footer/itemFooter/item.php/${payload.id}`, {
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

export const editItemFooterThunk = createAsyncThunk<TItemFooter, {id: number, title: string, item: string}, {rejectValue: string}>(
    'edit_item_footer_toolkit',
    async(payload, rejected) => {
        try{
            const response = await fetch (baseURL + `tables/footer/itemFooter/edit.php/${payload.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: payload.title, item: payload.item})
            })
            if(!response.ok){
                if(response.status === 400){
                    rejected.dispatch((onWarningItemBoard({
                        title: 'title is requierd!',
                        item: 'item is requierd!'
                    })))
                }
                else if (response.status === 405){
                    rejected.dispatch(onCallBackItemBoard())
                }

                else if (response.status === 415){
                    rejected.dispatch((onWarningItemBoard({
                        title: '',
                        item: 'name item repeat ??? change name item !!!'
                    })))                }

                else {
                    throw new Error(`warning: ...`)
                }
            }
            const data = await response.json()
            return data
        }
        catch(err: any){
            return `warning: ${err.message}`
        }
    }
)
