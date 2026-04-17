import { useEffect } from "react";
import { baseURL } from "../../../../baseURL";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store";
import { onSetUserPanelAdmin } from "../redux/panelAdminSlice";

const LogOut = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        requsetLogOut()
    }, [])

    const requsetLogOut = async () => {
        try{
            const response = await fetch (baseURL + `functions/logout.php`, {
                method: 'GET',
                credentials: 'include'
            })
            if(!response.ok){
            
            
                throw new Error('message : ...')
            
            }
            const data = await response.json()
            data.loggedIn === false && navigate('/')
            console.log(data, 'logout')
            // ["loggedIn" => false,"user" => '' , "level" => 'D']
            dispatch(onSetUserPanelAdmin(data))
            return data
            
        }
        catch(err: any){
            console.error(`message: ${err.message}`)
        }
    }
    return(
        <>logout</>
    )
}
export default LogOut;