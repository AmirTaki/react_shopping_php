import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategoryMenuHeader } from "./sliceCategory";
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