import { useDispatch } from "react-redux"
import type{ AppDispatch } from "../../../../../store"
import { useEffect } from "react"
import { onChangeSliderPanelAdmin } from "../../../../PanelAdmin/structcher/redux/panelAdminSlice"

const Discription = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(onChangeSliderPanelAdmin({id: 0}))
    }, [])
    return(
        <div className={`flex justify-center items-center flex-col gap-20 `}>
            <h1 className="text-2xl hover:tracking-[.3rem] duration-300">Description</h1> 

            <p className=" dark:hover:text-rose-400! hover:text-blue-500! hover:tracking-[.2rem] duration-300">
                Your wellcome to panel admin 
            </p>
            
        </div>
    )
}
export default Discription