import { useDispatch, useSelector } from "react-redux"
import type { RooState, AppDispatch } from "../../../../../../store"
import { closeWidthDelay } from "../../../redux/headerSlice";
import { FaChevronLeft } from "react-icons/fa6";
import type { TListMenusHeaderObject } from "../redux/sliceMenuList";
import type { ISideState, TActionSideToSide } from "../sideToSide/reducer/reducer";
import { RxCross2 } from "react-icons/rx";
import "../../../styles/styles.css"
import { useEffect } from "react";
import { viewCategoryHeadresThunk } from "./menuCategory/redux/actionCategory";
import type { TMenusHeaderObject } from "../../redux/menusSlice";
import { viewProductHeadresThunk } from "./menuSeries/redux/actionsMenuSeries";
import { imgURL } from "../../../../../../baseURL";
import { viewImageMenuHeadresThunk } from "./menuImage/redux/actionsImageMenu";

interface SideToSideComponent {
    list: TListMenusHeaderObject, 
    sideToSide: ISideState, 
    dispatchSideToSide: React.ActionDispatch<[action: TActionSideToSide]>,
    index: number,
    menu: TMenusHeaderObject
}

const SidetoSide = ({list, sideToSide, dispatchSideToSide, index, menu}: SideToSideComponent) => {

    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const {dark} = useSelector((state: RooState) => state.darkMode)
    const {categories} = useSelector((state: RooState) => state.categoreis)
    const {products} = useSelector((state: RooState) => state.sereies)
    const {images} = useSelector((state: RooState) => state.imagesMenus)
    const dispatch = useDispatch<AppDispatch>()

    const closeSide = () => {
        dispatchSideToSide({type: 'close', payload: {id: index}})
        setTimeout(() => {
            dispatchSideToSide({type: 'nullHasInteracted'})
        }, 500)
    }

    useEffect(() => {
        dispatch(viewCategoryHeadresThunk())
        dispatch(viewProductHeadresThunk())
        dispatch(viewImageMenuHeadresThunk())
    }, [])

    return(
        <div 
            className={`${response ? 
                `fixed w-full min-h-screen  top-0
                    dark:bg-[#242424]! bg-white
                    flex flex-col
                    ${sideToSide.hasInteracted === null && 'hidden!'}
                    ${ (sideToSide.SideToSide as any)[index] ? `openSideToSide` : `closeSideToSide`}
                ` 
                : 
                'fixed left-[30%]  w-[60%]   top-14  flex  h-110  overflow-hidden '}
            `}
        >   
            {/* header side to side  ${dark ? "navbarDark" : "navbarWhite"}*/}
            <div className={`${response ? `   border-b w-full h-10 flex items-center justify-between px-3` : `hidden`}`}>

                {/* left button */}
                <div className="flex items-center gap-2 cursor-pointer hover:tracking-[.1rem] duration-200 
                    hover:dark:text-rose-400 hover:text-sky-400 text-[silver]
                "
                    onClick={(e) => {       
                        e.stopPropagation();
                        if(window.innerWidth <= 750){closeSide()}
                    }}
                >
                    <FaChevronLeft  className="text-sm  "/>
                    <div className="text-sm ">{list.list}</div>
                    
                </div>

                {/* circle  */}
                <div className="hover:text-red-600 cursor-pointer hover:scale-125 duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        if(window.innerWidth <= 750){
                            closeSide();
                            dispatch(closeWidthDelay())
                        }
                    }}
                >
                    <RxCross2 />
                </div>
            </div>


            {/* contianer  side to side */}
            <div className={`${response ? `flex flex-wrap flex-col h-screen` : `w-full group-hover/list:flex hidden `}`}>
              
                {/* category */}
                <div className={`${response ? `w-[50%]  h-[50%]  ` : `w-[33.3%] py-3 bg-[blue]`}`}>
                    <div className="text-center">category</div>
                    {Array.isArray(categories) && categories.map((item) => {
                        if(item.list === list.list && item.status == 10 && item.title == menu.title){
                            return(
                                <div key = {item.id} className="" >{item.category}</div>
                            )
                        }
                    }) }

                </div>

                {/* series product */}
                <div className={`${response ? `w-[50%]  h-[50%] border-t ` : `w-[33.3%] bg-[red] `}`}>
                    <div className="text-center">series</div>
                    {Array.isArray(products) && products.map((item) => {
                        if(item.list === list.list && item.status == 10 && item.title == menu.title){
                            return(
                                <div key = {item.id} className="" >{item.series}</div>
                            )
                        }
                    }) }

                </div>


                {/* image */}
                <div className={`${response ? `w-[50%]  h-full border-l ` : `w-[33.3%]  bg-green-400 `}`}>image
                    {Array.isArray(images) && images.map((item) => {
                        if(item.list === list.list && item.status == 10 && item.title == menu.title){
                            return(
                                <div key = {item.id} className="" >
                                    <img src={imgURL + item.image} alt="" />
                                </div>
                            )
                        }
                    }) }
                </div>

            </div>
        </div>
    )
}
export default SidetoSide