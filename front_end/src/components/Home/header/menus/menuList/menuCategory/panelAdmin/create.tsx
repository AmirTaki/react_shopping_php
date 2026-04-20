import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RooState } from "../../../../../../../store";
import { useEffect } from "react";
import { onAddItemsCategory, onCategoryMenus, onListCategory, onLoadingCategory, onSignCategory, onTitleCategory } from "../redux/sliceCategory";
import { viewMenusHeaders } from "../../../redux/actionsMenus";
import { foundItemsListHeadersThunk, viewListHeadersThunk } from "../../redux/actionsMenuList";
import { createCategoryHeadersThunk } from "../redux/actionCategory";

const CreateMegaMenuCategoryPA = () => {
 
    const {Menus} = useSelector((state: RooState) => state.menus)
    const {Lists} = useSelector((state: RooState) => state.lists)
    const {category, list, title, sign, callback, addItems} = useSelector((state: RooState) => state.categoreis)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(onLoadingCategory())
        dispatch(viewMenusHeaders())
        dispatch(viewListHeadersThunk())

    }, [])

    useEffect(() => {
        title.name !== "" &&   dispatch(foundItemsListHeadersThunk({title: title.name}))
    }, [title])

    useEffect(() => {
        callback && navigate('/LogOut')
    }, [callback])

    useEffect(() => {
        if(addItems){
            navigate('/panelAdmin/megaMenuCategory')
            dispatch(onAddItemsCategory())
        }
    }, [addItems])

    return(
     <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/megaMenuCategory" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem] mb-14"
            >
                view category 
            </Link>
            
            <form>
                {/* category */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="category" className="text-blue-500">category</label>
                    <input 
                        value = {category.name}
                        type="text" id = "category" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onCategoryMenus({category: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {category.warning}
                    </span>
                </div>

                <hr className="my-8"/>
                {/* title */}
                <div className="flex gap-5 items-center justify-center">
                    
                    <label htmlFor="title" className="text-blue-500">title</label>
                    <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(onTitleCategory({title: e.target.value}))}}
                        id = "title" className="bg-[#252525]!  text-white border-2 w-full rounded-md h-13 p-2 "
                    >
                        <option value= "" className="hidden">select one option ?</option>
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
                {/* list */}
                <div className="flex gap-5 items-center justify-center">
                    
                    <label htmlFor="list" className="text-blue-500">list</label>
                    <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(onListCategory({list: e.target.value}))}}
                        id = "list" className="bg-[#252525]!  text-white border-2 w-full rounded-md h-13 p-2 "
                    >
                        <option value= "" className="hidden">select one option ?</option>

                        {title.name !== "" && Array.isArray(Lists) && Lists?.map((item) => {
                            return(
                                <option  key = {item.id} value={item.list}>
                                    {item.list}
                                </option>
                            )
                        })}
                    </select>
                </div> 
                
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {list.warning}
                    </span>
                </div>
                
                <hr className="my-8"/>
                
                {/* sign */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="sign" className="text-blue-500">sign</label>
                    <input 
                        value = {sign.name}
                        type="text" id = "sign" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onSignCategory({sign: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {sign.warning}
                    </span>
                </div>              
                    
                <hr className="my-8"/>
                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()
                            dispatch(createCategoryHeadersThunk({title : title.name, list: list.name, category: category.name, sign: sign.name}));
                        }}
                        type="submit" value = "ADD" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>

            </form>
        </div>
    )
}
export default CreateMegaMenuCategoryPA;