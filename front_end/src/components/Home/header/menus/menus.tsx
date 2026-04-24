import { useEffect, useRef } from "react"
import type { TMenusHeaderObject } from "./redux/menusSlice"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RooState } from "../../../../store"
import { viewListHeadersThunk } from "./menuList/redux/actionsMenuList"
import { FaChevronDown } from "react-icons/fa";
import ListSidebar from "./menuList/list"

const MenusSidebar = ({menu, index }: {menu: TMenusHeaderObject, index: number} ) => {
    const dispatch = useDispatch<AppDispatch>()
    const menusRef =  useRef<Array<HTMLElement | null>>([])    
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const {Lists} = useSelector((state: RooState) => state.lists)
    const {dark} = useSelector((state: RooState) => state.darkMode)

    useEffect(() => {
        dispatch(viewListHeadersThunk())
    }, [])

    const findHightDynamic = (h: number) => {  
        if(menusRef){  
            const menuElement = menusRef.current
            const specificMenu = menuElement && menuElement[h] as HTMLElement
            if(specificMenu ) {
                const listElement =  specificMenu.querySelectorAll<HTMLElement>('.listElement')
                return listElement.length * 44
            }
        }   
    }

    const handlerMouseEnter = (index: number) => {
        if(window.innerWidth > 750){

            if(menusRef){  
                const menuElement = menusRef.current
                const specificMenu = menuElement && menuElement[index] as HTMLElement
            
                if(specificMenu ) {
                    const listMouseEnter = specificMenu.querySelectorAll<HTMLElement>('.listMouseEnter')
                    const specificList = listMouseEnter[0] as HTMLElement;
                    if(specificList){
                        const sideToMegaMenu  = specificList.querySelectorAll<HTMLElement>('.SideToMegaMenu')
                        if(sideToMegaMenu){
                            const special = sideToMegaMenu[0] as HTMLElement;   
                            const continaerSide = sideToMegaMenu[0].querySelector<HTMLElement>('.sideToSideContainer') as HTMLElement
                        
                            if(special){
                                special.style.display = 'flex'
                                continaerSide.style.display = "flex"
                            }
                        }
                    }
                }
            }  
        }
    }

    return(
        <div
            ref = {(x: HTMLDivElement | null) => {menusRef.current[index] = x}} 
            onMouseMove={() => {handlerMouseEnter(index)}}
            className={`${response ? `  overflow-hidden` : ``} group/menu `}
        >
            <div className={`${response ? `h-10 flex items-center justify-between px-5 ` : `h-14 flex justify-center items-center px-2 cursor-pointer  group-hover/menu:border-b-1 duration-200 `}`}>
                <div className=""> {menu.title}</div>
                <div className={`${response ? `text-[silver] group-hover/menu:rotate-180 duration-300` : `hidden`}`}> <FaChevronDown/></div>
            </div>

            {/* list */}
            <div 
                style={{'--dynamic-height' : `${findHightDynamic(index)}px`} as React.CSSProperties} 
                className={`${response ? `h-0 group-hover/menu:h-[var(--dynamic-height)] duration-400  ${dark ? 'bg-[rgba(224,227,222,0.11)]' : 'bg-[rgba(222,222,222,.6)]'} `
                    : 
                    `fixed w-full h-110 left-0 top-14 group-hover/menu:flex  hidden  px-[5%]   ${dark ?  "bg-[#474747] " : "bg-[#efefef]"} `}
                    
                    
                `}
            >   
                <div className={`${response ? `` : `flex flex-col h-full w-[23%]  border-r py-4   `}`}>
                    {Array.isArray(Lists) && Lists.map((item, index) => {
                        if(item.title == menu.title && item.status == 10){
                            return(
                                <ListSidebar key = {item.id} list = {item} index = {index} menu = {menu}/>
                        
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
export default MenusSidebar 