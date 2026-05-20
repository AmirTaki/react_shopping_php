import { useEffect, useRef } from "react"
import type { TMenusHeaderObject } from "./redux/menusSlice"
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RooState } from "../../../../store"
import { viewListHeadersThunk } from "./menuList/redux/actionsMenuList"
import { FaChevronDown } from "react-icons/fa";
import ListSidebar from "./menuList/list"
import { closeSideToSideMegaMenu, openSideToSide } from "./menuList/sideToSide/redux/sideToSideSlice"
import { closeAllMegeMenu, closeMegaMenu, openMegaMenu } from "./redux/megaMenuSlice"

const MenusSidebar = ({menu, indexMenu }: {menu: TMenusHeaderObject, indexMenu: number} ) => {
    
    const dispatch = useDispatch<AppDispatch>()
    const menusRef =  useRef<Array<HTMLElement | null>>([])    
    const ListsRef = useRef<Array<HTMLElement >>([])
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const {Lists} = useSelector((state: RooState) => state.lists)
    const {megaMenu, InteractedMegaMenu} = useSelector((state: RooState) => state.megaMenu)
    const {side} = useSelector((state: RooState) => state.sideToSide)


    useEffect(() => {
        dispatch(viewListHeadersThunk())
    }, [])

    const findHightDynamic = (h: number) => {
        if (menusRef){
            const menuElement = menusRef.current
            const specificMenu = menuElement && menuElement[h] as HTMLElement
            if(specificMenu) {
                const listElement = specificMenu.querySelectorAll<HTMLElement>('.listElement')
                return listElement.length * 44
            }

        }
    } 
    
    const handlerMouseEnterMegaMenu = (index: number) => {
        const menuElement = menusRef.current
        const specificMenu  = menuElement && menuElement[index] as HTMLElement

        if(specificMenu) {
            const listElement =  specificMenu.querySelectorAll<HTMLElement>('.listElement')
            const list =  listElement[0] 
            if(ListsRef.current){
                for(let i = 0; i < ListsRef.current.length; i++){
                    if(ListsRef.current[i] == list){
                        dispatch(openSideToSide({id: i}))
                        break;
    
                    }
                }
            }
            
        }
    }

    return(
        <div
            ref = {(x: HTMLDivElement | null) => {menusRef.current[indexMenu] = x}}  
            className={`${response ? `` : ` `} group/menu`}
            onMouseLeave={() => {
                response ? '' : dispatch(closeMegaMenu({id: indexMenu}))
            }}
        >
            <div 
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    if(response === false){
                        dispatch(closeSideToSideMegaMenu({id: side}));
                        dispatch(openMegaMenu({id: indexMenu})) ;
                        handlerMouseEnterMegaMenu(indexMenu); 
                    }
                }}
         
                onClick={() => {
                    if(response){
                        if(megaMenu[indexMenu] == true){
                            dispatch(closeMegaMenu({id: indexMenu}))
                        }
                        else {
                            dispatch(closeAllMegeMenu()) ;
                            dispatch(openMegaMenu({id: indexMenu})) 
                        }
                    }
                    else {
                        dispatch(closeAllMegeMenu()) ;
                        dispatch(openMegaMenu({id: indexMenu}))
                    }
                }}
                
                className={`${response ? ``: `group-hover/menu:border-b-3  group-hover/menu:border-[red] ${(megaMenu as any)[indexMenu] == true ? 'border-b-3! border-[red]!' : ''} px-3  h-[57px] border-b-3 border-b-transparent  flex justify-center items-center cursor-pointer`}`}
            >
                <div className={`${response ? 'w-full  flex h-9 items-center justify-between px-5' : ''}`}>
                    <div className=""> {menu.title}</div>
                    <div className={`${response ? `${(megaMenu as any)[indexMenu] == true ? 'rotate-180 text-rose-500' : 'text-[silver]'} duration-150` : "hidden"} `}><FaChevronDown/></div>
               
                </div>
            </div>

            {/* megaMenu*/}
            <div 
                style={{ "--dynamic-height" : `${findHightDynamic(indexMenu)}px`} as React.CSSProperties} 
                className={`${response ?
                `h-0 overflow-hidden ${(megaMenu as any)[indexMenu] == true ? 'h-[var(--dynamic-height)]  ' : 'h-0 '}  duration-300` :
                `${(megaMenu as any)[indexMenu] == true ? 'flex ' : 'hidden'}  ${InteractedMegaMenu === null && 'hidden'}  fixed  w-full  h-110 top-[57px] left-0 border-b-1 border-[silver] dark:border-gray-400 dark:bg-[#313131]! bg-[rgba(222,222,222,1)]! `}`}
            >

                <div className={`${response ? 'overflow-hidden' : ' h-full  max-lg:w-full w-[78%] mx-auto  '}`}>
                 
                    <div className={`${response ? `dark:bg-[#383737] bg-[#e5e5e5] py-2  ` : ' full h-full  '}`}>
                        <div className={`${response ? `` : `w-[25%] h-full  flex flex-col border-r-1 border-[silver] dark:border-gray-400  pt-2`} `}>
                            {Array.isArray(Lists) && Lists.map((li, index) => {
                                if(li.status == 10 && li.title == menu.title)
                                return (
                                    <ListSidebar key = {li.id} li = {li} indexList = {index} menu = {menu} ListsRef  = {ListsRef} />                      
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default MenusSidebar 
