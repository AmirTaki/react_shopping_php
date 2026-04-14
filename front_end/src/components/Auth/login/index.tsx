import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type{ AppDispatch } from "../../../store"
import { changeAuth } from "../validation/redux/validationSlice"

const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(changeAuth({id: 1}))
    }, [])
    return (
        <div className="">login</div>
    )
}
export default Login