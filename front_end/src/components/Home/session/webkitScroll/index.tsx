import { useEffect, useReducer, useRef,  } from "react"
import { useDispatch,  } from "react-redux"
import type { AppDispatch, RooState } from "../../../../store";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import RedcuerWibkit, { initialWibkit } from "./redux/reducerWibkit";
import { baseURL, imgURL } from "../../../../baseURL";

const WibkitScroll = () => {
    const disptach = useDispatch<AppDispatch>()
    
    // source code
    const containerRef = useRef<HTMLDivElement>(null)

    const [state, dispatchReducer] =  useReducer (RedcuerWibkit, initialWibkit)

    const getRequestApi = async () => {
        try{
            const response = await fetch (baseURL + "tables/session/webkitScroll/webkit.php", {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            dispatchReducer({type: 'RequestAPI', payload: {items: data}})
        }
        catch(err){
            console.error('message: ', err)
        }
    }

    useEffect(() => {
        getRequestApi()
        const timer =  setInterval(() => {
            dispatchReducer({type: 'sizeHandler'})
        }, 40)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const resize = () => {
            if(containerRef.current){
                dispatchReducer({type : 'widthContainer', payload: {offset: containerRef.current.offsetWidth} })
            }
            dispatchReducer({type: 'sizeHandler'})
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize' ,resize)
    }, [])



    useEffect(() => {
        const handlerScroll = () => {
            if(containerRef.current){
                dispatchReducer({type: 'handlerScroll', payload: {offset: containerRef.current?.scrollLeft}})
            }
        }
        handlerScroll() 
        window.addEventListener('wheel', handlerScroll)
        return () => window.removeEventListener('wheel', handlerScroll)

    }, [containerRef?.current?.scrollLeft])


    return(
        <div className="text-rose-400 w-[95%]  mx-auto h-[330px] border-0 flex justify-center items-center relative  ">
            {/* container */}
            <div 
                ref = {containerRef}
                className="w-full h-[70%] flex flex-col flex-wrap overflow-x-scroll overflow-y-hidden justify-center items-center select-none  cursor-grab active:cursor-grabbing wibkit"
                onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatchReducer({type :'mouseDown', payload : {client: e.clientX, container: containerRef?.current}})}}   
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatchReducer({type: 'mouseMove', payload: {client: e.clientX, container: containerRef?.current}})}}
                onMouseUp={() => {dispatchReducer({type: 'mouseUp', payload: {container: containerRef.current}})}}
                onMouseLeave={() => {if(state.isDrag){dispatchReducer({type: 'mouseUp', payload: {container: containerRef.current}})}}}

                onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {dispatchReducer({type :'mouseDown', payload : {client: e.touches[0].clientX, container: containerRef?.current}})}}
                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {dispatchReducer({type :'mouseMove', payload : {client: e.touches[0].clientX, container: containerRef?.current}})}}
                onTouchEnd={() => {dispatchReducer({type: 'mouseUp', payload: {container: containerRef.current}})}}
            >
                {/* item */}
                {Array.isArray(state.items) && state.items.map((item, index) => {
                    if(item.status == 10){
                        return(
                            <div 
                                key = {index}
                                className="w-[420px] mx-[10px] h-[200%] text-4xl flex justify-center items-center rounded select-none"
                            >
                                <img src={imgURL + item.image} className="w-full h-full " draggable = {false} alt="" />
                            </div>
                        )
                    }
                })}
            </div>

            {/* button */}
            <button 

                onClick={() => {dispatchReducer({type : "right", payload: {container: containerRef?.current}})}}
                className={`absolute right-0  ${state.scroll >= state.sizeItems - (state.widthContainer  + 10)  ? 'hidden' : 'flex'}`}
            >
                <FaAngleDoubleRight />
            </button>

            <button 
                onClick={() => {dispatchReducer({type : "left", payload: {container: containerRef?.current}})}}
                className={`absolute left-0   ${state.scroll <= 0 ? 'hidden' : 'flex'}`}
            >
                <FaAngleDoubleLeft />
            </button>
        </div>
    )
}

export default WibkitScroll