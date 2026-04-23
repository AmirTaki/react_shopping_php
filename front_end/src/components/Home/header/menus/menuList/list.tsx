import { FaChevronRight } from "react-icons/fa6";
import type { TListMenusHeaderObject } from "./redux/sliceMenuList";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RooState } from "../../../../../store";
import { useReducer } from "react";
import { reducerSideToSide, SideState } from "./sideToSide/reducer/reducer";
import "../../styles/styles.css"
import SidetoSide from "./sideToSide";
import type { TMenusHeaderObject } from "../redux/menusSlice";

const ListSidebar = ({list, index, menu}: {list: TListMenusHeaderObject, index: number, menu: TMenusHeaderObject }) => {
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    
    const dispatch = useDispatch<AppDispatch>()
    const [sideToSide, dispatchSideToSide] =  useReducer(reducerSideToSide, SideState)   // usereducer for side to side
    
    return(
        <div 
            key = {list.id} 
            className = {`${response ? `listElement   ` : ``} group/list`}
        >

                <div 
                    onClick={(e) => {
                        e.stopPropagation();
                        if(window.innerWidth <= 750){
                            dispatchSideToSide({type: 'open', payload: {id: index}})
                        }
                    }}
                    className={`${response ? `flex  h-10 text-[15px]  items-center justify-between px-10  my-1 cursor-pointer dark:group-hover/list:text-rose-400 group-hover/list:text-sky-400 duration-300` 
                        :
                        ` `
                    }`}
                >
                    <div className="">{list.list}</div>
                    <div className={`${response ? `` : `hidden`}`}><FaChevronRight /></div>

                </div>
                {/* side to side */}
                <SidetoSide list = {list} sideToSide = {sideToSide} dispatchSideToSide = {dispatchSideToSide}  index = {index} menu = {menu} />
            

        
        </div>
    )
}
export default ListSidebar