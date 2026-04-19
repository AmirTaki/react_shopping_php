import { useDispatch, useSelector } from "react-redux"
import { RxCross2 } from "react-icons/rx";
import type{ AppDispatch, RooState } from "../../../../store"
import "../styles/styles.css"
import { closeWidthDelay, } from "../redux/headerSlice";
import { useEffect } from "react";

const MenusSideBar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {response} = useSelector((state: RooState) => state.response) // response ? mobile : desktop
    const {sidebar} =  useSelector((state: RooState) => state.header)
    
  
    
    return(
    
        <div 
            style={{animation: `${sidebar ? "openSidebar 1.5s linear forwards" : "closeSidebar 1.5s linear forwards"}`}}
            className={`${response ? `bg-gray-500
            ${sidebar === null ? "hidden!" : ''}
            w-full min-h-screen fixed top-0 left-0
            ` :`bg-amber-800`}
            
        `}>
            <RxCross2 
                onClick={() => {dispatch(closeWidthDelay())}}
            />
 
        </div>
    )
}
export default MenusSideBar