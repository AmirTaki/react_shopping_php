import { useSelector } from "react-redux"
import { Link, Outlet } from "react-router-dom"
import type { RooState } from "../../../store"

const Validation = () => {
    const {linkValidation, numberAuth} = useSelector((state: RooState) => state.validation)

    return (
        <div className="  h-screen ">
            {/* navbar validation */}
            <div className="h-20 border-b text-2xl flex justify-center items-center gap-4">
                {linkValidation.map((item, ) => {
                    return(
                        <Link 
                            key = {item.id} 
                            className={`hover:text-rose-400! hover:tracking-[.2rem] duration-500! text-[silver]!
                                    ${numberAuth == item.id ? "text-rose-400! tracking-[.2rem]! " : ""}
                                `} 
                            to = {item.link}
                        >
                            {item.name}
                        </Link>
                    )
                })}
            </div>

            <Outlet />
        </div>
    )
}
export default Validation