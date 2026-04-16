import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { baseURL } from "../../../../baseURL";

const CheckSession = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        getSession()
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
            console.log(data)
        }
        catch(err: any){
            console.error(err.message)
        }
    }
    
    return(
        <></>
    )

}

export default CheckSession;