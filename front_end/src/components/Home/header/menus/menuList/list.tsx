import { FaChevronRight } from "react-icons/fa6";
import type { TListMenusHeaderObject } from "./redux/sliceMenuList";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RooState } from "../../../../../store";
import {useEffect, } from "react";
import SidetoSide from "./sideToSide";
import type { TMenusHeaderObject } from "../redux/menusSlice";
import { closeSideToSideMegaMenu, closeSideToSideWidthDelay, openSideToSide, requestApiSideToSide } from "./sideToSide/redux/sideToSideSlice";

interface IListFourPiecessComponent{
    li:TListMenusHeaderObject, 
    indexList: number, 
    menu: TMenusHeaderObject,
    ListsRef: React.RefObject<Array<HTMLElement>>
}
const ListSidebar = ({li, indexList, menu, ListsRef}: IListFourPiecessComponent) => {
    const {response} =  useSelector((state: RooState) => state.response)
    const {sideToSide, side} = useSelector((state: RooState) => state.sideToSide)
    const dispatch = useDispatch<AppDispatch>()
    
    // const [sideToSide, dispatchSideToSide] =  useReducer(reducerSideToSide, SideState)   // usereducer for side to side
    useEffect(() => {   
        ListsRef.current && dispatch(requestApiSideToSide(ListsRef.current.length)) 
    }, [])

    
    return(
         <div 
            ref = {(x: HTMLDivElement) => {ListsRef.current[indexList] = x}}
            className={`${response ? ``: `dark:hover:bg-[#585858] hover:bg-[#d0d0d0] `} w-full  listElement`}

        > 
            <div 
                className={`${response ? 
                    `${(sideToSide as any)[indexList] ? `bg-[#dadada] dark:bg-[#414141]` : ``}  flex items-center justify-between h-10 px-8 text-sm cursor-pointer hover:bg-[#dadada] dark:hover:bg-[#414141] ` 
                    : ` ${(sideToSide as any)[indexList] ? `dark:bg-[#585858] bg-[#d0d0d0]` : `` } h-10 flex items-center px-4 dark:hover:bg-[#585858] hover:bg-[#d0d0d0] `}`}
                onClick={() => {
                    if(response){
                        if(indexList !== side){
                            dispatch(closeSideToSideWidthDelay({id: side}))
                            dispatch(openSideToSide({id: indexList}))
                        }
                    }
                    
                }}
                onMouseEnter={() => {
                   if(response === false){
                       dispatch(closeSideToSideMegaMenu({id: side}))
                       dispatch(openSideToSide({id: indexList}))
                   } 
                }}
            >
                <div className="">{li.list}</div>
                <div className={`${response  ? 'text-gray-600 dark:text-[silver] ' : 'hidden'}`} ><FaChevronRight /></div>
                
            </div>
            {/* side to side */}
            <SidetoSide indexList = {indexList} li = {li} menu = {menu}/>
            
        </div>
    )
}

export default ListSidebar
     