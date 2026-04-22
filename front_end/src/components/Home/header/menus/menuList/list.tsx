import { useSelector } from "react-redux"
import type { TListMenusHeaderObject } from "./redux/sliceMenuList"
import type { RooState, AppDispatch } from "../../../../../store"
import { FaChevronRight } from "react-icons/fa6";

const ListSideBar = ({item, }: {item: TListMenusHeaderObject }) => {
    const {response} = useSelector((state: RooState) => state.response) // respone ? mobile : desktop

    return(
       

            <div className={`${response ? ` listElement group/list ` : `w-[30%] bg-[blue]   `}`}>
                <div className={`${response ? `h-10 text-sm! mx-10 cursor-pointer  flex items-center justify-between  dark:group-hover/list:text-teal-400 group-hover/list:text-rose-400 ` : ``}`}>
                    <div className={`${response ? `` : ``}`}>
                        {item.list}
                    </div> 
                    <div className={`${response ? ``: `hidden`}`}> 
                        <FaChevronRight  />
                    </div>
                   
                </div>

                {/* side to side */}
                <div className={`${response ? 'hidden' : 'bg-[green] fixed left-[30%] top-14 w-[70%] h-130 pr-[10%] flex '}`}>
                    <div className={`${response ? `hidden` : `bg-[red] w-[33.3%]`}`}>category</div>
                    <div className={`${response ? `hidden` : `bg-[pink] w-[33.3%]`}`}>product</div>
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