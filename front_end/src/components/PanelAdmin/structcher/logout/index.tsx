import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { requestLogoutThunk } from "../redux/actionsPanelAdmin";
import type { RooState } from "../../../../store";

const LogOut = () => {
    const {callBack} =  useSelector((state: RooState) => state.panelAdmin)

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
 
    useEffect(() => {
        // requsetLogOut()
        dispatch(requestLogoutThunk())
    }, [])

    useEffect(() => {
        if(callBack){
            navigate('/validation/login')
        }
    }, [callBack])

    return(
        <>logout</>
    )
}
export default LogOut;