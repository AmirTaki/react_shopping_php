import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaAngleDoubleRight } from "react-icons/fa";
import type { RooState, AppDispatch } from "../../../../store";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { transitionEnd, rightClick, leftClick, handlerWidthContainer, gridDown, gridMove, gridUp, handlerButtons, handlerChangeButton } from "./redux/gridSliderSlice"

const GridSwiper = () => {
    const dispatch = useDispatch<AppDispatch>()


    // grid swiper 
    const {items, slide, isTransition, widthContainer, isDrag, dragOffset, buttons, sizeItmes, } =  useSelector((state: RooState) => state.gridSlider)
    const containerRef =  useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handlerResize = () => {
            if(containerRef.current){
                dispatch(handlerWidthContainer({offset: containerRef.current.offsetWidth}))
            }  
        }
        handlerResize()
        window.addEventListener('resize', handlerResize);
        return () => window.removeEventListener('resize', handlerResize)
    }, [])

    useEffect(() => {
        dispatch(handlerButtons())
        dispatch(rightClick({distance: 0}))
    }, [widthContainer])

    const getTranslateX = () => {
        const base = slide * 100
        if(isDrag){
            const drag = (dragOffset / widthContainer) * 100
            return base - drag
        }
        return base;
    }

   
    return(
        <div className="text-sky-400 w-full h-[510px]  flex justify-center items-center relative">

            {/* container */}
            <div className="w-[95%] h-[95%]  flex flex-col items-center  overflow-hidden relative">
                {/* container */}
                <div 
                    ref = {containerRef}
                    className="w-full h-full   flex flex-col justify-center items-center flex-wrap cursor-grab active:cursor-grabbing select-none touch-pan-x"
                    style={{
                        transform: `translateX(-${getTranslateX()}%)`,
                        transition: isTransition ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                    onTransitionEnd={() => {dispatch(transitionEnd())}} 
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(gridDown({client: e.clientX}))}}
                    onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(gridMove({client: e.clientX}))}}
                    onMouseUp={() => {dispatch(gridUp())}}
                    onMouseLeave={() => {if(isDrag) {dispatch(gridUp())}}}

                    onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(gridDown({client: e.touches[0].clientX}))}}
                    onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(gridMove({client: e.touches[0].clientX}))}}
                    onTouchEnd={() => {dispatch(gridUp())}}
                >
                    {/* items */}
                    {items.map((item, index) => {
                            return(
                                <div key = {index} 
                                    className={`shrink-0 w-[98%] md:w-[48%]! lg:w-[31.3%]! mx-[1%] h-[90%] text-4xl flex justify-center items-center`}
                                    style={{
                                        border: `1px solid ${item}`,
                                    }}    
                                >
                                    {index}
                                </div>
                            )
                        })}
                </div>           
            </div>

            {/* button right */}
            <button 
                onClick={() => {dispatch(rightClick({distance: 1 }))}}
                className={`absolute right-0 top-60 ${slide + 1 >= sizeItmes  ? 'hidden' : 'flex'}`}
            >
                <FaAngleDoubleRight />
            </button>

            {/* button left */}
            <button 
                onClick={() => {dispatch(leftClick({distance: 1}))}}
                className={`absolute left-0 top-60 ${slide <= 0 ? 'hidden': 'flex'}`}
            >
                <FaAngleDoubleLeft />
            </button>

            {/* button */}
            <div className="flex  absolute bottom-3  gap-3">
                {buttons.map((_, index) => {
                    return(
                        
                        <div 
                            onClick={() => {dispatch(handlerChangeButton({index: index}))}}
                            key = {index} 
                            className= {`w-2 h-2 bg-[silver] rounded-full cursor-pointer duration-300 hover:scale-200 ${index === slide ? 'w-10 bg-sky-400 hover:scale-100!' : ''}`}
                        ></div>
                    )
                })}
            </div>

        </div>
    )
}

export default GridSwiper