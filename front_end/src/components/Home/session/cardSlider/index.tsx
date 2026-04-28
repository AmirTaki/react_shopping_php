import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RooState, AppDispatch } from "../../../../store";
import { buttonCircle, handlerActiveButton, handlerDownSlide, handlerExtractSliders, handlerMoveSlide, handlerUpSlide, handlerWidthContainer, nextSlide, prevSlide, transitionEnd } from "./redux/cardSlice";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

const CardSlider = () => {
    const dispatch = useDispatch<AppDispatch>()
  
    // swiper => imageSlider
    const {sliders, extractSliders, slide, isTransition, widthContiner, isDrag, dragOffset, activeIndicatore} = useSelector((state: RooState) => state.card)
    const containerRef =  useRef<HTMLDivElement>(null)
 
    useEffect(() => {
        dispatch(handlerExtractSliders())
    }, [])
 
    useEffect(() => {
        const handlerResize = () => {
            if(containerRef.current){
                dispatch(handlerWidthContainer({offsetWidth: containerRef.current.offsetWidth}))
            }
        }
        handlerResize()
        window.addEventListener('resize', handlerResize)
        return() => {window.removeEventListener('resize', handlerResize)}
    }, [])


    const getTranslateX = () => {
        const base =  -slide * widthContiner
        if(isDrag){
            return base + dragOffset
        }
        return base
    }

    useEffect(() => {
        dispatch(handlerActiveButton())
    }, [slide, ])

    return(
        <div className="text-sky-400 relative flex flex-col items-center">

            <div 
                className={`w-full h-[700px]  flex justify-center items-center ${isDrag && 'active:cursor-grabbing '}`}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(handlerMoveSlide({client: e.clientX}))}}
                onMouseUp={() => {dispatch(handlerUpSlide())}}
                onMouseLeave={() => {if(isDrag){dispatch(handlerUpSlide())}}}

                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(handlerMoveSlide({client: e.touches[0].clientX}))}}
                onTouchEnd={() => {dispatch(handlerUpSlide())}}
            >
                
                {/* button left */}
                <button className="m-3" onClick={() => {dispatch(prevSlide({index: 1}))}}>
                    <FaAngleDoubleLeft />
                </button>

                {/* container */}
                <div 
                    ref = {containerRef}
                    className="w-[430px] h-[490px] flex flex-col flex-wrap justify-center  overflow-hidden cursor-grab active:cursor-grabbing"
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(handlerDownSlide({client: e.clientX}))}}
                    onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(handlerDownSlide({client: e.touches[0].clientX}))}}
                >

                    {/* item */}
                    {extractSliders.map((img, index) => {
                        const isActive = index == slide
                        return(
                            <div 
                                key = {index}
                                style={{
                                   
                                    transform : `translateX(${getTranslateX()}px)`,
                                    transition: isTransition ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                                }}
                                className={`
                                    border-2 w-[95%] mx-[2.5%] h-[95%] flex justify-center items-center text-6xl rounded-4xl overflow-hidden
                                 
                                `}
                                onTransitionEnd={() => {dispatch(transitionEnd())}}
                            >
                                <img draggable = {false} src={img} 
                                    className={`  `} 
                                    alt="" 
                                />
                            </div>
                        )
                    })}
                </div>

                {/* button left */}
                <button className="m-3" onClick={() => {dispatch(nextSlide({index: 1}))}}>
                    <FaAngleDoubleRight />
                </button>
            </div>
            {/* button circle */}
            <div className="flex gap-4 -mt-10">
                {sliders.map((_, index) => {
                    return(
                        <div 
                            style={{backgroundColor: activeIndicatore == index ? 'blue': ""}}
                            className={`w-4 h-4 rounded-full border border-white cursor-pointer duration-200
                                ${activeIndicatore == index ? 'scale-200 ' : 'scale-100'}    
                            `} 
                            key = {index}
                            onClick={() => {dispatch(buttonCircle({index: index + 2}))}}
                        >
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default CardSlider;