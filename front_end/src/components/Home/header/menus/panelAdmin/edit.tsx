import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import type { AppDispatch, RooState } from "../../../../../store";
import { onAddItemsMenus, onLoadingMenus, onTitleMenus } from "../redux/menusSlice";
import { editItemsMenuHeaders, readItemMenuHeaders } from "../redux/actionsMenus";

const EditMenusHeadersPA = () => {
    const {id} = useParams();
    const dispatch =  useDispatch<AppDispatch>()
    const {title, addItems} =  useSelector((state: RooState) => state.menus)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(onLoadingMenus())
        dispatch(readItemMenuHeaders({id: Number(id)}))
    }, [])

    useEffect(() => {
        if(addItems) {
            navigate('/panelAdmin/menusHeaders')
            dispatch(onAddItemsMenus())
        }
    }, [addItems])
    
    return(
        <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/menusHeaders" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem] mb-14"
            >
                view menus
            </Link>

            <form>
                {/* title edit */}
                <div className="flex gap-5 items-center justify-center mt-8">
                    <label htmlFor="name" className="text-blue-500">title</label>
                    <input 
                        type="text" id = "name" className="border-2 w-full rounded-md h-10 p-2"
                        value={title.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onTitleMenus({title: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {title.warning}
                    </span>
                </div>

                <hr className="my-8"/>

                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()
                            dispatch(editItemsMenuHeaders({id: Number(id), title: title.name}))
                        }}
                        type="submit"
                        value = "update" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>
            </form>
        </div>
    )
}
export default EditMenusHeadersPA