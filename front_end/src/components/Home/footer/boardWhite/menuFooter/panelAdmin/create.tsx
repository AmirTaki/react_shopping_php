import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RooState, AppDispatch } from "../../../../../../store";
import type React from "react";
import { useEffect } from "react";
import { onLoadingMenuBoard, onSetItemsMenuBoard, onTitleMenuBoard } from "../redux/menuFooterSlice";
import { createMenuFooterThunk } from "../redux/actionsMenuFooter";


const CreateMenuFooterPA = () => {
    const dispatch =  useDispatch<AppDispatch>()
   const {title, addItems} =  useSelector((state: RooState) => state.menuFooter)

    const navigate =  useNavigate()

    useEffect(() => {
        dispatch(onLoadingMenuBoard())
    }, [])
    
    useEffect(() => {
        if(addItems){
            navigate('/panelAdmin/footerMenu')
            dispatch(onSetItemsMenuBoard())
        }
    } , [addItems])
    
    return(
        <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/footerMenu" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem] mb-14"
            >
                view menus
            </Link>
            <form>
                {/* title */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="name" className="text-blue-500">title</label>
                    <input 
                        value = {title.name}
                        type="text" id = "name" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onTitleMenuBoard({title: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">{title.warning}</span>
                </div>

                <hr className="my-8"/>
                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()
                            dispatch(createMenuFooterThunk({title : title.name}));
                        }}
                        type="submit" value = "save" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>

            </form>
        </div>
    )
}
export default CreateMenuFooterPA;