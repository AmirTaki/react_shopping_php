import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../baseURL";
import { onWarningRegister } from "./registerSlice";
import type { TUSER, TUSERObject } from "../../../Users/redux/userSlice";

export const registerThunk =  createAsyncThunk<boolean, {username: string, email: string, password: string, repPassword: string}, {rejectValue: string}>(
    'register_thunk_toolkit',
    async(payload, rejectValue) => {
        try{    
            const response = await fetch (baseURL + 'auth/register.php', {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({username: payload.username, email: payload.email, password: payload.password, repPassowrd: payload.repPassword})
            })
            if(!response.ok){
                if(response.status == 422){
                    rejectValue.dispatch(onWarningRegister({
                        username: 'username is required !',
                        email : 'email is required !',
                        password: 'password is required !',
                        repPassowrd : 'confirm password is required ! '
                    }))
                }
                else if (response.status === 500){
                    rejectValue.dispatch(onWarningRegister({
                        email : 'The email is duplicate.',
                    }))
                }
                else if (response.status === 403){
                    rejectValue.dispatch(onWarningRegister({
                        password: 'confirm not password !',
                        repPassowrd : 'confirm not password ! '
                    }))
                }
                else {
                    throw new Error ('warning: response'); 
                }
            }
            const data = await response.json()
            return data
        }   
        catch(err: any){
            return  (`warning: ${err.message}` )
        }
    }
)

// reading item user thunk for edit projects
export const ReadingUserThunk = createAsyncThunk<TUSERObject, {id: number}, {rejectValue: string}>(
    `reading_users_toolkit`,
    async(payload, { rejectWithValue})  => {
        try{
            const response = await fetch (baseURL + `tables/users/user.php/${payload.id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw new Error;
            }
            const data = await response.json();
            return data
        }
        
        catch(error: any){
            return rejectWithValue(`warning: ${error.message}`)
        }
    }
)


// edit item user thunk for projects
export const editUserThunk = createAsyncThunk<TUSER, {username: string, email: string, level: string,password: string, repPassowrd: string, id: number}, {rejectValue: string}>(
    'edit_users_tookit_thunk',
    async(payload, rejectWidthValue) => {
        try{
            const response =  await fetch(baseURL + `tables/users/edit.php/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: payload.username, email: payload.email, level: payload.level,  password: payload.password, repPassword: payload.repPassowrd})
            });

            if(!response.ok){
                if(response.status === 400){
                    rejectWidthValue.dispatch(onWarningRegister({
                        username: 'username is requierd!',
                        email: 'email is requierd!',
                    }))
                }
                else if (response.status === 409){
                        rejectWidthValue.dispatch(onWarningRegister({
                        email: 'The email is duplicate. repeat email',
                    }))
                }

                else if (response.status === 415){
                        rejectWidthValue.dispatch(onWarningRegister({
                        password: 'password not confirm !',
                        repPassowrd: 'rep password not confirm !'
                    }))
                }
            
                else {
                    throw new Error('warning')
                }
                
            }

            const data = await response.json()
            return data
        }
        catch(err: any){
            return `warning: ${err.message}`;
        }
    }
)