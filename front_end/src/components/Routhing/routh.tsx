import { BrowserRouter, Routes, Route } from "react-router-dom"
import Validation from "../Auth/validation/validation"
import Home from "../Home"

const Routh = () => {
    return (
        <div className="">
            
            <BrowserRouter>
                <Routes>

                {/* AUTH */}
                <Route>
                    <Route path = 'validation' element = {<Validation />}></Route>
                </Route>

                {/* HOME */}
                <Route>
                    <Route path = '' element = {<Home />}></Route>
                    <Route path = '/home' element = {<Home />}></Route>
                </Route>
                
                {/* SHOPPING */}
                
                {/* PANEL ADMIN */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Routh