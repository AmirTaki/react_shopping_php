import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import type { AppDispatch, RooState } from "../../store";
import { onChangeSliderPanelAdmin } from "../PanelAdmin/structcher/redux/panelAdminSlice";

const ViewUsersPanelAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {user} =  useSelector((state: RooState) => state.panelAdmin)

    useEffect(() => {
        dispatch(onChangeSliderPanelAdmin({id: 1}))
    }, [])
    
    useEffect(() => {

        const timer = setInterval(() => {
            if(user === undefined) return
            else if(user?.level !== "A"){
                window.alert('not allowed')
                navigate('/panelAdmin/description')
            }
       
        }, 300)
        return () => clearInterval(timer)
    }, [user])
    
    return(
        <div className={`flex justify-center items-center flex-col gap-10`}>
            <h1 className="text-2xl hover:tracking-[.3rem] duration-300">Users Tables</h1> 
            <Outlet />
        </div>
    )
}

export default ViewUsersPanelAdmin;