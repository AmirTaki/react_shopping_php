import { Link,  } from "react-router-dom"
import DarkMode from "../../DarkMode"
import { useDispatch, useSelector } from "react-redux"
import {type AppDispatch, type RooState } from "../../../store"
import "./styles/styles.css"
import { useEffect } from "react"
import { hideScrollTop } from "./redux/headerSlice"
import Search from "./search"

const Header = () => {
    const {dark} =  useSelector((state: RooState) => state.darkMode)
    const {scrollHide, search} = useSelector((state: RooState) => state.header)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        let lastScrollY = window.screenY
      
        const handlerScroll = () => {
            const currentScrollY = window.scrollY
            
            if(currentScrollY < lastScrollY){   
                dispatch(hideScrollTop({target: true}))
            }
            else if (currentScrollY > lastScrollY  && currentScrollY > 500){
                dispatch(hideScrollTop({target: false}))
            }
            lastScrollY = currentScrollY   
        }
        

        handlerScroll()
        window.addEventListener('scroll', handlerScroll)
        return () => window.removeEventListener('scroll', handlerScroll)
    }, [])

    return(
    
        // 
    
        <div className={` 
            ${dark ? "navbarDark" : "navbarWhite"} 
            ${scrollHide ?   'translate-y-0' : 'translate-y-[-100%]'}    
            dark:text-white text-black fixed w-full duration-1000  z-100! `}
        >
            {/* component navbar */}
            <div 
                className=
                {` flex items-center justify-between h-14 px-3 transition-opacity 
                    ${search ? "opacity-0 " : "opacity-100 duration-[4500ms]"}
                `}
            >

                <div className="w-11">

                    <DarkMode />
                </div>
            </div>

            {/* search icon */}
            <div className={`absolute left-0 top-2 w-full`}>
                <Search />
            </div>




            {/* <Link to = 'validation'>
                <button>auth - validation</button>
            </Link>
            <Link to = 'panelAdmin'>
                <button>panelAdmin</button>
            </Link> */}
            
        </div>
    )
}
export default Header