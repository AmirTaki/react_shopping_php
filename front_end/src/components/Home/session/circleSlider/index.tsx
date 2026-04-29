import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handlerConter, circleDown, circleMove, circleUp } from "./redux/circleSlice"
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import type { RooState, AppDispatch } from "../../../../store";
import { readingAllItemsCircleSliderSessionThunk } from "./redux/actionsCircle";
import { imgURL } from "../../../../baseURL";

const CircleSlider = () => {
    const dispatch =  useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(readingAllItemsCircleSliderSessionThunk())
    }, [])
    
    const {items, conter, isDrag, dragOffset} = useSelector((state: RooState) => state.circle)
    const rotate = (item: number) => {
        if(Array.isArray(items)){
            if(isDrag){
                return (item * 360 /(items.length)) + dragOffset
            }
            return item * 360 /(items.length) 
        }
        
    }

    const translateZ = () => {
        if(Array.isArray(items)){
            return items.length * 30
        }
        
    }
    // circle swiper 
    return(
        <div className="text-rose-400 my-5 min-w-full ">
            <div className={`w-full h-[700px]  flex justify-center items-center relative overflow-hidden  ${isDrag && 'active:cursor-grabbing'}`}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(circleMove({client: e.clientX}))}}
                onMouseUp={() => {dispatch(circleUp())}}
                onMouseLeave={() => {if(isDrag) {dispatch(circleUp())}}}
            
                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(circleMove({client: e.touches[0].clientX}))}}
                onTouchEnd={() => {dispatch(circleUp())}}
            >
                
                <div className="w-[60%] h-[90%]  flex justify-center items-center cursor-grab active:cursor-grabbing "
                    onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(circleDown({client: e.clientX}))}}
                    onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(circleDown({client: e.touches[0].clientX}))}}
                >
                    {/* container */}
                    {/* rotate3D */}
                    <div 
                        className="w-[150px] h-[200px]  relative transform-3d perspective-[1000px]  select-none"
                    >
                        {Array.isArray(items) && items.map((item, index) => {
                            return(
                                <div 
                                    key = {item.id} 
                                    style={{
                                        // border: `1px solid blue`,
                                        backgroundColor : "#242424",
                                        transform: `rotateY(${rotate(index + conter)}deg) translateZ(${translateZ()}px)`
                                    }}
                                    className="w-full h-full absolute left-0 top-0 transform-3d duration-1000 rounded-2xl flex justify-center items-center select-none overflow-hidden select-none"
                                
                                >
                                    <img src={imgURL + item.image} draggable  = {false} alt="" className="w-full h-full" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* button left */}
                <button 
                    className="absolute left-20"
                    onClick={() => {dispatch(handlerConter({number: 1}))}}
                >
                    <FaAngleDoubleLeft />
                </button>

                {/* button right */}
                <button 
                    className="absolute right-20"
                    onClick={() => {dispatch(handlerConter({number: -1}))}}

                >
                    <FaAngleDoubleRight />
                </button>
            </div>
        </div>
    )
}

export default CircleSlider