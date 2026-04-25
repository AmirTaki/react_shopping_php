import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { RooState, AppDispatch } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { onChangeSliderPanelAdmin } from "../../../../PanelAdmin/structcher/redux/panelAdminSlice";


const ViewImageSliderSessionPA = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {user} =  useSelector((state: RooState) => state.panelAdmin)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(onChangeSliderPanelAdmin({id: 7}))
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
            <h1 className="text-2xl hover:tracking-[.3rem] duration-300">Image Slider Tables</h1> 
            <Outlet />
        </div>
    )
}
export default ViewImageSliderSessionPA;