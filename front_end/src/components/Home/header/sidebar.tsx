import { RxCross2 } from "react-icons/rx";
import {type AppDispatch, type RooState } from "../../../store"
import { useDispatch, useSelector } from "react-redux";
import { closeWidthDelay } from "./redux/headerSlice";
import "./styles/styles.css"
import { useEffect } from "react";
import { viewMenusHeaders } from "./menus/redux/actionsMenus";

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
                `bg-gray-500
                ${sidebar === null ? "hidden!" : ''}
                w-full min-h-screen fixed top-0 left-0
                    ` :
                    // desktop
                    `bg-amber-800 flex `
                }
        `}>
            <RxCross2 
                className={`${response ? 'flex' : 'hidden'}`}
                onClick={() => {dispatch(closeWidthDelay())}}
            />

            <div className={`${response ? `` : `flex gap-3`}`}>
                {Array.isArray(Menus) && Menus.map((item) => {
                    if(item.status == 10){
                        return(
                            <div>{item.title}</div>
                            // <ListSidebar  item = {item}/>
                        )
                    }
                })}
            </div>
        </div>
    )
}
export default Sidebar 
