import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RooState } from "../../../../store";
import { handlerExtractSliders, handlerWidthContainer, HandlerActiveButton, HandlerMouseUp, HanlderMouseMove, HandlerMouseDown,HandlerButton, clickLeft, clickRight, endTransition } from "./redux/swiperSlice";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { viewImageSliderSessionThunk } from "./redux/actionsSwiper";
import { imgURL } from "../../../../baseURL";

const SwiperSlide = ()  => {
    const dispatch =  useDispatch<AppDispatch>();
    const {extractSliders, sliders, slide, isTransition, widthContainer, isDrag, dragOffset, activeIndicator} =  useSelector((state: RooState) => state.SwiperSlide)
    const containerRef =  useRef<HTMLDivElement>(null)
    
    // navbar => change Menu item
    useEffect(() => { 
        dispatch(viewImageSliderSessionThunk());

        const timer =  setInterval(() => {
            dispatch(handlerExtractSliders());
            dispatch(HandlerActiveButton())
        }, 100);
        return () => clearInterval(timer)

    }, [])

    const getTranslateX = () => {
        const base = slide * -widthContainer
        if(isDrag){
            return base + dragOffset
        }
        return base;
    }
  
    useEffect(() => {
        const handlerResize = () => {
            if(containerRef.current){
                dispatch(handlerWidthContainer({offset: containerRef.current.offsetWidth}))
            }
        }
        handlerResize();

        window.addEventListener('resize', handlerResize)
        return () => window.removeEventListener('resize', handlerResize)
    }, [])


    useEffect(() => {
        dispatch(HandlerActiveButton())
    }, [slide])

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         dispatch(clickRight({number: 1}))
    //     }, 5000)
    //     return () => {clearInterval(timer)}
    // }, [])
    
    return(
        <div className="text-red-600  ">
            <div 
                className={`w-full h-[600px]   border-white flex justify-center items-center relative ${isDrag ? 'active:cursor-grabbing': ''}`}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(HanlderMouseMove({client: e.clientX}))}}
                onMouseUp={() => {dispatch(HandlerMouseUp())}}
                onMouseLeave={() => {if(isDrag){dispatch(HandlerMouseUp())}}}

                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(HanlderMouseMove({client: e.touches[0].clientX}))}}
                onTouchEnd={() => {if(isDrag){dispatch(HandlerMouseUp())}}}
            >
                <div 
                    className="w-[100%] h-[100%] overflow-x-hidden  select-none touch-pan-y" 
                >   
                    <div 
                        ref = {containerRef}
                      
                        onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(HandlerMouseDown({client: e.clientX}))}}
                        onTouchStart={(e: React.TouchEvent<HTMLDivElement> ) => {dispatch(HandlerMouseDown({client: e.touches[0].clientX}))}}
                        className="flex flex-col flex-wrap w-full h-full  cursor-grab active:cursor-grabbing"
                        style={{  
                            transform: `translateX(${getTranslateX()}px)`,
                            transition: isTransition ? `transform 500ms cubic-bezier(0.25, 1, 0.5, 1)` : 'none'
                        }}
                        onTransitionEnd={() => {dispatch(endTransition())}}
                        // onTransitionStart={}
                    >
                        {Array.isArray(extractSliders) && extractSliders?.map((item, ind) => {
                            const isActive =  ind === slide
                            return (
                                <div 
                                    key = {ind}
                                    // style={{ border: `1px solid blue` }}
                         
                                    className={`w-[100%]  h-full flex justify-center items-center text-5xl duration-700  rounded-4xl
                                        ${isActive ? 'scale-100 opacity-100': "scale-75 opacity-50"}    
                                    `}
                                >
                                    <img draggable = {false} src={imgURL + item.image} className="w-full h-full" alt="" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* button right */}
                <button 
                    className="absolute right-1"
                    onClick={() => {dispatch(clickRight({number: 1}))}}
                >
                    <FaAngleDoubleRight />
                </button>

                {/* button left */}
                <button 
                    className="absolute left-1"
                    onClick={() => {dispatch(clickLeft({number: 1}))}}
                >
                    <FaAngleDoubleLeft />
                </button>

                {/* button */}
                <div className="absolute flex gap-2 bottom-6">
                    {Array.isArray(sliders) && sliders.map((_, index) => {
                        return(
                            <div
                                key={index} 
                                onClick={() => {dispatch(HandlerButton({index: index + 2}))}}
                                className={`w-3 h-3 rounded-full hover:cursor-poiner hover:scale-150 duration-200 cursor-pointer
                                 ${activeIndicator === index ? `scale-200 ` : "scale-100"}`
                                
                                }
                                style={{
                                    border: `1px solid ${_}`,
                                    backgroundColor: activeIndicator === index ? 'red' : 'white'
                                }}
                            ></div>
                        )
                    })}
                </div>
            </div>         
        </div>
    )
}

export default SwiperSlide;