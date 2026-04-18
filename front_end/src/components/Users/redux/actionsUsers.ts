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

export const changeStatusUsersThunk = createAsyncThunk<TUSER, {id: number}, {rejectValue: string}>(
    'change_status_users_toolkit',
    async (payload, {rejectWithValue}) => {
        try{    
            const response = await fetch (baseURL + `tables/users/status.php/${payload.id}/changeStatus`, {
                method: 'GET', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({id: payload.id})
            })
            if(!response.ok){
                throw new Error;
            }
            const data = await response.json();
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: , ${err.message}`);
        }
    }
)


export const deleteUsersThunk = createAsyncThunk<TUSER, {id: number}, {rejectValue: string}>(
    'delete_users_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/users/delete.php/${payload.id}/delete `, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw new Error;
            }
            const data = await response.json();
            return Array.isArray(data) ? data : []
        }
        catch(error: any){
            return rejectWithValue (`warning ${error.message}`);
        }
    }
)