import { useDispatch, useSelector } from "react-redux";
import type { RooState, AppDispatch } from "../../../../store";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { extract, handlerScrollTo, handlerActiveIndicatore, handlerScrollEnd } from "./redux/imageSliderSlice";
import { readingAllItemsImageSliderLoopSessionThunk } from "./redux/actionsImageSlider";
import { imgURL } from "../../../../baseURL";

const ImageSliderLoop = () => {
    const dispatch  = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(readingAllItemsImageSliderLoopSessionThunk())
        dispatch(handlerScrollTo({number: 2, smooth: true}))
    }, [])

    // source code 
    const {items,extra ,counter, smooth, activeIndicatore} =  useSelector((state: RooState) => state.imageSlider)

    const containerRef =  useRef<HTMLDivElement>(null)
    const [isDrag, setIsDrag] = useState<boolean>(false)
    const startX = useRef<number>(0)
    const startScrollLeft = useRef<number>(0)
    const currentX = useRef<number>(0)

    useEffect(() => {
        const handlerResize = () => {
            if(containerRef.current){
                containerRef.current.style.scrollBehavior =  smooth ? 'smooth' : 'auto'
                containerRef.current.scrollLeft = counter * containerRef.current.offsetWidth 
                dispatch(handlerActiveIndicatore())
                dispatch(handlerScrollEnd())
            }
        }
        handlerResize();

        window.addEventListener('resize', handlerResize)
        return () => window.removeEventListener('resize', handlerResize)
    }, [counter])
    
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(extract())
        }, 30)
        return () => clearInterval (timer)
    }, [])


    const scrollDown = (client: number) => {
        setIsDrag(true)
        startX.current = client
        if(containerRef.current){
            containerRef.current.style.scrollBehavior = 'auto'
            startScrollLeft.current = containerRef.current.scrollLeft
        }
    }
    const scrollMove = (client: number) => {
        if(!isDrag) return;
        currentX.current = client - startX.current
        if(containerRef.current){
            containerRef.current.scrollLeft = startScrollLeft.current - currentX.current
        }
    }
    const scrollUp = () => {
        if(!isDrag) return;

        if(containerRef.current){
            setIsDrag(false)
            containerRef.current.style.scrollBehavior = 'smooth'
            const diff = containerRef.current.scrollLeft - startScrollLeft.current
           
           const scale = containerRef.current.offsetWidth * .1
            if(diff > scale ){
                dispatch(handlerScrollTo({number: counter + 1, smooth: true}))
            }
            
            else if (diff < -scale ){
                dispatch(handlerScrollTo({number: counter - 1, smooth: true}))}
            
            else {
                dispatch(handlerScrollTo({number: counter, smooth: true}))
            }
            currentX.current = 0
        }
    }


    return(
        <div className="text-sky-400 w-full h-[600px]  flex items-center justify-center relative">
            {/* container */}
            <div 
                ref = {containerRef}
                className="w-[100%] h-[90%] flex flex-col justify-center items-center flex-wrap overflow-x-hidden relative select-none cursor-grab active:cursor-grabbing"
                onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {scrollDown(e.clientX)}}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {scrollMove(e.clientX)}}
                onMouseUp={() => {scrollUp()}}
                onMouseLeave={() => {if(isDrag){scrollUp()}}}

                onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {scrollDown(e.touches[0].clientX)}}
                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {scrollMove(e.touches[0].clientX)}}
                onTouchEnd={() => {scrollUp()}}
            >
                {/* items     ${isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-70'}*/}
                {Array.isArray(extra) && extra.map((item, index) => {
                    const isActive = index === counter
                    return(
                        <div 
                            key = {index} 
                            className={`w-full h-[90%]   flex justify-center items-center text-4xl duration-500 select-none
                               `}
                            style={{
                            }}
                        >
                            <img src={imgURL + item.image} draggable = {false} className="w-full h-full" alt="" />
                        </div>
                    )
                })}
            </div>

            {/* button */}
            <button 
                onClick={() => {dispatch(handlerScrollTo({number: counter + 1, smooth: true})); }}
                className="absolute right-0"
            >
                <FaAngleDoubleRight />
            </button>
            <button 
                onClick={() => {dispatch(handlerScrollTo({number: counter - 1, smooth: true})); }}
                className="absolute left-0"
                >
                <FaAngleDoubleLeft />
            </button>

            <div className="absolute flex gap-2 bottom-4">
                {Array.isArray(items) && items.map((_, index) => {
                    return(
                        <div  
                            key = {index}
                            onClick={() => (dispatch(handlerScrollTo({number: index + 2 , smooth: true})))}
                            style={{
                                border: `1px solid ${_}`,
                                // background: index  === activeIndicatore  ? _ : ''
                            }}
                            className={`
                                w-3 h-3 duration-200 rounded-full hover:cursor-pointer hover:scale-200
                                ${index  === activeIndicatore   ? "w-14 hover:scale-100!" : ""}    
                            `} 
                        ></div>
                    )
                })}
            </div>
        </div>
    )
}

export default ImageSliderLoop;