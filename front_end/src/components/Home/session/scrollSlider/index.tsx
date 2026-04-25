import { useEffect, useReducer, useRef,  } from "react"
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import RedcuerPayloar, { initialPayloar } from "./redux/reducerPlayoar";

const PayloarSlider = () => {
  
    // source code
    const containerRef = useRef<HTMLDivElement>(null)

    const [state, dispatchReducer] =  useReducer (RedcuerPayloar, initialPayloar)

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
        <div className="text-rose-400 w-[95%] mx-auto h-[500px] border-0 flex justify-center items-center relative ">
            {/* container */}
            <div 
                ref = {containerRef}
                className="w-full h-[70%] flex flex-col flex-wrap overflow-x-scroll justify-center items-center select-none scrollImage cursor-grab active:cursor-grabbing"
                onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatchReducer({type :'mouseDown', payload : {client: e.clientX, container: containerRef?.current}})}}   
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatchReducer({type: 'mouseMove', payload: {client: e.clientX, container: containerRef?.current}})}}
                onMouseUp={() => {dispatchReducer({type: 'mouseUp', payload: {container: containerRef.current}})}}
                onMouseLeave={() => {if(state.isDrag){dispatchReducer({type: 'mouseUp', payload: {container: containerRef.current}})}}}

                onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {dispatchReducer({type :'mouseDown', payload : {client: e.touches[0].clientX, container: containerRef?.current}})}}
                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {dispatchReducer({type :'mouseMove', payload : {client: e.touches[0].clientX, container: containerRef?.current}})}}
                onTouchEnd={() => {dispatchReducer({type: 'mouseUp', payload: {container: containerRef.current}})}}
            >
                {/* item */}
                {state.items.map((item, index) => {
                    return(
                        <div 
                            key = {index}
                            className="w-[300px] mx-[10px] h-[70%] text-4xl flex justify-center items-center rounded-2xl"
                            style={{border: `1px solid ${item}`}}
                        >{index}</div>
                    )
                })}
            </div>

            {/* button */}
            <button 

                onClick={() => {dispatchReducer({type : "right", payload: {container: containerRef?.current}})}}
                className={`absolute -right-4  ${state.scroll >= state.sizeItems - (state.widthContainer + 10)  ? 'hidden' : 'flex'}`}
            >
                <FaAngleDoubleRight />
            </button>

            <button 
                onClick={() => {dispatchReducer({type : "left", payload: {container: containerRef?.current}})}}
                className={`absolute -left-4   ${state.scroll <= 0 ? 'hidden' : 'flex'}`}
            >
                <FaAngleDoubleLeft />
            </button>
        </div>
    )
}

export default PayloarSlider