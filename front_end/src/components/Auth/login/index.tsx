import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type{ AppDispatch, RooState } from "../../../store"
import { changeAuth } from "../validation/redux/validationSlice"
import { onCheckboxLogin, onEmailLogin, onLoadingLogin, onLogin, onPasswordLogin } from "./redux/loginSlice"
import { useNavigate } from "react-router-dom"
import { loginThunk } from "./redux/actionsLogin"
import { getSessionThunk, requestLogoutThunk } from "../../PanelAdmin/structcher/redux/actionsPanelAdmin"
import "../validation/styles.css"


const Login = () => {
    const {login, email, password, checkbox, } = useSelector((state: RooState) => state.login) 
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(changeAuth({id: 1}))
        dispatch(onLoadingLogin())

    }, [])

    useEffect(() => {
        // checksession
        dispatch(getSessionThunk())    
    }, [])

    useEffect(() => {
        if(login){
            window.alert('your wellcome to panel admin !!!')
            dispatch(onLogin())
            navigate('/panelAdmin')
        }
    }, [login])

    return (
       <div className=" box top-130! ">
            <header className="signup-header">
                <h1>Sign in</h1>
            </header>
            <div className= "signup-body">
                <form>  
                    {/* email */}
                    <p className="">
                        <label htmlFor="email">email</label>
                        <input 
                            value = {email.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onEmailLogin({email: e.target.value}))}}
                            type="email" id = 'email' className=""
                            placeholder=""
                        />
                        <span className="">message:  
                            <span className = {`${email.check ? "text-green-500" : "text-red-500"} px-3 `}>{email.warning}</span>
                        </span>
                    </p>


                    {/* password */}
                    <p className="f">
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
                        <p className="flex ">
                            <label htmlFor="checkbox" className="text-sm!  w-35">
                                {checkbox ? 'hidden password' : 'show passowrd'}
                             </label>
                            <input 
                                className="w-4! "
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onCheckboxLogin({tick: e.target.checked}))}}
                                type = 'checkbox' id  = 'checkbox'
                            ></input>
                        </p>
                    </p>
                       
                    {/* input submit */}
                    <p className=" ">
                        <input
                            // disabled = {disabled} 
                            onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                                e.preventDefault()

                                // log out thunk 
                                dispatch(requestLogoutThunk())
                                // login thunk
                                dispatch(loginThunk({email: email.name, password: password.pin,}))
                            }}
                            type="submit" value = 'Sing In' 
                            className={`cursor-pointer `} 
                        />
                    </p>
                
                </form>
            </div>
        </div>
    )
}
export default Login