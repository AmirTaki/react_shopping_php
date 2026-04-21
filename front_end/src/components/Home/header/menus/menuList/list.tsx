import type { TMenusHeaderObject } from "../redux/menusSlice"

const ListSidebar = ({item} : {item: TMenusHeaderObject}) => {
    return(
        <div className="group/menu">
            {item.title}

            {/* list */}
            <div className="bg-amber-300 hidden w-full h-130 left-0 absolute top-14 group-hover/menu:flex">
            </div>
        </div>
    )
}
export default ListSidebar