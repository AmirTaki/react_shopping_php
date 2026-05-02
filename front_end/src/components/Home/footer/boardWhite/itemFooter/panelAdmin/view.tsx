import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import type { AppDispatch, RooState } from "../../../../../../store";
import { useEffect } from "react";
import { onChangeSliderPanelAdmin } from "../../../../../PanelAdmin/structcher/redux/panelAdminSlice";

const ViewItemFooterPA = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {user} =  useSelector((state: RooState) => state.panelAdmin)
    
    useEffect(() => {
        dispatch(onChangeSliderPanelAdmin({id: 18}))
    }, [])
    
    useEffect(() => {

        const timer = setInterval(() => {
            if(user === undefined) return
            else if(user?.level !== "A" && user?.level !== 'B'){
                window.alert('not allowed')
                navigate('/panelAdmin/description')
            }
       
        }, 300)
        return () => clearInterval(timer)
    }, [user])
    return(
        <div className={`flex justify-center items-center flex-col gap-10 ${user?.level !== "A" && user?.level !== 'B' ? "opacity-10": ""}`}>
            <h1 className="text-2xl hover:tracking-[.3rem] duration-300">Item Footer Tables</h1> 
            <Outlet />
        </div>
    )
}
export default ViewItemFooterPA;