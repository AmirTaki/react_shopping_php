import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RooState, AppDispatch } from "../../../../store";
import { rightClick, endTranistion, leftClick, handlerWidthContainer,  payloarDown, payloarMove, payloarUp, handlerSizeContainer, handlerContainerScroll, sizeThumbe
,scrollStart, scrollMove, scrollUp, handlerTranslateThumble, 
} from "./redux/resourceSlice"

import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";

const ResourceImage = () => {
    const disptach =  useDispatch<AppDispatch>()    
    const {items, translateX, isTransition, isDrag, dragOffset, sizeContainer, widthContainer, sizeThumble, isScroll, dragScroll, widthScroll, translateThumble} =  useSelector((state: RooState) => state.resourceImage)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    const getTranslateX = () => {
        const base = translateX 
        if(isDrag){
            const drag =  base - dragOffset > sizeContainer ? sizeContainer : base - dragOffset
            return drag
        }
        if(isScroll){
            const scrollDrag = dragScroll * (((items.length * 350) + (items.length * 20)) / widthContainer)
            const drag = base + scrollDrag > sizeContainer ? sizeContainer  : base + scrollDrag
            return drag
        } 
        return base
    }
   
    const moveThumble = () => {
        const translate = getTranslateX() 
        if(translate < 0){return 0}
        return  ((widthScroll - sizeThumble) / (sizeContainer / translate)) 
    }

    useEffect(() => {
        disptach(handlerTranslateThumble({thumble: moveThumble() ? moveThumble() : 0}))
    }, [translateX])


    const clickScroll = (client: number) => {
        if(client  > (translateThumble + sizeThumble )   ){
            disptach(rightClick({distance: sizeThumble}))
        }
        else if (client < (translateThumble + sizeThumble )  ) {
          disptach(leftClick({distance: sizeThumble}))
        }
    }

    useEffect(() => {
        const handlerResize = () => {
            
            if(containerRef.current){
                disptach(handlerWidthContainer({offset: containerRef.current.offsetWidth}));
            }
            
            if(scrollRef.current){
                disptach(handlerContainerScroll({offset: scrollRef.current.offsetWidth}))
            }  
           
            disptach(handlerSizeContainer())
            disptach(sizeThumbe())
           
        }
        handlerResize()
        window.addEventListener('resize', handlerResize);
        return () => window.removeEventListener('resize', handlerResize) 
    }, [])


    useEffect(() => {
        disptach(rightClick({distance: 0}))
    }, [widthContainer])


    return( 
        <div className="text-sky-400">
                <div className={`w-[95%] mx-auto h-100 flex justify-center items-center  relative ${isScroll && 'active:cursor-pointer'}`}
                
                    onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {disptach(scrollMove({client: e.clientX}))}}
                    onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {disptach(scrollMove({client: e.touches[0].clientX}))}}
                
                    onMouseUp={() => {disptach(scrollUp())}}
                    onMouseLeave={() => {if(isScroll){disptach(scrollUp())}}}
                    onTouchEnd={() => {disptach(scrollUp())}}
                >
                    {/* container */}
                    <div  
                        ref = {containerRef}
                        style={{width: (items.length * 350 ) + (items.length * 20)}}
                        className=" h-[300px] flex flex-col flex-wrap justify-center items-center overflow-hidden select-none cursor-grab active:cursor-grabbing "
                        onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {disptach(payloarDown({client: e.clientX}))}}
                        onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {disptach(payloarMove({client: e.clientX}))}}
                        onMouseUp={() => {disptach(payloarUp())}}
                        onMouseLeave={() => {if(isDrag){disptach(payloarUp())}}}

                        onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {disptach(payloarDown({client: e.touches[0].clientX}))}}
                        onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {disptach(payloarMove({client: e.touches[0].clientX}))}}
                        onTouchEnd={() => {disptach(payloarUp())}}
                    >
                        {/* item */}
                        {items.map((item, index) => {
                            return (
                                <div 
                                    key = {index}
                                    className="w-[350px] h-[200px] mx-[10px] shrink-0 flex justify-center items-center text-4xl "
                                    style={{
                                        border: `1px solid ${item}`,
                                        transform: `translateX(-${getTranslateX()}px)`,
                                        transition: isTransition ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                                    }}  
                                    onTransitionEnd={() => {disptach(endTranistion())}}
                                >
                                    {index}
                                </div>
                            )
                        })}
                    </div>

                    {/* button*/}
                    <button 
                        onClick={() => {disptach(rightClick({distance: 320}))}}
                        className={`absolute right-0 ${translateX !== 0 && translateX ===  sizeContainer ? 'hidden': 'flex'}`}
                    >
                        <FaAngleDoubleRight />
                    </button>
                    <button 
                        onClick={() => {disptach(leftClick({distance: 320}))}}
                        className={` absolute left-0 ${translateX > 0 ? 'flex'  : 'hidden'}`}
                    >
                        <FaAngleDoubleLeft />
                    </button>
              
                    <div className="w-[98%]  mx-auto  absolute -bottom-2 h-24 bg-transparent flex items-center hidden ">
                        <div 
                            onClick={(e) => {clickScroll(e.clientX)}}
                            ref = {scrollRef}
                            className=" bg-[silver]! rounded-2xl  w-full overflow-hidden cursor-grab  active:cursor-grabbing z-10!"    
                        >
                            <div 
                                onMouseDown={(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {disptach(scrollStart({client: e.clientX}))}}  
                                onTouchStart={(e:React.TouchEvent<HTMLDivElement>) => {disptach(scrollStart(e.touches[0].clientX))}}              
                                className={`h-[7px] bg-rose-500 rounded-2xl active:bg-rose-900 cursor-pointer active:cursor-pointer   duration-200  select-none z-30! `}
                                style={{
                                    // width : `${(100 / sizeThumble)}%`,
                                    width : `${(sizeThumble)}px`,
                                    transform: `translateX(${( moveThumble())}px)`,
                                    transition: isTransition ? `transform 500ms cubic-bezier(0.25, 1, 0.5, 1)` : 'none'                        
                                }}
                            ></div>
                        </div>
                    </div>    
                </div>
            </div>
      
    )
}
export default ResourceImage