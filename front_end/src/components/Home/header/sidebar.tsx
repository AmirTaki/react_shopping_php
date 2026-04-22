import { RxCross2 } from "react-icons/rx";
import {type AppDispatch, type RooState } from "../../../store"
import { useDispatch, useSelector } from "react-redux";
import { closeWidthDelay } from "./redux/headerSlice";
import "./styles/styles.css"
import { useEffect, useRef } from "react";
import { viewMenusHeaders } from "./menus/redux/actionsMenus";
import { FaChevronDown } from "react-icons/fa";
import { viewListHeadersThunk } from "./menus/menuList/redux/actionsMenuList";
import { FaChevronRight } from "react-icons/fa6";

const Sidebar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const {sidebar} = useSelector((state: RooState) => state.header) 
    const {dark} = useSelector((state: RooState) => state.darkMode)
    const {Menus} = useSelector((state: RooState) => state.menus)
    const {Lists} = useSelector((state: RooState) => state.lists)
    const menusRef =  useRef<Array<HTMLElement | null>>([])    

    const findHightDynamic = (h: number) => {  
        if(menusRef){  
            const menuElement = menusRef.current
            const specificMenu = menuElement && menuElement[h] as HTMLElement
            if(specificMenu ) {
                const listElement =  specificMenu.querySelectorAll('.listElement')
                return listElement.length * 44
            }
        }   
    }
    

    useEffect(() => {
        dispatch(viewMenusHeaders())
        dispatch(viewListHeadersThunk())
    }, [])

    return(
        <div >
            {/* sidebar */}
            <div 
                style={{animation: `${sidebar ? `openSidebar 1.5s linear forwards` : `closeSidebar 1.5s linear forwards`}`}}
                className={`${response ? `
                    ${sidebar === null ?  `hidden!` : ''}
                    fixed w-full min-h-screen dark:bg-[#242424]! bg-white top-0 left-0 z-10` 
                    : 
                    ``}
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
                <div className={`${response ? `flex flex-col min-h-screen mt-5` : ``}`}>
                    {Array.isArray(Menus) && Menus.map((menu, index) => {
                        if(menu.status == 10){
                            return (
                                <div
                                    ref = {(x: HTMLDivElement | null) => {menusRef.current[index] = x}} 
                                    key = {menu.id} 
                                    className={`${response ? ` group/menu overflow-hidden` : ``}`}
                                >
                                    <div className={`${response ? `h-10 flex items-center justify-between px-5 ` : ``}`}>
                                        <div className=""> {menu.title}</div>
                                        <div className={`${response ? `text-[silver] group-hover/menu:rotate-180 duration-300` : `hidden`}`}> <FaChevronDown/></div>
                                    </div>

                                    {/* list */}
                                    <div 
                                        style={{'--dynamic-height' : `${findHightDynamic(index)}px`} as React.CSSProperties} 
                                        className={`${response ? `h-0 group-hover/menu:h-[var(--dynamic-height)] duration-400   ${dark ? 'bg-[rgba(224,227,222,0.11)]' : 'bg-[rgba(222,222,222,.6)]'}`
                                            : 
                                            ``}
                                        `}
                                    >
                                        {Array.isArray(Lists) && Lists.map((item, ) => {
                                            if(item.title == menu.title && item.status == 10){
                                                return(
                                                    <div 
                                                        key = {item.id} 
                                                        className = {`${response ? `listElement group/list ` : ``}`}
                                                    >
                                                        <div className={`${response ? `flex  h-10 text-[15px]  items-center justify-between px-10  my-1 cursor-pointer dark:group-hover/list:text-rose-400 group-hover/list:text-sky-400 duration-300` 
                                                            :
                                                            ``}`
                                                        }>
                                                            <div className="">{item.list}</div>
                                                            <div className={`${response ? `` : `hidden`}`}><FaChevronRight /></div>

                                                        </div>

                                                    
                                                        {/* side to side */}
                                                        <div className={`${response ? `fixed w-20 h-10 bg-green-700 top-0` : 'hidden'}`}></div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>

            </div>
        </div>
    )
}
export default Sidebar 
