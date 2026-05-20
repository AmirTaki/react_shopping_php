import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface ISIDETOSIDE {
    sideToSide: Array<boolean|null>, 
    side: number

}

const initialState: ISIDETOSIDE =  {
    sideToSide: [],
    side: -1
}


export const closeSideToSideWidthDelay = createAsyncThunk<number, {id: number}, {rejectValue: string}>(
    'close_side_to_side_toolkit',
    async(paylod, {dispatch}) => {
        dispatch(closeSideToSide({id: paylod.id}))
        
        window.innerWidth >= 640 ? await new Promise (resolve => setTimeout(resolve, 500)) : await new Promise (resolve => setTimeout(resolve, 1500))

        return paylod.id
    }
)

const sideToSideSlice =  createSlice({
    name: 'sideToSide_toolkit',
    initialState: initialState,
    reducers: {
        requestApiSideToSide: (state, action) => {
            state.sideToSide = Array(action.payload).fill(null)
        }, 
        openSideToSide: (state, action) => {
            state.sideToSide[action.payload.id] = true
            state.side = action.payload.id
        },
        closeSideToSide: (state, action) => {
          state.sideToSide[action.payload.id] = false
          state.side = -1
        },
        nullSideToSide: (state) => {
            state.sideToSide[state.side] = null
            state.side = -1
        },
        closeSideToSideMegaMenu: (state, action) => {
            state.sideToSide[action.payload.id] = null
            state.side = -1
        }
   
    },
    extraReducers: (builder) => {
        builder
            .addCase(closeSideToSideWidthDelay.fulfilled, (state, action) => {
                state.sideToSide[action.payload] = null
            })
    }
})

export default sideToSideSlice
export const {requestApiSideToSide, openSideToSide, closeSideToSide, nullSideToSide, closeSideToSideMegaMenu} = sideToSideSlice.actions