import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RooState } from "../../../../../../store";
import { useEffect } from "react";
import { viewMenusHeaders } from "../../redux/actionsMenus";
import { onAddItemsListMenus, onListMenus, onLoadingListMenus, onTitleListMenus } from "../redux/sliceMenuList";
import { createListHeadersThunk } from "../redux/actionsMenuList";

const CreateMegaMenuListPA = () => {

    const {list, title, callback, addItems} = useSelector((state: RooState) => state.lists)
    const {Menus, } = useSelector((state: RooState) => state.menus)
    const dispatch = useDispatch<AppDispatch> ()
    const navigate = useNavigate()

    useEffect(() => {
        callback && navigate('/LogOut')
    }, [callback])

    useEffect(() => {
        if(addItems){
            navigate('/panelAdmin/megaMenuList')
            dispatch(onAddItemsListMenus())
        }
    }, [addItems])

    useEffect(() => {
        dispatch(onLoadingListMenus())
        dispatch(viewMenusHeaders())
    }, [])
    
    return(
        <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/megaMenuList" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem] mb-14"
            >
                view list 
            </Link>

            <form>
                {/* list */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="name" className="text-blue-500">list</label>
                    <input 
                        value = {list.name}
                        type="text" id = "name" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onListMenus({list: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {list.warning}
                    </span>
                </div>

                <hr className="my-8"/>
                {/* title */}
                <div className="flex gap-5 items-center justify-center">
                    
                    <label htmlFor="title" className="text-blue-500">title</label>
                    <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(onTitleListMenus({title : e.target.value}))}}
                        id = "title" className="bg-[#252525]!  text-white border-2 w-full rounded-md h-13 p-2 "
                    >
                        <option value= "" className="">select one option ?</option>        
                        {Array.isArray(Menus) && Menus?.map((item) => {
                            return(
                                <option  key = {item.id} value={item.title}>
                                    {item.title}
                                </option>
                            )
                        })}
                    </select>
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
                            dispatch(createListHeadersThunk({title : title.name, list: list.name}));
                        }}
                        type="submit" value = "ADD" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>

            </form>
        </div>
    )
}
export default CreateMegaMenuListPA;