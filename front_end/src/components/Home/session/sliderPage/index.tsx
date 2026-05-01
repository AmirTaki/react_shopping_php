import { useEffect, useMemo, useRef, useState } from "react"
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import {baseURL, imgURL } from "../../../../baseURL";

const GridSwiper = () => {
   
    const [counter, setCounter] =  useState<number>(0)
    const containerRef =  useRef<HTMLDivElement>(null)
    const widthRef  =  useRef<HTMLDivElement>(null)
    const [items, setItems] = useState([{id: 0, image: '', body: ''}])
    const [isDrag, setIsDrag] = useState<boolean>(false)
    const stratX = useRef<number>(0)
    const stratScrollLef = useRef<number>(0)
    const currentX = useRef<number>(0)
    const [button, setButtons] = useState<any>([])
    
    const getRequest = async () => {
        try{
            await fetch (baseURL + 'tables/session/sliderPage/reading.php', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                res.json().then((data) => {
                    setItems(data)
                })
            })

        }
        catch(err: any){
            console.error('warning: ', err.message)
        }
    }
    
    const innerWidth = useMemo(() => {
        if(window.innerWidth <= 640 ) {
            setButtons(Array.from({length: Math.ceil(items.length)}, (_, i) => `item ${i + 1}`))
            return items.length
        }
        else if(window.innerWidth  > 640  && window.innerWidth  <= 1024 ){
            setButtons(Array.from({length: Math.ceil(items.length / 2) }, (_, i) => `item ${i + 1}`))
            return items.length / 2
        }
        else {      
            setButtons(Array.from({length: Math.ceil(items.length / 3)}, (_, i) => `item ${i + 1}`))
            return items.length / 3
        }

    }, [items.length, containerRef.current?.offsetWidth,])
      
    
    useEffect(() => {
        getRequest()
    }, [])
    
    const handlerScrolTo = (counter: number) => {
        const maxIndex =  Math.ceil(innerWidth) - 1
        const newIndex = Math.max(0, Math.min(counter, maxIndex))
        setCounter(newIndex)
    }

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.style.scrollBehavior = 'smooth'
            containerRef.current.scrollLeft = counter * containerRef.current.offsetWidth
        }
    }, [counter])
   

    useEffect(() => {
        const handlerResize = () => {       
            handlerScrolTo(0)

            if(window.innerWidth <= 640 ) {
                setButtons(Array.from({length: Math.ceil(items.length)}, (_, i) => `item ${i + 1}`))
            }
            else if(window.innerWidth  > 640  && window.innerWidth  <= 1024 ){
                setButtons(Array.from({length: Math.ceil(items.length / 2) }, (_, i) => `item ${i + 1}`))
            }
            else {      
                setButtons(Array.from({length: Math.ceil(items.length / 3)}, (_, i) => `item ${i + 1}`))
            }
        }
        handlerResize()
        window.addEventListener('resize', handlerResize)
        return () => window.removeEventListener('resize', handlerResize)
    }, [])

    const handlerDown = (client: number) => {
        setIsDrag(true)
        if(containerRef.current){
            containerRef.current.style.scrollBehavior = 'auto'  
            stratX.current = client
            stratScrollLef.current = containerRef.current?.scrollLeft
        }
    }
   
    const handlerMove = (client: number) => {
        if(!isDrag) return;
        currentX.current = client - stratX.current
        if(containerRef.current){
            containerRef.current.scrollLeft = stratScrollLef.current - currentX.current
        }
    }
    const handlerUp = () => {
        if(!isDrag) return

        if(containerRef.current){
            setIsDrag(false)
            containerRef.current.style.scrollBehavior = 'smooth'
            const diff = containerRef.current.scrollLeft - stratScrollLef.current

            if(diff > 100){
                handlerScrolTo(counter + 1)
            }
            else if (diff < -100){
                handlerScrolTo(counter - 1)
            }
            else {
                handlerScrolTo(counter)
            }
            currentX.current = 0
        }
    }

    return(
        <div ref = {widthRef} className="text-sky-400 w-[100%] h-[300px]  mx-auto my-15 mb-20 relative  flex justify-center items-center  ">
            <div 
                ref = {containerRef}
                className="w-[90%] h-[95%]  flex flex-col flex-wrap overflow-x-hidden select-none touch-pan-x cursor-grab active:cursor-grabbing"
                onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {handlerDown(e.clientX)}}
                onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {handlerMove(e.clientX)}}
                onMouseUp={() => {handlerUp()}}
                onMouseLeave={() => {if(isDrag) {handlerUp()}}}

                onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {handlerDown(e.touches[0].clientX)}}
                onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {handlerMove(e.touches[0].clientX)}}
                onTouchEnd={() => {handlerUp()}}

            >
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
      

            <button className={`${counter <= 0 ? 'hidden': 'flex'} absolute left-0 top-35 `} onClick={() => {handlerScrolTo(counter - 1)}}>
                <FaAngleDoubleLeft />
            </button>
            {/* */}
            <button className={`  ${counter >=  innerWidth - 1  ? 'hidden': 'flex'} flex absolute right-0 top-35 `}  onClick={() => {handlerScrolTo(counter + 1)}}>
                <FaAngleDoubleRight />
            </button>
        
            <div className="flex absolute -bottom-7 gap-3 ">
                {Array.isArray(button) && button.map((_, i) => {
                    return(
                        <div onClick={() => {handlerScrolTo(i)}} className = {`w-2 h-2  rounded-full ${i == counter ? `bg-rose-400 scale-200 ` : 'bg-sky-400 duration-150 hover:scale-150 cursor-pointer'}`}></div>
                    )
                })}
            </div>
                
        </div>
    )
}

export default GridSwiper