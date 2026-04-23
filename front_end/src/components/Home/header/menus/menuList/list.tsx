import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import type { TListMenusHeaderObject } from "./redux/sliceMenuList";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RooState } from "../../../../../store";
import { useReducer } from "react";
import { reducerSideToSide, SideState } from "./redux/reducer";
import "../../styles/styles.css"
import { closeWidthDelay } from "../../redux/headerSlice";

const ListSidebar = ({item, index}: {item: TListMenusHeaderObject, index: number }) => {
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const dispatch = useDispatch<AppDispatch>()

    const [sideToSide, dispatchSideToSide] =  useReducer(reducerSideToSide, SideState)   // usereducer for side to side
    
    const closeSide = () => {
        dispatchSideToSide({type: 'close', payload: {id: index}})
        setTimeout(() => {
            dispatchSideToSide({type: 'nullHasInteracted'})
        }, 500)
    }


    return(
        <div 
            key = {item.id} 
            className = {`${response ? `listElement group/list ` : ``}`}
        >
            <div 
                onClick={() => {
                    if(window.innerWidth < 750){
                        dispatchSideToSide({type: 'open', payload: {id: index}})
                    }
                }}
                className={`${response ? `flex  h-10 text-[15px]  items-center justify-between px-10  my-1 cursor-pointer dark:group-hover/list:text-rose-400 group-hover/list:text-sky-400 duration-300` 
                    :
                    ``
                }`}
            >
                <div className="">{item.list}</div>
                <div className={`${response ? `` : `hidden`}`}><FaChevronRight /></div>

            </div>

        
            {/* side to side */}
            <div 
                className={`${response ? 
                    `fixed w-full min-h-screen bg-green-700 top-0
                        ${sideToSide.hasInteracted === null && 'hidden!'}
                        ${ (sideToSide.SideToSide as any)[index] ? `openSideToSide` : `closeSideToSide`}
                    ` 
                    : 
                    'hidden'}
                `}
            >   
                {/* left button */}
                <div className=""
                    onClick={() => {
                        if(window.innerWidth < 750){closeSide()}
                    }}
                >
                    <FaChevronLeft /> {item.list}
                </div>

                {/* circle  */}
                <div className=""
                    onClick={() => {
                        if(window.innerWidth < 750){
                            closeSide();
                            dispatch(closeWidthDelay())
                        }
                    }}
                >
                    ❌
                </div>
            </div>
        </div>
    )
}
export default ListSidebar