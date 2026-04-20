import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProductMenuHeader, TProductMenusHeaderObject } from "./sliceMenuSeries";
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

