import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ })

const store =  configureStore({
    reducer: reducers
})


export type AppDispatch =  typeof store.dispatch
export type RooState =  ReturnType<typeof store.getState>

export default store