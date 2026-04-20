import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackSeries, onWarningSeries, type TProductMenuHeader, type TProductMenusHeaderObject } from "./sliceMenuSeries";
import { baseURL } from "../../../../../../../baseURL";

export const viewProductHeadresThunk = createAsyncThunk<TProductMenuHeader, void, {rejectValue: string}>(
    'product_(sereis)_headers_toolkit',
        async(_, {rejectWithValue}) => {
            try{
                const response = await fetch (baseURL + `tables/megaMenu/menuProduct/product.php`, {
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

export const createProductHeadersThunk = createAsyncThunk<TProductMenuHeader, {title: string, list: string, series: string, }, {rejectValue: string}>(
    'add_product_headers_toolkit',
    async(payload, rejectValue) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuProduct/add.php`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({title: payload.title, list: payload.list, series: payload.series})
            })
            if(!response.ok){
                if(response.status === 422){
                    rejectValue.dispatch(onWarningSeries({
                        title: 'title is requierd!',
                        list: 'list is requierd!',
                        series: 'series is requierd!'
                    }))
                }
                else if (response.status === 405){
                    rejectValue.dispatch(onCallBackSeries())
                }

                else if (response.status === 415){
                    rejectValue.dispatch(onWarningSeries({
                        title: '',
                        series: 'name series repeat ??? change name series !!!',
                        list: ''
                    }))
                }
                
                else {
                    throw new Error(`message`)
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


export const deleteItemsProductHeadersThunk = createAsyncThunk<TProductMenuHeader, {id: number}, {rejectValue: string}>(
    'delete_item_product_toolkit', 
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuProduct/delete.php/${payload.id}/delete`, {
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


export const changeStatusItemProductThunk = createAsyncThunk<TProductMenuHeader, {id: number},{rejectValue: string}>(
    'change_status_item_product_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuProduct/status.php/${payload.id}/changeStatus`, {
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


export const readingItemProdcutHeadersThunk = createAsyncThunk<TProductMenusHeaderObject, {id: number},{rejectValue: string}> (
    'reading_item_product_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuProduct/product.php/${payload.id}`, {
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

export const editItemsProdcutHeadersThunk = createAsyncThunk<TProductMenuHeader, {id: number, title: string, list: string, series: string, }, {rejectValue: string}>(
    'updatae_items_product_toolkit',
    async(payload, rejected) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuProduct/edit.php/${payload.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: payload.title, list: payload.list,series: payload.series, id: payload.id })
            })
            if(!response.ok){
                if(response.status === 400){
                    rejected.dispatch((onWarningSeries({
                        title: 'title is requierd!',
                        list: 'list is requierd!',
                        series: 'series is requierd!'
                    })))
                }
                else if (response.status === 405){
                    rejected.dispatch(onCallBackSeries())
                }

                else if (response.status === 415){
                    rejected.dispatch((onWarningSeries({
                        title: '',
                        series: 'name series repeat ??? change name series !!!',
                        list: ''
                    })))                
                }

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