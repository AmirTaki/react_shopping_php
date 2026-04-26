import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaAngleDoubleRight } from "react-icons/fa";
import type { RooState, AppDispatch } from "../../../../store";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { transitionEnd, rightClick, leftClick, handlerWidthContainer, gridDown, gridMove, gridUp, handlerButtons, handlerChangeButton, handlerItemsAPI,  } from "./redux/gridSliderSlice"
import { readingAllItemsSliderPageSessionThunk } from "./redux/actionsGridSlider";
import {imgURL } from "../../../../baseURL";

const GridSwiper = () => {
    const dispatch = useDispatch<AppDispatch>()


    // grid swiper 
    const {items, slide, isTransition, widthContainer, isDrag, dragOffset, buttons, sizeItmes, } =  useSelector((state: RooState) => state.gridSlider)
    const containerRef =  useRef<HTMLDivElement>(null)


    
    useEffect(() => {
        dispatch(readingAllItemsSliderPageSessionThunk())
    }, [])
    
    useEffect(() => {
        const timer =   setInterval(() => {
            dispatch(handlerButtons())
            dispatch(rightClick({distance: 0}))
        }, 100)
        return () => clearInterval(timer)
    }, [])


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

    const [counter, setCounter] =  useState<number>(0)

    const handlerScrolTo = (counter: number) => {
        const maxIndex = Array.isArray(items) ? items.length - 1: -1
        const newIndex = Math.max(0, Math.min(counter, maxIndex))
        setCounter(newIndex)
    }
    useEffect(() => {
        if(containerRef.current){
            containerRef.current.style.scrollBehavior = 'smooth'
            containerRef.current.scrollLeft = counter * containerRef.current.offsetWidth
         
        }
    }, [counter])
   
    return(
        <div className="text-sky-400 w-[98%] h-[300px] mx-auto my-15 relative  flex justify-center items-center ">
            <div ref = {containerRef} className="w-[95%] h-[95%]  flex flex-col flex-wrap overflow-x-scroll">
                {/* item */}
                    {Array.isArray(items) && items.map((item, index) => {
                        return(
                            <div key = {item.id} 
                            className="px[1.5%] max-sm:w-[100%] max-lg:w-[50%] lg:w-[33.3%] 
                                h-[97%]  flex justify-center items-center overflow-hidden 
                              
                                " 
                            >
                                {/* {item.id} */}
                                <img src={imgURL + item.image} className="w-[98%] h-full" alt="" draggable = {false}/>
                            </div>
                        )
                    })}
            </div>
      

            <button className="absolute left-0 top-35" onClick={() => {handlerScrolTo(counter - 1)}}>
                <FaAngleDoubleLeft />
            </button>
            <button className="absolute right-0 top-35" onClick={() => {handlerScrolTo(counter + 1)}}>
                <FaAngleDoubleRight />
            </button>
        

        </div>
    )
}

export default GridSwiper