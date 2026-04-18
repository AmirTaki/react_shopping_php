import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../baseURL";
import type { TUSER } from "./userSlice";


export const viewUsersThunk =  createAsyncThunk<TUSER, void, {rejectValue: string}>(
    'users_thunk_api_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const repsonse =  await fetch (baseURL + 'tables/users/user.php', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await repsonse.json();
            return Array.isArray(data) ? data : []
        }
        catch(error: any){
            return rejectWithValue (`warning : ${error.message}`)
        }
    } 
    
) 