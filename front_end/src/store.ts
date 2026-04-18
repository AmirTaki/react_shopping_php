import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./components/DarkMode/redux/darkModeSlice";
import validationSlice from "./components/Auth/validation/redux/validationSlice";
import registerSlice from "./components/Auth/register/redux/registerSlice";
import loginSlice from "./components/Auth/login/redux/loginSlice";
import panelAdminSlice from "./components/PanelAdmin/structcher/redux/panelAdminSlice";
import userSlice from "./components/Users/redux/userSlice";

const reducers = combineReducers({

// dark mode for all projects
    darkMode: darkModeSlice.reducer,

// validation auth redux
    validation:  validationSlice.reducer,
    // register 
    register: registerSlice.reducer,
    // login
    login: loginSlice.reducer,

// panelAdmin 
    // navbar
    panelAdmin: panelAdminSlice.reducer,        // navbar panel admin

    // users 
    users: userSlice.reducer,                  // users in panel admin



 })

const store =  configureStore({
    reducer: reducers
})


export type AppDispatch =  typeof store.dispatch
export type RooState =  ReturnType<typeof store.getState>

export default store