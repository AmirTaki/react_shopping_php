import { useDispatch, useSelector } from "react-redux"
import type { RooState, AppDispatch } from "../../../../store"
import { useEffect } from "react"
import { onSearchHandler } from "../redux/headerSlice"
import { MdKeyboardVoice } from "react-icons/md";
import { GiCrossMark } from "react-icons/gi";
import "../styles/styles.css"

const Search = () => {
    const {search} =  useSelector((state: RooState) => state.header)
    const dispatch =  useDispatch<AppDispatch>()
 
    useEffect(() => {
        if(!search){
            const timer = setInterval(() => {
                dispatch(onSearchHandler({search: null}))
            }, 1000 )
            return () => {
                clearInterval(timer)
            }
        }
    }, [search])

    return(
        <div className={`
            ${search === null ? "hidden" : ""}
            ${search ? 'openSearch' : "closeSearch"}
            h-10  items-center 
        `}>
            <div className={`w-[90%] mx-auto h-10  flex items-center  relative border-2 rounded-2xl`}>
                <input type="text"  
                    placeholder="search ...."
                    className={`w-[95%] mx-auto px-10 py-2 rounded-2xl outline-0 border-0`}
                />
                <GiCrossMark 
                    onClick={() => {dispatch(onSearchHandler({search: false}))}}
                    className={`${search ? "scale-100" : "scale-0 "} duration-800 absolute left-4 text-red-600 cursor-pointer hover:scale-125`}
                />
                <MdKeyboardVoice 
                    className={`${search ? "scale-100" : "scale-0 "} duration-800 text-xl absolute right-4 text-gray-600 cursor-pointer hover:scale-125 hover:text-blue-700`}
                />
            </div>
        </div>    )
}
export default Search