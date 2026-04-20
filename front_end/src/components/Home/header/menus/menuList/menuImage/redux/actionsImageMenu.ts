import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../../../baseURL";
import type { TImageMenuHeader } from "./sliceImageMenus";

export const viewImageMenuHeadresThunk = createAsyncThunk<TImageMenuHeader, void, {rejectValue: string}>(
    'view_image_menu_headers_toolkit',
        async(_, {rejectWithValue}) => {
            try{
                const response = await fetch (baseURL + `tables/megaMenu/menuImage/image.php`, {
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