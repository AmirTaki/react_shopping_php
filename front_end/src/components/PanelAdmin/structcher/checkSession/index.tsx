import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { baseURL } from "../../../../baseURL";
import { useDispatch, useSelector,} from "react-redux";
import {type AppDispatch, type RooState } from "../../../../store";
import { onSetUserPanelAdmin } from "../redux/panelAdminSlice";

const CheckSession = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const {user} = useSelector((state: RooState) => state.panelAdmin)
    
    useEffect(() => {
        getSession();
    }, [])
    
    const getSession = async () => {
        try{
            const response = await fetch (baseURL + 'functions/checkSession.php', {
                method: 'GET',
                credentials: 'include'
            })

            if(!response.ok){
                throw new Error ('warning: .....');
            }
            const data = await response.json()
            dispatch(onSetUserPanelAdmin(data))
          
            if(!data.loggedIn){
                navigate('/validation/login')
            }
        }
        catch(err: any){
            console.error(err.message)
            navigate('/validation/login')
        }
    }
    
    return(
        <></>
    )

}

export default CheckSession;