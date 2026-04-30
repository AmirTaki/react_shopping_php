import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RooState, AppDispatch } from "../../../../store";
import { clickRight, clickLeft, endTransitionEnd, downCube, moveCube, upCube} from "./redux/cubeSlice"
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";


const Cube = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {items, degree, isTransition, isDrag, dragOffset} =  useSelector((state: RooState) => state.cube)
    
    const rotateY = () => {
        if(isDrag){
            return dragOffset + degree
        }
        return degree
    }
  
    return (
        <div 
            className = {`w-full h-[500px]  border-sky-600 flex justify-center items-center my-10 `}
        
        >
            
            {/* button */}
            <button 
                onClick={() => {dispatch(clickLeft({degree: 90}))}}
                className="mx-20"
            >
                <FaAngleDoubleLeft />
            </button>
          
            <div className={`w-[38%] h-full  flex justify-center items-center ${isDrag && 'active:cursor-grabbing'}`}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(moveCube({client: e.clientX}))}}
                onMouseUp={() => {dispatch(upCube())}}
                onMouseLeave={() => {if(isDrag){dispatch(upCube())}}}

                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(moveCube({client: e.touches[0].clientX}))}}
                onTouchEnd={() => {dispatch(upCube())}}
            >
                {/* container */}
                <div  className="w-[300px] h-[300px] select-none perspective-[1000px]">

                    {/* item transition-transform duration-1000 ease-in-out */}
                    <div 
                        className="w-[300px] h-[300px] transform-3d cursor-grab active:cursor-grabbing "
                        style={{
                            transform: `rotateY(${rotateY()}deg)` ,
                            transition: isTransition ? 'transform 3000ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                        }}
                        onTransitionEnd={() => {dispatch(endTransitionEnd())}}
                        onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {dispatch(downCube({client: e.clientX}))}}
                        onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {dispatch(downCube({client: e.touches[0].clientY}))}}
                    >

                        {items.map((item) => {
                            return(
                                <div 
                                    key = {item.id} 
                                    className="w-[300px] h-[300px]  flex justify-center items-center backface-hidden bg-center bg-cover absolute "
                                    style={{border: `1px solid ${item.color}`,
                                    transform: `rotateY(${item.deg}deg) translateZ(150px)`
                                }}
                                >{item.color}</div>
                            )
                        })}   
                    </div>
                </div>
                    
            </div>
            {/* button */}
            <button 
                onClick={() => {dispatch(clickRight({degree: 90}))}}
                className="mx-20"
            >
                <FaAngleDoubleRight />
            </button>
        </div>
    )
}
export default Cube