import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../../../../../baseURL";
import { onWarningMenuBoard, type TMenuFooter, type TMenuFooterObject } from "./menuFooterSlice";


export const viewMenuFooterThunk  = createAsyncThunk<TMenuFooter, void, {rejectValue: string}>(
    'view_menu_footer_toolkit', 
    async(_, {rejectWithValue}) => {
        try{
            const response =  await fetch (baseURL + `tables/footer/menuFooter/menu.php`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'

                }
            })
            if(!response.ok){
                throw new Error ('warning: ')
            }
            const data = await response.json();
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)

export const createMenuFooterThunk = createAsyncThunk<TMenuFooter, {title: string}, {rejectValue: string}>(
    'create_menu_footer_toolkit',
    async(payload, rejectValue) => {
        try{
            const response = await fetch (baseURL + `tables/footer/menuFooter/add.php`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: payload.title})
            })
            if(!response.ok){
                if(response.status === 400){
                    rejectValue.dispatch(onWarningMenuBoard({title : 'title not is empty!!'}))
                }
                else if(response.status === 409){
                    rejectValue.dispatch(onWarningMenuBoard({title : 'title is repeat change name title'}))
                }
                else {
                    throw new Error ('message');
                }
            }
            const data = await response.json();
            return data
        }
        catch(err: any){
            return (`warning: ${err.message}`)
        }
    }
)

