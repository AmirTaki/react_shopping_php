import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TMenusHeader } from "./menusSlice";
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
