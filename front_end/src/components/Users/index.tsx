import { useDispatch, useSelector } from "react-redux"
import type { RooState, AppDispatch } from "../../store"
import { useEffect } from "react"
import { Link, } from "react-router-dom"
import { changeStatusUsersThunk, viewUsersThunk, deleteUsersThunk } from "./redux/actionsUsers"

const UsersPanelAdmin = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {data, loading} = useSelector((state: RooState) => (state.users))
    useEffect(() => {
        dispatch(viewUsersThunk())
    }, [loading])

    return(
        <div className={`flex w-full flex-col gap-5`}>
            
            <Link 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem]"
                to = "create" 
            >
                create users
            </Link>
            

            <div className="w-[90%]  mx-auto flex flex-col my-3 " >
                
                
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Leavel</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) &&  data.map((user, ind) => { 
                            return(
                                <tr key = {ind}>
                                    <th>{ind + 1}</th>
                                    <th>{user.name}</th>
                                    <th>{user.email}</th>
                                    <th>{user.level}</th>
                                    <th className = {`${user.status == 10 ? "text-green-400" : 'text-rose-400' }`}>
                                        {user.status == 10 ? 'enable' : 'disable'}
                                    </th>

                                    <th className="flex justify-center items-center gap-7! max-md:flex-col max-md:gap-1!" >
                                        
                                        <div 
                                            onClick={() => {
                                                dispatch(changeStatusUsersThunk({id: user.id}) );
                                            }}
                                            className="text-yellow-500 cursor-pointer duration-200 hover:text-yellow-300 "
                                        >
                                            change status
                                        </div>

                                        <Link  
                                            to = {`edit/${user.id}`} 
                                            className="text-sky-500 cursor-pointer duration-200 hover:text-blue-700 ">
                                                edit
                                        </Link>
                                        
                                        <div 
                                            onClick={() => {
                                                window.confirm('Do you want it to be deleted ? ')   && dispatch(deleteUsersThunk({id: user.id}))
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

export default UsersPanelAdmin