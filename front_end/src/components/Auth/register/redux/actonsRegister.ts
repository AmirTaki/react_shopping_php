import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../baseURL";

export const registerThunk =  createAsyncThunk<string | boolean, {username: string, email: string, password: string, repPassowrd: string}, {rejectValue: string}>(
    'register_thunk_toolkit',
    async(payload, {rejectWithValue}) => {
        try{    
            const response = await fetch (baseURL + 'auth/register.php', {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({username: payload.username, email: payload.email, password: payload.password, repPassword: payload.repPassowrd})
            })
            if(!response.ok){
                throw new Error ('warning: response'); 
            }
            const data = await response.json()
            return data
        }   
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}` )
        }
    }
)