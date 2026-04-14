import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type{ AppDispatch } from "../../../store"
import { changeAuth } from "../validation/redux/validationSlice"

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(changeAuth({id: 0}))
    }, [])
    return(
        <div className="">
            register
        </div>
    )
}
export default Register