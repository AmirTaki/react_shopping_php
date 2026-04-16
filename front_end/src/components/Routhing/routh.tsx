import { BrowserRouter, Routes, Route } from "react-router-dom"
import Validation from "../Auth/validation/validation"
import Home from "../Home"
import Register from "../Auth/register"
import Login from "../Auth/login"
import PanelAdmin from "../PanelAdmin/structcher"

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

                    </Route>

                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routh