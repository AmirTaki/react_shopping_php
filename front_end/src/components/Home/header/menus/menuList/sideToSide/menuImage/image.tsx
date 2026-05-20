import { useSelector } from "react-redux"
import { imgURL } from "../../../../../../../baseURL"
import type { TImageMenuHeaderObject } from "./redux/sliceImageMenus"
import type { RooState } from "../../../../../../../store"

const ImagesMenus = ({item}: {item:  TImageMenuHeaderObject}) => {   
    const {response} = useSelector((state: RooState) => state.response) // response ?  mobile : desktop

    return(
        <div className={`${response ? `border-1  sm:border-0 gap-5  p-5  max-sm:w-[90%] max-sm:max-w-[200px] sm:h-[200px] w-[120px] ` : 'border-1 w-[180px] h-[230px] p-1 gap-1'} rounded-2xl border-[silver] dark:border-[#5e5e5e]   sm:p-0 overflow-auto-hidden my-2 flex flex-col items-center justify-center`}>
        
            <img draggable = {false} src={imgURL + item.image} className={`${response ? 'sm:w-[100px] w-[150px]' : 'w-[130px]'}`} alt="" />
            <div className="text-center text-sm! hover:text-sky-400 duration-200 px-4">{item.body}</div>
            
        </div>
    )
}
export default ImagesMenus