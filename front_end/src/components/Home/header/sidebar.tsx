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
    const {side} = useSelector((state: RooState) => state.sideToSide)

  
    useEffect(() => {
        dispatch(viewMenusHeaders())
    }, [])

    return(
        <div 
            style={{animation : window.innerWidth >= 640 ?  sidebar ? `openSidebarSM .5s linear forwards` : `closeSidebarSM .5s linear forwards` :  sidebar ? `openSidebar 1.5s linear forwards` : `closeSidebar 1.5s linear forwards`}}
            className={`${response ?
                `fixed w-[50%]! max-sm:w-[100%]! min-h-screen top-0 left-0   dark:bg-[#242424]! bg-white! z-20 border-r border-[silver]
                ${sidebar == null ? 'hidden!' : 'block'}
                `
                : ` `}
            `}
        >
            <div className={`${response ? `h-16 border-b border-b-[.5px]! border-b-[#d5d5d5] flex items-center justify-end 
                ${dark ? `navbarDark` : `navbarWhite`} 
                ` : `hidden`}`}
            >
                <RxCross2 
                    onClick={() => {dispatch(closeWidthDelay())}}
                    className={`${ side == -1 ? 'cursor-pointer hover:text-red-500 hover:scale-150 duration-300 text-lg mx-3' : 'hidden'}`}
                /> 
            </div>

            <div className={`  ${response ? 'my-6' : 'flex text-sm gap-[3%]'}`}>
                {Array.isArray(Menus) && Menus.map((menu, index) => {
                    if(menu.status == 10){
                        return(
                            <MenusSidebar key = {menu.id} menu = {menu} indexMenu = {index} />
                        )
                    }
                })}
   
            </div>  

        </div>
    )
}
export default Sidebar 

       