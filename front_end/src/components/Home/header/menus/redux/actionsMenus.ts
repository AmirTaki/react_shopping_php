import { createAsyncThunk } from "@reduxjs/toolkit";
import { onWarningTitleMenus, type TMenusHeader } from "./menusSlice";
import { baseURL } from "../../../../../baseURL";

export const viewMenusHeaders  = createAsyncThunk<TMenusHeader, void, {rejectValue: string}>(
    'menus_headers_toolkit', 
    async(_, {rejectWithValue}) => {
        try{
            const response =  await fetch (baseURL + `tables/megaMenu/menus/menu.php`, {
                method: 'GET', 
                // credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'

                }
            })
            if(!response.ok){
                throw new Error ('warning: ')
            }
            const data = await response.json();
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)


export const createMenusHeaders = createAsyncThunk<TMenusHeader, {title: string}, {rejectValue: string}>(
    'create_menus_headers_toolkit',
    async(payload, rejectValue) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menus/add.php`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: payload.title})
            })
            if(!response.ok){
                if(response.status === 400){
                    rejectValue.dispatch(onWarningTitleMenus({title : 'title not is empty!!'}))
                }
                else if(response.status === 409){
                    rejectValue.dispatch(onWarningTitleMenus({title : 'title is repeat change name title'}))
                }
                else {
                    throw new Error ('message');
                }
            }
            const data = await response.json();
            return data
        }
        catch(err: any){
            return (`warning: ${err.message}`)
        }
    }
)


export const changeStatusMenuHeaders = createAsyncThunk<TMenusHeader, {id: number}, {rejectValue: string}>(
    "menus_status_toolkit",
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menus/status.php/${payload.id}`, {
                method: 'GET', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },  
            })

            if(!response.ok){
                throw new Error('message : warning:')
            }

            const data = await response.json();
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)
