import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type{ AppDispatch, RooState } from "../../../store"
import { changeAuth } from "../validation/redux/validationSlice"
import { onCheckboxLogin, onEmailLogin, onLoadingLogin, onLogin, onPasswordLogin } from "./redux/loginSlice"
import { useNavigate } from "react-router-dom"
import { loginThunk } from "./redux/actionsLogin"
import { baseURL } from "../../../baseURL"

const Login = () => {
    const {login, email, password, checkbox, } = useSelector((state: RooState) => state.login) 
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(changeAuth({id: 1}))
        dispatch(onLoadingLogin())

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
            if(!data.loggedIn){
                navigate('/validation/login')
            }
        }
        catch(err: any){
            console.error(err.message)
            navigate('/validation/login')
        }
    }
        

    useEffect(() => {
        // checksession
        getSession()
    }, [])

    useEffect(() => {
        if(login){
            window.alert('your wellcome to panel admin !!!')
            dispatch(onLogin())
            navigate('/panelAdmin')
        }
    }, [login])
    return (
       <div className="mx-auto w-[90%]   ">
            <div className="border-2  my-3 rounded-3xl  ">
                <form>
                    <div className="flex flex-col justify-center items-center my-10 ">
                        
                        {/* email */}
                        <div className="flex flex-col w-[50%] gap-3">
                            <label htmlFor="email">email</label>
                            <input 
                                value = {email.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onEmailLogin({email: e.target.value}))}}
                                type="email" id = 'email' className="border-2  p-2"
                            />
                            <span>message:  
                                <span className = {`${email.check ? "text-green-500 " : "text-red-500 "} px-3`}>{email.warning}</span>
                            </span>
                        </div>

                        <div className="border-b-2 w-[50%] my-10"></div>

                        {/* password */}
                        <div className="flex flex-col w-[50%] gap-3">
                            <label htmlFor="password">password</label>
                            <input 
                                value={password.pin}
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onPasswordLogin({password: e.target.value}))}}
                                type={checkbox ? "text": 'password' }  id = 'password' className="border-2  p-2"
                            />
                            <span>message:  
                                <span className = {`${password.check ? "text-green-500 " : "text-red-500 "} px-3`}>{password.warning}</span>
                            </span>

                        {/* input view & hidden type password */}
                            <div className="flex my-8 w-[50%] gap-3">
                                <label htmlFor="checkbox">{checkbox ? 'hidden password' : 'show passowrd'} </label>
                                <input 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onCheckboxLogin({tick: e.target.checked}))}}
                                    type = 'checkbox' id  = 'checkbox'
                                ></input>
                            </div>
                        </div>

                        <div className="border-b-2 w-[50%] my-10"></div>
                       
                        {/* input submit */}
                        <div className="flex my-8 w-[50%] gap-3 justify-center items-center ">
                            <input
                                // disabled = {disabled} 
                                onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                                    e.preventDefault()

                                    // login thunk
                                
                                    dispatch(loginThunk({email: email.name, password: password.pin,}))
                                }}
                                type="submit" value = 'sing in' 
                                className={`border-2 w-[50%] p-2 rounded-xl  cursor-pointer`} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login