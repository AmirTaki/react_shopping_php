import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../baseURL";
import { onWarningLogin } from "./loginSlice";
import { onCallBackSession } from "../../../PanelAdmin/structcher/redux/panelAdminSlice";

export const loginThunk =  createAsyncThunk<any, {email: string, password: string}, {rejectValue: string}>(
    'login_user_thunk_toolkit',
    async(payload, rejectValue) => {
        try{
            const response = await fetch (baseURL + 'auth/login.php', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify({email: payload.email, password: payload.password})
            })
            if(!response.ok){
                if(response.status == 400){
                    rejectValue.dispatch(onWarningLogin({
                        email : 'email is required !',
                        password: 'password is required !',
                    }))
                }
                else if(response.status == 401){
                    rejectValue.dispatch(onWarningLogin({
                        email : 'The email entered is incorrect!',
                        password: 'The password entered is incorrect! ',
                    }))
                }
                else if(response.status == 405){
                    rejectValue.dispatch(onWarningLogin({
                        email : 'Your account is blocked.',
                    }))
                }
                throw new Error('warning: ')
            }
            const data = await response.json()
            return data;
        }
        catch(err: any){
            return `warning: ${err.message}`
        }
    }
)