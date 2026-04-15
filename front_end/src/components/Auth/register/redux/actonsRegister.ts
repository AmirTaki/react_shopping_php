import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../baseURL";
import { onWarningRegister } from "./registerSlice";

export const registerThunk =  createAsyncThunk<string | boolean, {username: string, email: string, password: string, repPassword: string}, {rejectValue: string}>(
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