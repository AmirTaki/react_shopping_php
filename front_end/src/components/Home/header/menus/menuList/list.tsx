import type { TListMenusHeaderObject } from "./redux/sliceMenuList"

const ListSideBar = ({item, }: {item: TListMenusHeaderObject }) => {
    return(
        <div
            className="listElement bg-amber-300 h-10  "
        >
            {item.list}
        </div>
    )
}
export default ListSideBar