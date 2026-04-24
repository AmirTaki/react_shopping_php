import { useSelector } from "react-redux"
import { imgURL } from "../../../../../../../baseURL"
import type { TImageMenuHeaderObject } from "./redux/sliceImageMenus"
import type { RooState } from "../../../../../../../store"

const ImagesMenus = ({item}: {item:  TImageMenuHeaderObject}) => {   
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop

    return(
        <div className="flex justify-center my-4 items-center flex-col" >
            <div className={`border-1 rounded-xl flex flex-col h-60 justify-center items-center px-4 w-60
                ${response ? `` : `w-40! h-40!`}
                `}>
                <img src={imgURL + item.image} className="w-40" alt="" />
                <p className="text-sm h-10 flex justify-center items-center text-center duration-200 dark:hover:text-rose-400 hover:text-sky-400">{item.body}</p>
            </div>
        </div>
    )
}
export default ImagesMenus