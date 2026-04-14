import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./components/DarkMode/redux/darkModeSlice";
import validationSlice from "./components/Auth/validation/redux/validationSlice";

const reducers = combineReducers({

    // dark mode for all projects
    darkMode: darkModeSlice.reducer,

    // validation auth redux
    validation:  validationSlice.reducer

 })

const store =  configureStore({
    reducer: reducers
})


export type AppDispatch =  typeof store.dispatch
export type RooState =  ReturnType<typeof store.getState>

export default store