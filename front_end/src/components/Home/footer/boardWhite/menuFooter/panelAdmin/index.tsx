import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RooState } from "../../../../../../store";
import { useEffect } from "react";
import { viewMenuFooterThunk, deleteMenuFooterThunk, changeStatusMenuFooterThunk } from "../redux/actionsMenuFooter";

const MenusFooterPanelAdmin = () => {
    const dispatch =  useDispatch<AppDispatch>()
    const {menus, loading} = useSelector((state: RooState) => (state.menuFooter))
    useEffect(() => {
        dispatch(viewMenuFooterThunk())
    }, [loading])
    console.log(menus)
    return(
        <div className={`flex w-full flex-col gap-5`}>
            
            <Link 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem]"
                to = "create" 
            >
                create Menus
            </Link>
            

            <div className="w-[90%]  mx-auto flex flex-col my-3 " >
                
                
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(menus) && menus.map((item, ind) => { 
                            return(
                                <tr key = {ind}>
                                    <th>{ind + 1}</th>
                                    <th>{item.title}</th>
                                    <th className = {`${item.status == 10 ? "text-green-400" : 'text-rose-400' }`}>
                                        {item.status == 10 ? 'enable' : 'disable'}
                                    </th>

                                    <th className="flex justify-center items-center gap-7! max-md:flex-col max-md:gap-1!" >
                                        
                                        <div 
                                            onClick={() => {
                                                dispatch(changeStatusMenuFooterThunk({id: item.id}) );
                                            }}
                                            className="text-yellow-500 cursor-pointer duration-200 hover:text-yellow-300 "
                                        >
                                            change status
                                        </div>

                                        <Link  
                                            to = {`edit/${item.id}`} 
                                            className="text-sky-500 cursor-pointer duration-200 hover:text-blue-700 ">
                                                edit
                                        </Link>
                                        
                                        <div 
                                            onClick={() => {
                                                window.confirm('Do you want it to be deleted ? ')  && dispatch(deleteMenuFooterThunk({id: item.id}))
                                            }}
                                            className="text-rose-500 cursor-pointer duration-200 hover:text-red-700!"
                                        >
                                            delete
                                        </div>
                                    </th>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
export default MenusFooterPanelAdmin;