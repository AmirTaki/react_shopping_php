import { Link,  } from "react-router-dom"
import DarkMode from "../../DarkMode"
import {hideScrollTop, onSearchHandler, onSidebarHandler } from "./redux/headerSlice"
import { IoLogoBuffer } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { ImSearch } from "react-icons/im";
import { SlBasket } from "react-icons/sl";
import { TfiMenuAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux"
import {type AppDispatch, type RooState } from "../../../store"
import "./styles/styles.css"
import { useEffect } from "react"
import Search from "./search"
import Sidebar from "./sidebar";


const Header = () => {
    const {dark} =  useSelector((state: RooState) => state.darkMode)
    const {scrollHide, search} = useSelector((state: RooState) => state.header)
    const {response} = useSelector((state: RooState) => state.response)
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
        <div className={` 
            ${dark ? "bg-[blue]" : "bg-[red]"} 
            ${scrollHide ?   'translate-y-0' : 'translate-y-[-100%]'}    
            dark:text-white text-black  fixed w-full duration-1000   z-100 `}
        >
            {/* component navbar */}
            <div 
                className=
                {` flex items-center justify-between h-14 px-3 transition-opacity 
                    ${search ? "opacity-0 " : "opacity-100 duration-[4500ms]"}
                `}
            >
                <div className={` gap-5 flex items-center `}>

                    <TfiMenuAlt
                        title = {'sidebar'}
                        className={`
                            ${response ? 'flex' : 'hidden'}
                            cursor-pointer hover:scale-120! duration-150 text-xl   
                            ${dark ? "hover:text-[silver]!" : "hover:text-blue-800!"}
                            `}            
                        onClick={() => {dispatch(onSidebarHandler({sidebar: true}))}}
                    />

                    {/* regiseter */}
                    <Link to = "/validation/register">
                        <FaUserAlt 
                            title = {'sign up'}
                            className={`
                                ${response ? '' : 'flex'}
                                cursor-pointer hover:scale-120 duration-150 
                            `}
                        />
                    </Link>
                    
                    {/* login */}
                    <Link to = "/validation/login">
                        <RiAdminFill   
                            title = {'sign in'}
                            className={`
                                ${response ? '' : 'flex'}
                                cursor-pointer hover:scale-120 duration-150 text-xl    
                            `}
                        />
                    </Link>
                </div>

                {/*  menus item & megamenu & sidebar -> menus, list, category, series, image */}
                <Sidebar />
               
                {/* user admin serach */}
                <div className="flex items-center gap-5">
            
                    {/* search */}
                    <ImSearch  
                        title = "search"
                        onClick={() => {dispatch(onSearchHandler({search: !search}))}}
                        className="cursor-pointer hover:scale-120 duration-300"
                    />
                    
                    {/* page stroe */}
                    <Link to="/">
                        <SlBasket title = "shop-page" className="cursor-pointer hover:scale-150 duration-150 "/>
                        <div 
                            className="absolute text-blue-500 text-[15px]  dark:text-green-500 p-1 overflow-hidden rounded-full  right-26 bottom-7"
                        > 
                            {/* {allQauntity > 0 && allQauntity} */}
                        </div>
                    </Link>

                    {/* logo */}
                    <Link to  = "/panelAdmin">
                        <IoLogoBuffer title = {'panelAdmin'} className={`text-2xl cursor-pointer hover:scale-120! duration-150  ${response ? 'flex': 'flex'}`}/>
                    </Link>
                    
                    {/* dark mode */}
                    <div title = 'darkMode'>
                        <DarkMode />
                    </div>
                </div>
            </div>

            {/* search icon */}
            <div className={`absolute left-0 top-2 w-full`}>
                <Search />
            </div>

            
        </div>
    )
}
export default Header