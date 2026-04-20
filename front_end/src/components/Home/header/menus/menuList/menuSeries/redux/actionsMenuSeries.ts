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
