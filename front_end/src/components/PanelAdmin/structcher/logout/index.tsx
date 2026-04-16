import { useEffect } from "react";
import { baseURL } from "../../../../baseURL";
import { useDispatch, useSelector } from "react-redux";
import type{ AppDispatch, RooState } from "../../../../store";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector((state: RooState) => state.panelAdmin)
    const navigate = useNavigate()
 
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