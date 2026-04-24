import type { TProductMenusHeaderObject } from "./redux/sliceMenuSeries";

const SeriesMenus = ({item}: {item: TProductMenusHeaderObject}) => {
    return(
        <div key = {item.id} className="h-10  flex items-center px-3" >{item.series}</div>
    )
}
export default SeriesMenus;