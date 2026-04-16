import { FaReact } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { LiaCpanel } from "react-icons/lia";
import { ImExit } from "react-icons/im";
import { RiMenuFoldFill } from "react-icons/ri";
import { BiSolidExit } from "react-icons/bi";
import DarkMode from "../../../DarkMode";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavbarPanelAdmin = () => {
    const [openSlide, setOpenSlide] =   useState<boolean>(true)
    return(
        <div className="h-20 border-b border-[silver] dark:bg-[#242424]! bg-[#cbcbcb]! text-gray-800 dark:text-white border-b-[1px_solid_gray] flex justify-between px-3  items-center fixed w-full">
            
            <div className="flex gap-2 text-3xl group flex justify-center items-center">
                <DarkMode />
                <FaReact className="group-hover:text-rose-400  duration-1000" />
                <FaPhp className="group-hover:text-sky-400 duration-1000"/>
            </div>
            
            <div className="text-6xl hover:scale-150 duration-1000">
                <LiaCpanel />
            </div>
                

            <div className="flex text-2xl gap-3 justify-center items-center">
            
                <Link to = "/">
                    <FaHome title="home" className="hover:text-[#00e9d6] duration-300 cursor-pointer"/>
                </Link>
            
                <Link to = "/LogOut">
                    <BiLogOut title ="logout" className="hover:text-[red] duration-300 cursor-pointer"/>
                </Link>
            
                <Link to = "/Login">
                    <CiLogin title = "login"  className="hover:text-[blue] duration-300 cursor-pointer"/>
                </Link>
            
                <Link to = "/">
                    <ImExit title = "exit" className="hover:text-rose-600 duration-300 cursor-pointer"/>
                </Link>

                <div 
                    className=""
                    // onClick={() => {dispatch(handlerOpenSlide({bool: true}))}}
                >
                    <RiMenuFoldFill title = "open sidebar" className="text-3xl dark:hover:text-[silver]!  hover:text-blue-500! duration-200 cursor-pointer"/>
                </div>

            </div>


              {/* sidebar */}
            <div className={`${openSlide ? 'right-0' : 'right-[-500px]'} absolute w-[250px]! dark:bg-[#242424]! bg-[#ebebeb]! text-gray-800 dark:text-white border-[silver] h-screen top-20 border-1  flex flex-col duration-500
             overflow-y-auto 
            `}>
                <div 
                    title = 'close sidebar'
                    // onClick={() => {dispatch(handlerOpenSlide({bool: false}))}}
                    className="px-3 h-10 text-lg flex items-center border-b-1 cursor-pointer group"
                >
                    <BiSolidExit
                        className="group-hover:translate-x-[200px] dark:group-hover:text-rose-400! group-hover:text-blue-500! duration-500 "
                    />
                </div>
                <div className="flex flex-col  mb-[10%] ">
                  
                    {/* {sideList.map((item) => {
                        return(
                            <Link 
                                to = {item.link}
                                key = {item.id} 
                                className={` flex items-center-safe px-3 text-md hover:tracking-[.2rem] duration-150 cursor-pointer h-10 ${item.id === numberSide && 'dark:text-rose-400! tracking-[.2rem]! text-sky-400!'}`}
                                onClick={ () => {dispatch(changeNumberSide({id: item.id}))}}
                            >
                                {item.name}
                            </Link>
                        )
                    })} */}
                </div>
            </div>
        
        </ div>
    )
}
export default NavbarPanelAdmin