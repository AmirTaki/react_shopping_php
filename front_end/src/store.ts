import { combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./components/DarkMode/redux/darkModeSlice";
import validationSlice from "./components/Auth/validation/redux/validationSlice";
import registerSlice from "./components/Auth/register/redux/registerSlice";
import loginSlice from "./components/Auth/login/redux/loginSlice";
import panelAdminSlice from "./components/PanelAdmin/structcher/redux/panelAdminSlice";
import userSlice from "./components/Users/redux/userSlice";
import menusSlice from "./components/Home/header/menus/redux/menusSlice";
import headerSlice from "./components/Home/header/redux/headerSlice";
import responseSlice from "./components/Response/redux/responseSlice";
import listMenusSlice from "./components/Home/header/menus/menuList/redux/sliceMenuList";
import categorySlice from "./components/Home/header/menus/menuList/sideToSide/menuCategory/redux/sliceCategory";
import sereisSlice from "./components/Home/header/menus/menuList/sideToSide/menuSeries/redux/sliceMenuSeries";
import imageMenuSlice from "./components/Home/header/menus/menuList/sideToSide/menuImage/redux/sliceImageMenus";
import SwiperSlicer from "./components/Home/session/backGroundSlider/redux/swiperSlice";

const reducers = combineReducers({

// component  for all projects
    darkMode: darkModeSlice.reducer,    // dark mode
    response: responseSlice.reducer, // response 


// ------------------------------------------------------
// COMPONENT HOME 
    header:  headerSlice.reducer,   // header 


//  ----------------------------------------------
// validation auth redux
    validation:  validationSlice.reducer,
    // register 
    register: registerSlice.reducer,
    // login
    login: loginSlice.reducer,

// -------------------------------------------------------------
// panelAdmin 
    // navbar
    panelAdmin: panelAdminSlice.reducer,        // navbar panel admin
    // --------------------------------------------------------------------
    // users 
    users: userSlice.reducer,                  // users in panel admin
//    --------------------- headers --------------------------------------------
    // headers 
    menus: menusSlice.reducer,              // menus header in panel admin
    // list 
    lists: listMenusSlice.reducer,               // list menus header in panel admin
    // category
    categoreis: categorySlice.reducer,      // category menus header in panel admin
    // series (product)
    sereies: sereisSlice.reducer,   // sereis (products) menus header in panel admin
    // images 
    imagesMenus: imageMenuSlice.reducer,     // images menus header in panel Admin

    // ---------------------------- session -----------------------------------------
    // backgroud slider
    SwiperSlide: SwiperSlicer.reducer,          // background slider -> swiper slicer 



 })

const store =  configureStore({
    reducer: reducers
})


export type AppDispatch =  typeof store.dispatch
export type RooState =  ReturnType<typeof store.getState>

export default store