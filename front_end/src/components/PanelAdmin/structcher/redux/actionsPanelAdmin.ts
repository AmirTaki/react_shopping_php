import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../baseURL";
import { onCallBackSession } from "./panelAdminSlice";

export const getSessionThunk = createAsyncThunk< {loggedIn: boolean, user: string, level: string}, void, {rejectValue: string}>(
    'get_session_thunk_api',
    async(_, rejectValue) => {
        try{
            const response = await fetch (baseURL + 'functions/checkSession.php', {
                method: 'GET',
                credentials: 'include'
            })
            if(!response.ok){
                rejectValue.dispatch(onCallBackSession())
            }
            const data = await response.json();
            return data
            
        }  
        catch(err: any){
            rejectValue.dispatch(onCallBackSession())
        }
        
    }
)