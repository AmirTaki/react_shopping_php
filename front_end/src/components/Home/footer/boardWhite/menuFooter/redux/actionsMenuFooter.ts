import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../../baseURL";
import type { TMenuFooter, TMenuFooterObject } from "./menuFooterSlice";


export const viewMenuFooterThunk  = createAsyncThunk<TMenuFooter, void, {rejectValue: string}>(
    'view_menu_footer_toolkit', 
    async(_, {rejectWithValue}) => {
        try{
            const response =  await fetch (baseURL + `tables/footer/menuFooter/menu.php`, {
                method: 'GET', 
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