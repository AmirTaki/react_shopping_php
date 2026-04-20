import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TListMenusHeader } from "./sliceMenuList";
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