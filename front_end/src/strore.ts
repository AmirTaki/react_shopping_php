import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./components/DarkMode/redux/darkModeSlice";

const reducers = combineReducers({

    // dark mode for all projects
    darkMode: darkModeSlice.reducer

    // 

 })

const store =  configureStore({
    reducer: reducers
})


export type AppDispatch =  typeof store.dispatch
export type RooState =  ReturnType<typeof store.getState>

export default store