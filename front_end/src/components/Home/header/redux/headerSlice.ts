import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IHeader {
    scrollHide: boolean,
    search: boolean | null ,
    sidebar: null | boolean, 
}

const initialState: IHeader = {
    scrollHide: true,
    search: null,
    sidebar: null

}


export const closeWidthDelay = createAsyncThunk(
    'ui/closeWithDelay',
    async(payload, {dispatch}) => {
        // مرحله اول: اجرای انیمیشن خروج
        dispatch(onSetSideToSide(payload));
            
        // مرحله دوم: یک ثانیه صبر
        await new Promise(resolve => setTimeout(resolve, 1500));

        // مرحله سوم: مخفی کردن کامل (null کردن)
        return null; 

    }
)

const headerSlice = createSlice({
    name: 'header_slice_toolkit', 
    initialState: initialState, 
    reducers: {
        // scroll Y
        hideScrollTop: (state, action) => {
            state.scrollHide = action.payload.target
        },
        //  search handler
        onSearchHandler: (state, action) => {
            state.search = action.payload.search
        },
        // sidebar 
        onSidebarHandler: (state, action) => {
            state.sidebar = action.payload.sidebar
        } ,
        onSetSideToSide: (state, action) => {
            state.sidebar = action.payload
        },
        onCloseSideToSide: (state) => {
            state.sidebar = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(closeWidthDelay.fulfilled, (state, action) => {
                state.sidebar = action.payload
            })
    }
})

export default headerSlice
export const {onCloseSideToSide, onSetSideToSide, hideScrollTop, onSearchHandler, onSidebarHandler} = headerSlice.actions