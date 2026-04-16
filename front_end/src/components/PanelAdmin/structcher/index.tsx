import { Outlet } from "react-router-dom";
import NavbarPanelAdmin from "./navbar/navbar";
import CheckSession from "./checkSession";

const PanelAdmin = () => {
    return(
        <div className="min-h-screen">
            {/* check session & sign leavel */}
            <CheckSession />

            {/* navbar  panel admin*/}
            <NavbarPanelAdmin />

            {/* session panel admin */}
            <div className="min-h-screen pt-30">
                <Outlet />
            </div>
        </div>
    )
}
export default PanelAdmin;