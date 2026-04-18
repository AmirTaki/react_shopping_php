import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { onChangeSliderPanelAdmin } from "../redux/panelAdminSlice"
import type { AppDispatch, RooState } from "../../../../store"

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