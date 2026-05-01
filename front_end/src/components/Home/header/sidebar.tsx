import { RxCross2 } from "react-icons/rx";
import {type AppDispatch, type RooState } from "../../../store"
import { useDispatch, useSelector } from "react-redux";
import { closeWidthDelay } from "./redux/headerSlice";
import "./styles/styles.css"
import { useEffect,} from "react";
import { viewMenusHeaders } from "./menus/redux/actionsMenus";
import MenusSidebar from "./menus/menus";

const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const {sidebar} = useSelector((state: RooState) => state.header) 
    const {dark} = useSelector((state: RooState) => state.darkMode)
    const {Menus} = useSelector((state: RooState) => state.menus)

  
    useEffect(() => {
        dispatch(viewMenusHeaders())
    }, [])

    return(
        <div >
            {/* sidebar */}
            <div 
                style={{animation: `${sidebar ? `openSidebar 1.5s linear forwards` : `closeSidebar 1.5s linear forwards`}`}}
                className={`${response ? `
                    ${sidebar === null ?  `hidden!` : ''}
                    fixed w-full min-h-screen dark:bg-[#242424]! bg-white! top-0 left-0 z-10` 
                    : 
                    ` `}
                `}
            >
                {/* cross sidesar */}
                <div className={`${response ? `h-14 border-b border-b-[.5px]! border-b-[#d5d5d5] flex items-center justify-end 
                    ${dark ? "navbarDark" : "navbarWhite"} 
                    ` : `hidden`}`}>
                    <RxCross2 
                        onClick={() => {dispatch(closeWidthDelay())}}
                        className="cursor-pointer hover:text-red-500 hover:scale-150 duration-300 text-lg mx-3"
                    /> 
                </div>

                {/* menu */}
                <div className={`${response ? `flex flex-col min-h-screen mt-5` : `flex gap-5`}`}>
                    {Array.isArray(Menus) && Menus.map((menu, index) => {
                        if(menu.status == 10){
                            return (
                                <MenusSidebar key = {menu.id} menu = {menu} index = {index} /> 
                            )
                        }
                    })}
                </div>

            </div>
        </div>
    )
}
export default Sidebar 
