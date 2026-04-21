import { useDispatch, useSelector } from "react-redux"
import type{ AppDispatch, RooState } from "../../../../store"
import "../styles/styles.css"
import type { TMenusHeaderObject} from "./redux/menusSlice"
import { useEffect, useRef } from "react"
import { viewListHeadersThunk } from "./menuList/redux/actionsMenuList"
import { FaChevronDown } from "react-icons/fa";

const MenusSideBar = ({menu, counterMenu} : {menu: TMenusHeaderObject, counterMenu: number}) => {
    const dispatch = useDispatch<AppDispatch>()
    const {response} = useSelector((state: RooState) => state.response) // respone ? mobile : desktop
    const {Lists} = useSelector((state: RooState) => state.lists) 
    useEffect(() => {dispatch(viewListHeadersThunk())}, [])

    const menusRef =  useRef <Array<HTMLElement | null>>([])
    const listsRef =  useRef <Array<HTMLElement> | null>([])

    const findHightDynamic = (h: number) => {
  
        if(menusRef){  
            const menuElement = menusRef.current
            const specificMenu = menuElement && menuElement[h] as HTMLElement
            if(specificMenu ) {
                const listElement =  specificMenu.querySelectorAll('.listElement')
                return listElement.length * 30

                // const listElement = listsRef.current
                // return listElement?.length * 20
            }
        }   
    }
    
    return(
        <div className="group/menu"
            ref = {(x:  HTMLDivElement | null) => {menusRef.current[counterMenu] = x }}
        >
            <div className={`${response ? `flex justify-between items-center  h-11 px-5` : ``}`}>
                <div className="">{menu.title}</div>
                <div className={`${response ? `group-hover/menu:rotate-180 duration-200 text-[silver]` : `hidden`}`}><FaChevronDown /></div>
            </div>

            {/* list */}
            <div 
                style={{'--dynamic-height' : `${findHightDynamic(counterMenu)}px`} as React.CSSProperties} 

                className={`${response ? `group-hover/menu:h-[var(--dynamic-height)]  overflow-hidden h-0 flex flex-col duration-300`: `bg-gray-900 flex flex-col hidden w-full h-130 left-0 absolute top-14 group-hover/menu:flex`}`}
            >
                {Array.isArray(Lists) && Lists.map((item, index) => {
                    if(item.title == menu.title && item.status == 10)
                    return(
                        <div
                            key = {index}
                            // ref = {(x) => {listsRef.current[index] = x }}
                            className="listElement bg-amber-300 h-10  "
                        >{item.list}</div>
                    )
                })}
            </div> 
        </div>
    
    )
}
export default MenusSideBar