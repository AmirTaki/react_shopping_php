import { createAsyncThunk } from "@reduxjs/toolkit";
import { onCallBackCube, onWarningCube, type TCube, type TCubeObject } from "./cubeSlice";
import { baseURL } from "../../../../../baseURL";

export const viewCubeSessionThunk = createAsyncThunk<TCube, void, {rejectValue: string}>(
    'view_cube_session_toolkit',
    async(_, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/cube/slide.php`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            if (!response.ok) {
                throw new Error (`warning: `)
            }
            const data = await response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any) {
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)


export const createItemCubeSessionThunk = createAsyncThunk<TCube, FormData, {rejectValue: string}>(
    'create_item_cube_session_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/cube/add.php`, {
                method: 'POST',
                credentials: 'include',
                body: payload
            })
            if(!response.ok){
                if(response.status === 422){
                    reject.dispatch(onWarningCube({
                        image: 'image is requierd!',
                        deg: 'deg is requierd!'
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackCube())
                }
           
                else if (response.status === 404){
                        reject.dispatch(onWarningCube({
                        image: 'not upload image ?? repeat again !!',
                    }))
                }
                else {
                    throw new Error ('warning....')
                }
            }
            const data = await response.json()
            return data
        }
        catch(err: any){
            return (`warning ${err.message}`)
        }
    }
)

export const changeStatusItemCubeSessionThunk = createAsyncThunk<TCube, {id: number}, {rejectValue: string}>(
    'change_status_item_cube_toolkit',
    async(payload, {rejectWithValue}) => {
        try{

            const response = await fetch (baseURL + `tables/session/cube/status.php/${payload.id}/changeStatus`, {
                method: 'GET',
                credentials: 'include',
            })
            if(!response.ok){
                throw new Error ('warning: ... ')
            }
            const data = response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning ${err.message}`)
        }
    
    }
)
export const deleteItemCubeSessionThunk = createAsyncThunk<TCube, {id: number}, {rejectValue: string}>(
    'delete_item_cube_toolkit',
    async(payload, {rejectWithValue}) => {
        try{

            const response = await fetch (baseURL + `tables/session/cube/delete.php/${payload.id}/changeStatus`, {
                method: 'DELETE',
            })
            if(!response.ok){
                throw new Error ('warning: ... ')
            }
            const data = response.json()
            return Array.isArray(data) ? data : []
        }
        catch(err: any){
            return rejectWithValue (`warning ${err.message}`)
        }
    
    }
)

export const readingItemCubeSessionThunk = createAsyncThunk<TCubeObject, {id: number}, {rejectValue: string}>(
    'reading_item_cube_session_toolkit',
    async(payload, {rejectWithValue}) => {
        try{
            const response = await fetch (baseURL + `tables/session/cube/slide.php/${payload.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            if (!response.ok) {
                throw new Error (`warning: `)
            }
            const data = await response.json()
            return data
        }
        catch(err: any) {
            return rejectWithValue (`warning: ${err.message}`)
        }
    }
)


export const editItemCubeSessionThunk = createAsyncThunk<TCube, {formData: FormData, id: number}, {rejectValue: string}>(
    'edit_item_cube_session_toolkit',
    async(payload, reject) => {
        try{
            const response = await fetch (baseURL + `tables/session/cube/edit.php/${payload.id}`, {
                method: 'POST',
                credentials: 'include',
                body: payload.formData
            })
            if(!response.ok){
                if(response.status === 422){
                    reject.dispatch(onWarningCube({
                        image: 'image is requierd!',
                        deg: 'deg is requierd!'
                    }))
                }
                else if (response.status === 405){
                    reject.dispatch(onCallBackCube())
                }
           
                else if (response.status === 404){
                        reject.dispatch(onWarningCube({
                        image: 'not upload image ?? repeat again !!',
                    }))
                }
                else {
                    throw new Error ('warning....')
                }
            }
            const data = await response.json()
            return data
        }
        catch(err: any){
            return (`warning ${err.message}`)
        }
    }
)