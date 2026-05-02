import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { RooState, AppDispatch } from "../../../../../../store";
import { viewMenuFooterThunk } from "../../menuFooter/redux/actionsMenuFooter";
import { onItemBoard, onLoadingItemBoard, onSetItemsBoard, onTitleItemBoard } from "../redux/itemFooterSlice";
import { createItemFooterThunk } from "../redux/actionsItemFooter";


const CreateItemFooterPA = () => {
    const navigate = useNavigate()
    const {menus } =  useSelector((state: RooState) => state.menuFooter)
    const {callback, addItems, item, title, } = useSelector((state: RooState) => state.itemFooter)

    const dispatch = useDispatch<AppDispatch> ()

    useEffect(() => {
        callback && navigate('/LogOut')
    }, [callback])

    useEffect(() => {
        if(addItems){
            navigate('/panelAdmin/footerItem')
            dispatch(onSetItemsBoard())
        }
    }, [addItems])

    useEffect(() => {
        dispatch(onLoadingItemBoard())
        dispatch(viewMenuFooterThunk())
    }, [])
    
    return(
        <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/footerItem" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem] mb-14"
            >
                view item 
            </Link>

            <form>
                {/* item */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="name" className="text-blue-500">item</label>
                    <input 
                        value = {item.name}
                        type="text" id = "name" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onItemBoard({item: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {item.warning}
                    </span>
                </div>

                <hr className="my-8"/>
                {/* title */}
                <div className="flex gap-5 items-center justify-center">
                    
                    <label htmlFor="title" className="text-blue-500">title</label>
                    <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(onTitleItemBoard({title : e.target.value}))}}
                        id = "title" className="bg-[#252525]!  text-white border-2 w-full rounded-md h-13 p-2 "
                    >
                        <option value= "" className="">select one option ?</option>        
                        {Array.isArray(menus) && menus?.map((item) => {
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
                            dispatch(createItemFooterThunk({title : title.name, item: item.name}));
                        }}
                        type="submit" value = "ADD" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>

            </form>
        </div>
    )
}
export default CreateItemFooterPA;