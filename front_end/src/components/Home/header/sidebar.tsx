import { RxCross2 } from "react-icons/rx";
import {type AppDispatch, type RooState } from "../../../store"
import { useDispatch, useSelector } from "react-redux";
import { closeWidthDelay } from "./redux/headerSlice";
import "./styles/styles.css"
import { useEffect } from "react";
import { viewMenusHeaders } from "./menus/redux/actionsMenus";
import MenusSideBar from "./menus/menus";
import "./styles/styles.css"

const Sidebar = () => {
    const dispatch =  useDispatch<AppDispatch>()
    const {response} = useSelector((state: RooState) => state.response)
    const {sidebar} =  useSelector((state: RooState) => state.header)  // header -> sidebar
    const {Menus} = useSelector((state: RooState) => state.menus)

    useEffect(() => {dispatch(viewMenusHeaders())}, [])
    return(
        <div 
            style={{animation: `${sidebar ? "openSidebar 1.5s linear forwards" : "closeSidebar 1.5s linear forwards"}`}}
            className={`${response ? 
                // mobile
               ` dark:bg-[#242424]! bg-white z-50
                ${sidebar === null ? "hidden!" : ''}
                w-full min-h-screen fixed top-0 left-0
                    ` :
                    // desktop
                    ` flex h-full items-center `
                }
            
            `}
        >
            <div className={`${response ? `flex w-full h-14 justify-end items-center px-4 border-b-1 border-[silver] navbarWhite` : `hidden`}`}>
                <RxCross2  className="cursor-pointer hover:text-red-500 duration-200 hover:scale-150"
                    onClick={() => {dispatch(closeWidthDelay())}}
                />
            </div>

            <div className={`${response ? ` flex flex-col` : `flex gap-3`}`}>
                {Array.isArray(Menus) && Menus.map((item, index) => {
                    if(item.status == 10){
                        return(
                            <MenusSideBar key = {index} menu = {item} counterMenu = {index}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}
export default Sidebar 
