import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TItemFooter, TItemFooterObject } from "./itemFooterSlice";
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