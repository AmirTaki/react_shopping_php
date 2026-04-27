import {  useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import type { RooState, AppDispatch } from "../../../../store";
import { handlerButtons, handlerScrollTo } from "./redux/advertSlice";
import { readingAllItemsImageAdvertSessionThunk } from "./redux/actionAdvert";
import { imgURL } from "../../../../baseURL";

const ImageAdvert = () => {
    const dispatch =  useDispatch<AppDispatch>()
    

    // source code scroll slider
    const {items, counter  } =  useSelector((state: RooState) => state.advert)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDrag, setIsDrag] = useState<boolean>(false)
    const startX =  useRef<number>(0)
    const startScrollLeft =  useRef<number>(0)
    const currentX = useRef<number>(0)

    useEffect(() => {
        dispatch(readingAllItemsImageAdvertSessionThunk())
    }, [])



    useEffect(() => {
        const resize = () => {
            if(containerRef.current){
                containerRef.current.scrollLeft = counter * containerRef.current.offsetWidth
            }
        }
        resize()
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize)
    })

    const handlerDown = (client: number) => {
        setIsDrag(true)
        if(containerRef.current){
            containerRef.current.style.scrollBehavior = 'auto'
            startX.current = client;
            startScrollLeft.current = containerRef.current?.scrollLeft
        }
    }

    const handlerMove = (client: number) => {
        if(!isDrag) return;
        currentX.current = client - startX.current
        if(containerRef.current){
            containerRef.current.scrollLeft = startScrollLeft.current - currentX.current
        }
    }

    const handlerUp = () => {
        if(!isDrag) return;

        if(containerRef.current){
            setIsDrag(false)
            containerRef.current.style.scrollBehavior = 'smooth'
            const diff = containerRef.current.scrollLeft - startScrollLeft.current

            if(diff > 100){
             
              dispatch(handlerScrollTo({index: counter + 1}))
            }
            else if (diff < -100){
                dispatch(handlerScrollTo({index: counter - 1}))   
            }
            else {
                dispatch(handlerScrollTo({index: counter}))   
            }
            currentX.current = 0
        }
    }

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.style.scrollBehavior = 'smooth'
            containerRef.current.scrollLeft = counter * containerRef.current.offsetWidth
        }
    }, [counter])



    return(
        <div className="text-rose-400  w-full h-[600px]  flex justify-center items-center relative">
            {/* container */}
            <div 
                ref = {containerRef}
                className="w-full h-[90%]  flex justify-center items-center flex-col flex-wrap overflow-hidden select-none touch-pan-x cursor-grab active:cursor-grabbing"
                onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {handlerDown(e.clientX)}}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {handlerMove(e.clientX)}}
                onMouseUp = {() => {handlerUp()}}
                onMouseLeave={() => {if(isDrag) {handlerUp()}}}

                onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {handlerDown(e.touches[0].clientX)}}
                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {handlerMove(e.touches[0].clientX)}}
                onTouchEnd={() => {handlerUp()}}
            >
                {/* items */}
                {Array.isArray(items) && items.map((item, index) => {
                    const isActive = index === counter
                    return(
                        <div 
                            key = {index}
                            className={`w-[95%] h-[95%] mx-[2.5%] flex justify-center items-center text-5xl rounded-xl duration-1000 overflow-hidden
                                ${isActive ? "opacity-100 scale-100" : 'opacity-70 scale-75'}    
                            `}
                            // style={{border: `1px solid blue`}}
                        >
                            <img src={imgURL + item.image} draggable = {false} className="w-full h-full" alt="" />
                        </div>
                    )
                })}
            </div>

            {/* button */}
            <button 
                className={`absolute right-0 ${counter + 1 > (Array.isArray(items) ? items.length - 1 : 1) ? 'hidden': 'flex'}`}
                onClick={() => {dispatch(handlerScrollTo({index: counter + 1}))}}
            >
              <FaAngleDoubleRight />
            </button>
            
            <button 
                className={`absolute left-0 ${counter - 1 < 0 ? 'hidden': 'flex'}`}
                onClick={() => {dispatch(handlerScrollTo({index: counter - 1}))}}    
            >
              <FaAngleDoubleLeft />
            </button>

            <div className="flex  absolute bottom-3 gap-3">
                {Array.isArray(items) && items.map((_, index) => {
                    return(
                        <div  
                            key = {index}
                            onClick={() => {dispatch(handlerButtons({index: index}))}}
                            style={{
                                border: `1px solid silver`,
                                background: index === counter ? 'silver' : ''
                            }}
                            className={`
                                w-3 h-3 duration-200 rounded-full hover:cursor-pointer hover:scale-200
                                ${index === counter ? "w-14 hover:scale-100!" : ""}    
                            `} 
                        ></div>
                    )
                })}
            </div>
        </div>
    )
}
export default ImageAdvert;