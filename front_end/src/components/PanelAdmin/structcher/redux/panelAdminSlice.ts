import { createSlice } from "@reduxjs/toolkit";
import { getSessionThunk, requestLogoutThunk } from "./actionsPanelAdmin";

export type TUser = {loggedIn: boolean, user: string, level: string}

interface IPanelAdminNavar {

    // user login
    user: TUser, 
    warningMessage: string,

    // side navbar panelAdmin
    sideList: Array<{id: number, name: string, link: string,}> ,
    openSlide: boolean,
    numberSide: number,
    callBack: boolean

}

const initialState: IPanelAdminNavar = {

    // user login
    user:  {loggedIn: false, user: '', level: 'D'},
    warningMessage: '',

    // side navbar panelAdmin
    sideList: [
        {id: 0, name: 'descript panel admin', link : "description",},
        {id: 1, name: 'users', link : 'users',  },
        {id: 2, name: 'headers', link : 'menusHeaders',  },
        {id: 3, name: 'megaMenu List', link: 'megaMenuList'},
    ],
    openSlide: false,
    numberSide: 0,
    callBack: false
}

const panelAdminSlice =  createSlice({
    name: 'panelAdmin_navbar_slice_toolkit', 
    initialState: initialState, 
    reducers: {
        onOpenSlidePanelAdmin: (state, action) => {
            state.openSlide = action.payload.bool
        },
        onChangeSliderPanelAdmin: (state, action) => {
            state.sideList.map((item) => {
                if (item.id == action.payload.id) {
                state.numberSide = action.payload.id
    
                }
            })
        }, 

        onCallBackSession: (state, ) => {
            state.callBack = true
            state.user = {loggedIn: false, user: '', level: 'D'}
        }
    },
    extraReducers: (builder) => {

        // get session thunk api
        builder.addCase(getSessionThunk.pending, (state) => {
            state.callBack = false
        })
        builder.addCase(getSessionThunk.rejected, (state) => {
            state.callBack = false
        })
        builder.addCase(getSessionThunk.fulfilled, (state, action) => {
            state.callBack = false
            state.user = action.payload
        })

        // request logout thunk api
        builder.addCase(requestLogoutThunk.pending, (state) => {
            state.callBack = false
        })
        builder.addCase(requestLogoutThunk.rejected, (state) => {
            state.callBack = false
        })
        builder.addCase(requestLogoutThunk.fulfilled, (state, action) => {
            state.callBack = false
            state.user = action.payload
        })
    }
})

export default panelAdminSlice
export const {onOpenSlidePanelAdmin, onChangeSliderPanelAdmin, onCallBackSession} = panelAdminSlice.actions