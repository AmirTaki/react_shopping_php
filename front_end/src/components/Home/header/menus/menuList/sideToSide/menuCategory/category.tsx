import type { TCategoryMenusHeaderObject } from "./redux/sliceCategory"
import type { RooState } from "../../../../../../../store"
import { useSelector } from "react-redux"

const CategoryMenus = ({item}: {item: TCategoryMenusHeaderObject}) => {
    const {response} =  useSelector((state: RooState) => state.response)

    return(
        <div className={`${response ? 'h-8' : 'h-9'}
            sm:leading-4  text-sm dark:hover:text-[white] duration-200 flex items-center px-4 hover:text-[#666666]
        `}>
            {item.category}
        </div>    
    )
}
export default CategoryMenus