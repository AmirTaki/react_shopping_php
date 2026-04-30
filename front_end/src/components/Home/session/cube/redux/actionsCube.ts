import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCube, TCubeObject } from "./cubeSlice";
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