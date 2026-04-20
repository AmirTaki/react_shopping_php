import { BrowserRouter, Routes, Route } from "react-router-dom"
import Validation from "../Auth/validation/validation"
import Home from "../Home"
import Register from "../Auth/register"
import Login from "../Auth/login"
import PanelAdmin from "../PanelAdmin/structcher"
import LogOut from "../PanelAdmin/structcher/logout"
import Discription from "../PanelAdmin/structcher/discription"
import ViewUsersPanelAdmin from "../Users/view"
import UsersPanelAdmin from "../Users"
import CreateUsersPanelAdmin from "../Users/create"
import EditUsersPanelAdmin from "../Users/edit"
import ViewMenuPanelAdmin from "../Home/header/menus/panelAdmin/view"
import MenusHeaderPanelAdmin from "../Home/header/menus/panelAdmin"
import CreateMenusPanelAdmin from "../Home/header/menus/panelAdmin/create"
import EditMenusHeadersPA from "../Home/header/menus/panelAdmin/edit"
import ViewMenuListPA from "../Home/header/menus/menuList/panelAdmin/view"
import MenuListHeadersPA from "../Home/header/menus/menuList/panelAdmin"
import CreateMegaMenuListPA from "../Home/header/menus/menuList/panelAdmin/create"
import EditListMenuHeadersPA from "../Home/header/menus/menuList/panelAdmin/edit"
import ViewMenuCategoryPA from "../Home/header/menus/menuList/menuCategory/panelAdmin/view"
import MenuCategoryHeadresPA from "../Home/header/menus/menuList/menuCategory/panelAdmin"
import CreateMegaMenuCategoryPA from "../Home/header/menus/menuList/menuCategory/panelAdmin/create"
import EditCategoryHeadersPA from "../Home/header/menus/menuList/menuCategory/panelAdmin/edit"
import ViewMenuProductPA from "../Home/header/menus/menuList/menuSeries/panelAdmin/view"
import MenuProeductHeadresPA from "../Home/header/menus/menuList/menuSeries/panelAdmin"
import CreateMegaMenuProductPA from "../Home/header/menus/menuList/menuSeries/panelAdmin/create"
import EditProductHeadersPA from "../Home/header/menus/menuList/menuSeries/panelAdmin/edit"
import ViewImageMegaMenuPA from "../Home/header/menus/menuList/menuImage/panelAdmin/view"

const Routh = () => {
    return (
        <div className="">
            
            <BrowserRouter>
                <Routes>

                    {/* AUTH */}
                    <Route>
                        <Route path = 'validation' element = {<Validation />}>
                            <Route path = '' element = {<Register />}/>
                            <Route path = 'register' element = {<Register />}/>
                            <Route path = 'login' element = {<Login />}/>
                            <Route path = "logout" element = {<LogOut />} />
                        </Route>
                    </Route>

                    {/* HOME */}
                    <Route>
                        <Route path = '' element = {<Home />}></Route>
                        <Route path = '/home' element = {<Home />}></Route>
                    </Route>
                    
                    {/* SHOPPING */}
                    
                    {/* PANEL ADMIN */}
                    <Route path = "panelAdmin" element = {<PanelAdmin />}>

                        {/* description */}
                        <Route  path = ""  element = {<Discription />} />
                        <Route  path = "description"  element = {<Discription />} />

                        {/* users -> admin */}
                        <Route path = 'users' element = {<ViewUsersPanelAdmin />}>
                            <Route path = "" element = {<UsersPanelAdmin />}/>
                            <Route path = "create" element = {<CreateUsersPanelAdmin />}/>
                            <Route path = "edit/:id" element = {<EditUsersPanelAdmin />}/>
                        </Route>

                        {/* headers => menus */}
                        <Route path = "menusHeaders" element = {<ViewMenuPanelAdmin />}>
                            <Route path = "" element = {<MenusHeaderPanelAdmin />}/>
                            <Route path = "create" element = {<CreateMenusPanelAdmin />}/>
                            <Route path = "edit/:id" element = {<EditMenusHeadersPA />}/>
                        </Route>

                        {/* headers => list */}
                        <Route path="megaMenuList" element = {<ViewMenuListPA />}>
                            <Route path = "" element = {<MenuListHeadersPA />}/>
                            <Route path = "create" element = {<CreateMegaMenuListPA />}/>
                            <Route path = "edit/:id" element = {<EditListMenuHeadersPA />}/>
                        </Route>

                        {/* headers -> category */}
                        <Route path="megaMenuCategory" element = {<ViewMenuCategoryPA />}>
                            <Route path = "" element = {<MenuCategoryHeadresPA />}/>
                            <Route path = "create" element = {<CreateMegaMenuCategoryPA />}/>
                            <Route path = "edit/:id" element = {<EditCategoryHeadersPA />}/>
                        </Route>

                        {/* headers -> series : products */}
                        <Route path="megaMenuProduct" element = {<ViewMenuProductPA />}>
                            <Route path = "" element = {<MenuProeductHeadresPA />}/>
                            <Route path = "create" element = {<CreateMegaMenuProductPA />}/>
                            <Route path = "edit/:id" element = {<EditProductHeadersPA />}/>
                        </Route>

                        {/* headers -> image : navbar */}
                        <Route path="megaMenuImage" element = {<ViewImageMegaMenuPA />}>
                            {/* <Route path = "" element = {<MenuProeductHeadresPA />}/>
                            <Route path = "create" element = {<CreateMegaMenuProductPA />}/>
                            <Route path = "edit/:id" element = {<EditProductHeadersPA />}/> */}
                        </Route>

                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routh