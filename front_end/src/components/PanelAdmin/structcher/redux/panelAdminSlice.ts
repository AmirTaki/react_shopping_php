import { createSlice } from "@reduxjs/toolkit";

export type TUser = {loggedIn: boolean, user: string, level: string}

interface IPanelAdminNavar {

    // user login
    user: TUser, 
    warningMessage: string,

    // side navbar panelAdmin
    sideList: Array<{id: number, name: string, link: string, allowed: any}> ,
    openSlide: boolean,
    numberSide: number,
    allow: boolean
}

const savedUsers = localStorage.getItem('react_shopping_session_toolkit')
const initialState: IPanelAdminNavar = {

    // user login
    user:  savedUsers ? JSON.parse(savedUsers) : {loggedIn: false, user: '', level: 'D'} ,
    warningMessage: '',

    // side navbar panelAdmin
    sideList: [
        {id: 0, name: 'descript panel admin', link : "description", allowed: {A: false, B: true, C: true, D: true}},
        {id: 1, name: 'users', link : 'users',  allowed:  'A'},
        {id: 1, name: 'users', link : 'users',  allowed:  'B'},
    ],
    openSlide: false,
    numberSide: 0,
    allow: false
}

const panelAdminSlice =  createSlice({
    name: 'panelAdmin_navbar_slice_toolkit', 
    initialState: initialState, 
    reducers: {
        onOpenSlidePanelAdmin: (state, action) => {
            state.openSlide = action.payload.bool
        },
        onChangeSliderPanelAdmin: (state, action) => {
            const level =  state.user.level 
            state.sideList.map((item) => {
                if (item.id == action.payload.id) {

                    state.numberSide = action.payload.id
                    state.allow =  item.allowed[level]
                }
            })
        }, 
        onSetUserPanelAdmin: (state, action) => {
            state.user = action.payload
            localStorage.setItem('react_shopping_session_toolkit', JSON.stringify(action.payload) )
        },
        
    },
    extraReducers: (builder) => {}
})

export default panelAdminSlice
export const {onOpenSlidePanelAdmin, onChangeSliderPanelAdmin, onSetUserPanelAdmin} = panelAdminSlice.actions