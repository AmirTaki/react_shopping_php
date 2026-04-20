import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackCategory, onWarningCategory, type TCategoryMenuHeader } from "./sliceCategory";
import { baseURL } from "../../../../../../../baseURL";

export const viewCategoryHeadresThunk = createAsyncThunk<TCategoryMenuHeader, void, {rejectValue: string}>(
    'category_headers_toolkit',
        async(_, {rejectWithValue}) => {
            try{
                const response = await fetch (baseURL + `tables/megaMenu/menuCategory/category.php`, {
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

export const createCategoryHeadersThunk = createAsyncThunk<TCategoryMenuHeader, {title: string, list: string, category: string, sign: string}, {rejectValue: string}>(
    'add_list_headers_toolkit',
    async(payload, rejectValue) => {
        try{
            const response = await fetch (baseURL + `tables/megaMenu/menuCategory/add.php`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({title: payload.title, list: payload.list, category: payload.category, sign: payload.sign})
            })
            if(!response.ok){
                if(response.status === 422){
                    rejectValue.dispatch(onWarningCategory({
                        title: 'title is requierd!',
                        list: 'list is requierd!',
                        category: 'category is requierd!'
                    }))
                }
                else if (response.status === 405){
                    rejectValue.dispatch(onCallBackCategory())
                }

                else if (response.status === 415){
                    rejectValue.dispatch(onWarningCategory({
                        title: '',
                        category: 'name category repeat ??? change name category !!!',
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