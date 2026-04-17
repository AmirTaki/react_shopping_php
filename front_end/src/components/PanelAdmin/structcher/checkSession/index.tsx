import { useEffect, } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux";
import {type AppDispatch, type RooState,   } from "../../../../store";
import { getSessionThunk } from "../redux/actionsPanelAdmin";

const CheckSession = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const {user, callBack} =  useSelector((state: RooState) => state.panelAdmin)
  
    useEffect(() => {
        dispatch(getSessionThunk())
    }, [])
    
    useEffect(() => {
        if(callBack){
            navigate('/validation/login')
        }
    }, [callBack])

    return(
        <></>
    )

}

export default CheckSession;