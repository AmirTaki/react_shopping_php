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
