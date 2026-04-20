import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackListMenus, onWarningListMenus, type TListMenusHeader } from "./sliceMenuList";
import { baseURL } from "../../../../../../baseURL";

export const viewListHeadersThunk = createAsyncThunk<TListMenusHeader, void, {rejectValue: string}>(
    'list_headers_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuList/list.php`, {
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

export const createListHeadersThunk = createAsyncThunk<TListMenusHeader, {title: string, list: string}, {rejectValue: string}>(
    'add_list_headers_toolkit',
    async(payload, rejectValue) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuList/add.php`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({title: payload.title, list: payload.list})
            })
            if(!response.ok){
                if(response.status === 422){
                    rejectValue.dispatch(onWarningListMenus({
                        title: 'title is requierd!',
                        list: 'list is requierd!'
                    }))
                }
                else if (response.status === 405){
                    rejectValue.dispatch(onCallBackListMenus())
                }

                else if (response.status === 415){
                    rejectValue.dispatch(onWarningListMenus({
                        title: '',
                        list: 'name list repeat ??? change name list !!!'
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

export const deleteItemListHeadersThunk = createAsyncThunk<TListMenusHeader, {id: number},{rejectValue: string}>(
    'delete_item_menuList_toolkit',
    async (payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuList/delete.php/${payload.id}/delete`, {
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


export const changeStatusItemListHeadersThunk = createAsyncThunk<TListMenusHeader, {id: number},{rejectValue: string}>(
    'status_item_menuList_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuList/status.php/${payload.id}/changeStatus`, {
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
