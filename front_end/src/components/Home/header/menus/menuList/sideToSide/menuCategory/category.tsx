import type { TCategoryMenusHeaderObject } from "./redux/sliceCategory"

const CategoryMenus = ({item}: {item: TCategoryMenusHeaderObject}) => {
    return(
        <div key = {item.id} className="h-10  flex items-center px-3" >{item.category}</div>
    )
}
export default CategoryMenus