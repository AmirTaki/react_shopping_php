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
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routh