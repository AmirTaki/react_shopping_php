import { useDispatch, useSelector } from "react-redux"
import type { RooState, AppDispatch } from "../../../../../../store"
import { closeWidthDelay } from "../../../redux/headerSlice";
import { FaChevronLeft } from "react-icons/fa6";
import type { TListMenusHeaderObject } from "../redux/sliceMenuList";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";
import { viewCategoryHeadresThunk } from "./menuCategory/redux/actionCategory";
import type { TMenusHeaderObject } from "../../redux/menusSlice";
import { viewProductHeadresThunk } from "./menuSeries/redux/actionsMenuSeries";
import { viewImageMenuHeadresThunk } from "./menuImage/redux/actionsImageMenu";
import CategoryMenus from "./menuCategory/category";
import SeriesMenus from "./menuSeries/series";
import ImagesMenus from "./menuImage/image";
import { closeSideToSideWidthDelay } from "./redux/sideToSideSlice";

interface SideToSideComponent {
    indexList: number, 
    li: TListMenusHeaderObject,
    menu: TMenusHeaderObject
}

const SidetoSide = ({indexList, li, menu}: SideToSideComponent) => {

    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop
    const {dark} = useSelector((state: RooState) => state.darkMode)
    const {sideToSide} = useSelector((state: RooState) => state.sideToSide) 
    const {categories} = useSelector((state: RooState) => state.categoreis)
    const {products} = useSelector((state: RooState) => state.sereies)
    const {images} = useSelector((state: RooState) => state.imagesMenus)
    const dispatch = useDispatch<AppDispatch>()

 

    useEffect(() => {
        dispatch(viewCategoryHeadresThunk())
        dispatch(viewProductHeadresThunk())
        dispatch(viewImageMenuHeadresThunk())
    }, [])

    return(
        <div 
            style={{animation: response ? `
                ${window.innerWidth < 640 ? `
                    ${(sideToSide as any)[indexList] ? `openSideToSide .5s linear forwards` : `closeSideToSide .5s linear forwards`}
                ` : `
                    ${(sideToSide as any)[indexList] ? `openSideToSideSM .5s linear forwards` : `closeSideToSideSM .5s linear forwards`}
                `}
                ` : ``}}   
            className={`
                    ${(sideToSide as any)[indexList] == null && 'hidden'}
                    ${response ?
                        ` fixed h-screen max-sm:w-full w-[50%] dark:bg-[#383737] bg-[#e5e5e5] top-0`
                    : ` left-[30.5%] max-lg:left-[25%] top-16 h-110 z-10 fixed max-lg:w-[75%] w-[58.5%] siderToSider
                    `}
                `}
        >
            <div className={`${response ? `flex w-full flex-col h-[100%]` : ``}`}>
            {/* side to side title  */}
                <div className={`${response ? `w-full h-16  dark:bg-[#242424]! bg-white!   border-b-1  border-[#d5d5d5] flex items-center  justify-between px-7 text-lg ` : `hidden`}`}>
                    <div 
                        onClick={() => {
                            dispatch(closeSideToSideWidthDelay({id: indexList}))
                        }}

                        className="flex items-center  gap-1 justify-center cursor-pointer hover:tracking-[.2rem] duration-300 group/titleList"
                    >
                        <div className="text-sm group-hover/titleList:-translate-x-2.5 duration-300 "><FaChevronLeft /></div>
                        <div className=" text-sm font-bold ">{li.list}</div>
                    </div>
                    <div 
                        onClick={() => {
                            dispatch(closeSideToSideWidthDelay({id: indexList}))
                            dispatch(closeWidthDelay())
                            closeWidthDelay
                        }}
                        className="cursor-pointer duration-200 hover:text-red-500 hover:scale-140">
                        <RxCross2 />
                    </div>
                </div>
                    <div className={`${response ? `  flex flex-col flex-wrap  top-16 fixed h-screen  w-full sm:w-[50%]` : `flex h-110 `}`}>
                        
                        <div className={`${response ? ` h-[50%] w-[50%]  border-r-1 border-b-1 border-[silver] dark:border-[#5d5d5d] flex flex-col sm:gap-2 ` : `w-[33.3%] h-full border-r-1 border-[silver] dark:border-gray-400border-[silver] dark:border-gray-400  `}`}>
                            
                            <div className="bg-[#d1cfcf] h-10 flex justify-center items-center dark:bg-[#616161] dark:text-[white] text-[#474444] tracking-[.1rem] mb-2">category</div>    
                            
                            {Array.isArray(categories) && categories.map((item) => {
                                if(item.status == 10 && item.list == li.list && item.title == menu.title) {
                                    return(
                                        <CategoryMenus key = {item.id} item = {item} />
                                    )
                                }
                            })}
                        
                        </div>
                    
                        <div className={`${response ? ` w-[50%] h-[50%]   border-r-1 border-b-1 border-[silver] dark:border-[#5d5d5d] flex flex-col sm:gap-2 ` : `w-[33.3%] h-full border-r-1 border-[silver] dark:border-gray-400 `}`}>
                            
                            <div className="bg-[#d1cfcf] h-10 flex justify-center items-center dark:bg-[#616161] dark:text-[white] text-[#474444] tracking-[.1rem] mb-2">series</div>    
                            
                            {Array.isArray(products) && products.map((item) => {
                                if(item.status == 10 && item.list == li.list && item.title == menu.title){
                                    return(
                                        <SeriesMenus key = {item.id} item = {item} />
                                    )
                                }
                            })}
                        
                        </div>
                    
                        <div className={`${response ? `  h-[100%] w-[50%]  flex flex-col items-center gap-4 py-15 sm:py-25 sm:gap-10` : `w-[33.3%] h-full flex flex-col items-center  `}`}>
                            {Array.isArray(images) && images.map((item) => {
                                if(item.status == 10 && item.list == li.list && item.title == menu.title)
                                {
                                    return(
                                        <ImagesMenus key = {item.id} item = {item}/>       
                                    )
                                }
                            })}

                        </div>
                    </div>
            </div>           
        </div>
    )
}
export default SidetoSide
   