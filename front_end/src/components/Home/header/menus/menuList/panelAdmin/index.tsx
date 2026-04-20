import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RooState } from "../../../../../../store";
import { useEffect } from "react";


const MenuListHeadersPA = () => {
    // const {Lists, loading} = useSelector((state: RooState) => state.ListMegaMenu)
    const dispatch = useDispatch<AppDispatch>()
    // useEffect(() => {
    //     dispatch(viewListHeadersThunk())
    // }, [loading]) 
    return(
        <div className={`flex w-full flex-col gap-5`}>
            
            <Link 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem]"
                to = "create" 
            >
                create list item
            </Link>
            
            <div className="w-[90%] mx-auto flex flex-col my-3 overflow-x-auto " >
                
                <table className="w-full">
                    <thead >
                        <tr >
                            <th>#</th>
                            <th>List</th>
                            <th>Title</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {/* {Array.isArray(boxses) && boxses.map((item, ind) => { 
                            return(
                                <tr key = {ind} className=" " >
                                    
                                    <th className="">{ind + 1}</th>
                                    
                                    <th></th>
                                                            
                                    <th>{item.title}</th>

                                    <th>{item.body}</th>
                                    <th className = {`${item.status == 10 ? "text-green-400" : 'text-rose-400'  } `}>
                                        {item.status == 10 ? 'enable' : 'disable'}
                                    </th>

                                    <th>
                                        <div 
                                            onClick={() => {
                                                dispatch(changeStatusImageAdvertSessionThunk({id: item.id}) );
                                            }}
                                            className="text-yellow-500 cursor-pointer duration-200 hover:text-yellow-300 py-1 "
                                        >
                                            change status
                                        </div>

                                        <Link  
                                            to = {`edit/${item.id}`} 
                                            className="text-sky-500 cursor-pointer duration-200 hover:text-blue-700 py-1">
                                                edit
                                        </Link>
                                        
                                        <div 
                                            onClick={() => {
                                                dispatch(deleteImageAdvertSessionThunk({id: item.id}))                                            
                                            }}
                                            className="text-rose-500 cursor-pointer duration-200 hover:text-red-700! py-1"
                                        >
                                            delete
                                        </div>
                                    </th>
                                </tr>
                            )
                        })} */}

                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
export default MenuListHeadersPA