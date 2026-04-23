import { useDispatch, useSelector } from "react-redux"
import type { RooState, AppDispatch } from "../../../../../../store"
import { closeWidthDelay } from "../../../redux/headerSlice";
import { FaChevronLeft } from "react-icons/fa6";
import type { TListMenusHeaderObject } from "../redux/sliceMenuList";
import type { ISideState, TActionSideToSide } from "../sideToSide/reducer/reducer";
import "../../../styles/styles.css"

interface SideToSideComponent {
    list: TListMenusHeaderObject, 
    sideToSide: ISideState, 
    dispatchSideToSide: React.ActionDispatch<[action: TActionSideToSide]>,
    index: number
}

const SidetoSide = ({list, sideToSide, dispatchSideToSide, index}: SideToSideComponent) => {

    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const dispatch = useDispatch<AppDispatch>()

    const closeSide = () => {
        dispatchSideToSide({type: 'close', payload: {id: index}})
        setTimeout(() => {
            dispatchSideToSide({type: 'nullHasInteracted'})
        }, 500)
    }

    return(
        <div 
            className={`${response ? 
                `fixed w-full min-h-screen bg-green-700 top-0
                    ${sideToSide.hasInteracted === null && 'hidden!'}
                    ${ (sideToSide.SideToSide as any)[index] ? `openSideToSide` : `closeSideToSide`}
                ` 
                : 
                'fixed bg-[blue] left-[32%]  w-[63%]  top-14  flex  h-110  '}
            `}
        >   
            {/* left button */}
            <div className=""
                onClick={(e) => {       
                    e.stopPropagation();
                    if(window.innerWidth <= 750){closeSide()}
                }}
            >
                <FaChevronLeft  className="hidden"/>
                 {list.list}
            </div>

            {/* circle  */}
            <div className=""
                onClick={(e) => {
                    e.stopPropagation();
                    if(window.innerWidth <= 750){
                        closeSide();
                        dispatch(closeWidthDelay())
                    }
                }}
            >
                ❌
            </div>
        </div>
    )
}
export default SidetoSide