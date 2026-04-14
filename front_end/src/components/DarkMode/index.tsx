import { useDispatch, useSelector } from "react-redux";
import type{ AppDispatch, RooState } from "../../store";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { changeModeDark } from "./redux/darkModeSlice";
import "./styles.css"

const DarkMode = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {dark, loading} = useSelector((state: RooState) => state.darkMode)
  
    return (
        <div className="">
            <div 
                onClick={() => {dispatch(changeModeDark())}}
                className={`text-2xl border-1   rounded-full p-2  cursor-pointer shadow-[inset_3px_3px_8px_rgba(81,81,81,0.8)] duration-500
                    ${dark  ?
                        `bg-black text-white border-[#383838]   ${loading ? 'MoonAnimation' : ''}`
                        : 
                        `bg-white text-yellow-400 border-gray-300  ${loading ?  "" : 'SunAnimation' }  `
                    } 
                `}
            >
                {dark ? <FaMoon /> : <FaSun /> }  
            </div>
        </div>
    )
}
export default DarkMode;