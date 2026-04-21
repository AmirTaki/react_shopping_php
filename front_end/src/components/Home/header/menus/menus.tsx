import { useDispatch, useSelector } from "react-redux"
import type{ AppDispatch, RooState } from "../../../../store"
import "../styles/styles.css"
import type { TMenusHeaderObject} from "./redux/menusSlice"

const MenusSideBar = ({item} : {item: TMenusHeaderObject}) => {
    const dispatch = useDispatch<AppDispatch>()
    const {response} = useSelector((state: RooState) => state.response) // respone ? mobile : desktop

    return(
        <div className="group/menu">
            <div className="">
                {item.title}
            </div>

            {/* list */}
            <div className={`${response ? ``: `bg-amber-300 hidden w-full h-130 left-0 absolute top-14 group-hover/menu:flex`}`}>
            </div>
        </div>
    
    )
}
export default MenusSideBar