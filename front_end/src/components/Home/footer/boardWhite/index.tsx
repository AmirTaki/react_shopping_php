import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RooState } from "../../../../store";
import { useEffect, useReducer, useRef } from "react";
import { initialBaord, reducerBoard } from "./redux/reducerBoard";
import { FaCaretDown } from "react-icons/fa";

const BoardWhite = () => {
    const {response} =  useSelector((state: RooState) => state.response)
    const dispath = useDispatch<AppDispatch>()

    
    const [state, dispatchReducer] =  useReducer(reducerBoard, initialBaord)
    const menusRef =  useRef<Array<HTMLDivElement>>([])
   
    useEffect(() => {

        // dispatch(viewMenusColumnSessionThunk())
        // dispatch(viewItemColumnSectionThunk())
        
        const handlerResize = () => {
            dispatchReducer({type: 'closeAll'})
        }
        handlerResize()
        window.addEventListener('resize', handlerResize)
        return () => window.removeEventListener('resize', handlerResize)
    }, [])

    const findHightDynamic = (index: number) => {
        const menus =  menusRef.current[index]
        if(menus){
           const lists =   menus.querySelectorAll('.listsColumns')
           return lists.length * 48
        }
    }
    
    const handlerMenusRows = (index: number) => {
        if(state.columnsRows[index]){
            dispatchReducer({type: 'openClose', payload: {id: index}})
           
        }
        else {
            dispatchReducer({type: 'closeAll'}),
            dispatchReducer({type: 'openClose', payload: {id: index}})
        }
    }

    return(
          <div className={`${response ?
            'w-[90%] h-full mx-auto flex-col justify-around py-5 mt-10 bg-red-500' : 
            `w-[90%] h-[600px]  duration-500  justify-around mt-110  gap-10 bg-blue-500 dark:border-[gray]! mt-13`}
            overflow-hidden  mx-auto  flex 
            `}>
            {/* {Array.isArray(menus) && menus?.map((menu, index) => {
                if(menu.status == 10){
                return(
                    <div ref = {(x: HTMLDivElement) => {menusRef.current[index] = x}} key = {menu.id} className={`flex flex-col ${response ? '' : 'gap-3'}`}>
                        <div 
                            onClick={(e) => {response ? `${e.stopPropagation(), handlerMenusRows(index)}  ` : ''}}
                            className={`${response ? 
                                'flex w-[90%] mx-auto  justify-between px-2 h-15 items-end py-1 border-b-[1px] dark:border-[gray]!   cursor-pointer '
                                :
                                'text-[19px]'}
                            `}    
                        >                        
                            <div className=" ">{menu.title}</div>
                            <div className={`${response ? `${state.columnsRows[index] ? "rotate-180" : ""} duration-300` :'hidden'}`}> 
                                <FaCaretDown />
                            </div>
                        </div>

                        <div 
                            style={{height : `${response ? `${state.columnsRows[index]  ? `${findHightDynamic(index)}px` : '0'}` : ''}`}}
                            className={`${response ? `overflow-hidden duration-500! `  : 'px-2 '}  flex flex-col `}
                            >
                            {Array.isArray(items) && items?.map((item) => {
                                if (item.status == 10 && item.title == menu.title){
                                    return(
                                        <div key = {item.id} className={`${response ? 'listsColumns h-30 px-13 py-3  ' : '-mx-1 py-2 '}`}>
                                            <div className={`${response ? ' w-full' : ""}
                                            `}>
                                                <div className=" w-fit cursor-pointer hover:underline duration-200 dark:hover:text-[silver]! hover:text-gray-900! text-gray-600! dark:text-gray-300!">
                                                    {item.item}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>

                        
                    </div>
                )
            }})} */}
        </div>
    )
}
export default BoardWhite;