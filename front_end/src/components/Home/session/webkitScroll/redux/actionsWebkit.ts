import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL } from "../../../../../baseURL"
import type { TWebkit, TWebkitObject } from "./webkitSlice"

export const viewWebkitScrollSessionThunk =  createAsyncThunk<TWebkit, void, {rejectValue: string}>(
    'view_webki_scroll_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL +  `tables/session/webkitScroll/webkit.php`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                throw new Error('warning')
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }   
)
