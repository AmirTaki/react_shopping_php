import { createSlice } from "@reduxjs/toolkit";


interface IPanelAdminNavar {
    sideList: Array<{id: number, name: string, link: string}>,
    openSlide: boolean,
    numberSide: number
}

const initialState: IPanelAdminNavar = {
    sideList: [
        {id: 0, name: 'descript panel admin', link : "description"},
        {id: 1, name: 'users', link : 'users' },
    ],
    openSlide: false,
    numberSide: 0
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
               if (item.id == action.payload.id) state.numberSide = action.payload.id  
            })
        } 
    },
    extraReducers: (builder) => {}
})

export default panelAdminSlice
export const {onOpenSlidePanelAdmin, onChangeSliderPanelAdmin} = panelAdminSlice.actions