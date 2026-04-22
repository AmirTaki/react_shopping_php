import { useDispatch, useSelector } from "react-redux"
import type{ AppDispatch, RooState } from "../../../../store"
import "../styles/styles.css"
import type { TMenusHeaderObject} from "./redux/menusSlice"
import { useEffect, useRef } from "react"
import { viewListHeadersThunk } from "./menuList/redux/actionsMenuList"
import { FaChevronDown } from "react-icons/fa";
import ListSideBar from "./menuList/list"

const MenusSideBar = ({menu, counterMenu} : {menu: TMenusHeaderObject, counterMenu: number}) => {
    const dispatch = useDispatch<AppDispatch>()
    const {response} = useSelector((state: RooState) => state.response) // respone ? mobile : desktop
    const {Lists} = useSelector((state: RooState) => state.lists) 
    const {dark} =  useSelector((state: RooState) => state.darkMode)

    useEffect(() => {dispatch(viewListHeadersThunk())}, [])

    const menusRef =  useRef <Array<HTMLElement | null>>([])

    const findHightDynamic = (h: number) => {  
        if(menusRef){  
            const menuElement = menusRef.current
            const specificMenu = menuElement && menuElement[h] as HTMLElement
            if(specificMenu ) {
                const listElement =  specificMenu.querySelectorAll('.listElement')
                return listElement.length * 40
            }
        }   
    }
    
    return(
        <div className="group/menu"
            ref = {(x:  HTMLDivElement | null) => {menusRef.current[counterMenu] = x }}
        >
            <div className={`${response ? `flex justify-between items-center  h-11 px-5` : ` h-14 flex items-center px-3 group-hover/menu:border-b border-[1px_solid_silver] duration-200`}`}>
                <div className="">{menu.title}</div>
                <div className={`${response ? `group-hover/menu:rotate-180 duration-200 text-[silver]` : `hidden`}`}><FaChevronDown /></div>
            </div>

            {/* list */}
            <div 
                style={{'--dynamic-height' : `${findHightDynamic(counterMenu)}px`} as React.CSSProperties} 

                className={`${response ? `  ${dark ? "navbarDark" : "bg-gray-200!"} group-hover/menu:h-[var(--dynamic-height)]  overflow-hidden h-0 flex   flex-col duration-500 navbarWhite bg-gray-500`: `bg-gray-900  flex-col px-[10%] w-full h-130 left-0 fixed top-14 group-hover/menu:flex hidden`}`}
            >
                {Array.isArray(Lists) && Lists.map((item, index) => {
                    if(item.title == menu.title && item.status == 10)
                    return(
                        <ListSideBar key = {index} item = {item}/>
                    )
                })}
            </div> 
        </div>
    
    )
}
export default MenusSideBar