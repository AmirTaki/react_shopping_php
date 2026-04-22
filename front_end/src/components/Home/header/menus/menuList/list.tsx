import { useDispatch, useSelector } from "react-redux"
import type { TListMenusHeaderObject } from "./redux/sliceMenuList"
import type { RooState, AppDispatch } from "../../../../../store"
import { FaChevronRight } from "react-icons/fa6";
import { useEffect } from "react";
import { viewCategoryHeadresThunk } from "./menuCategory/redux/actionCategory";
import type { TMenusHeaderObject } from "../redux/menusSlice";

const ListSideBar = ({item, menu}: {item: TListMenusHeaderObject, menu:TMenusHeaderObject }) => {
    const {response} = useSelector((state: RooState) => state.response) // respone ? mobile : desktop
    const {categories} = useSelector((state: RooState) => state.categoreis)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(viewCategoryHeadresThunk())
    }, [])
    return(
       

            <div className={`${response ? ` listElement group/list ` : `w-[30%] bg-[blue] group/list   `}`}>
                <div className={`${response ? `h-10 text-sm! mx-10 cursor-pointer  flex items-center justify-between  dark:group-hover/list:text-teal-400 group-hover/list:text-rose-400 ` : ``}`}>
                    <div className={`${response ? `` : ``}`}>
                        {item.list}
                    </div> 
                    <div className={`${response ? ``: `hidden`}`}> 
                        <FaChevronRight  />
                    </div>
                   
                </div>

                {/* side to side */}
                <div className={`${response ? 'hidden' : ' fixed left-[30%] top-14 w-[70%] h-130 pr-[10%] flex '}`}>
                    {/* category */}
                    <div className={`${response ? `` : ` w-[33.3%] `}`}>
                        category
                        <div className={`${response ? `` : `hidden group-hover/list:flex flex-col `}`}>
                            {Array.isArray(categories) && categories.map((cate) => {
                                if(cate.title == menu.title && cate.list == item.list && cate.status == 10){
                                    return(
                                        
                                        <div key = {cate.id} className="bg-[black]">{cate.category}</div>
                                    )
                                }
                                
                            })}
                        </div>
                    </div>
                    {/* product series */}
                    <div className={`${response ? `hidden` : `bg-[pink] w-[33.3%]`}`}>product</div>
                    {/* image */}
                    <div className={`${response ? `hidden` : `bg-[orange] w-[33.3%]`}`}>image</div>
                </div>
                
            </div>
            
            
    )
}
export default ListSideBar

/*
    <div
            className={`${response ? `listElement h-10`: ``}`}
        >
            {item.list}
            
        </div>

        */