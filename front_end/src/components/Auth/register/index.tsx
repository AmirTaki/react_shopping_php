import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type{ AppDispatch, RooState } from "../../../store"
import { changeAuth } from "../validation/redux/validationSlice"
import { onDisabledRegister, onLoadingRegister, onSubmitRegister, onCheckboxRegister, onEmailRegister, onPasswordRegister, onRepeatPassowrdRegister, onUsernameRegister } from "./redux/registerSlice"
import { registerThunk } from "./redux/actonsRegister"
import "../validation/styles.css"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const {username, email, password, repPassword, checkbox, submit, disabled} = useSelector((state: RooState) => state.register)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(changeAuth({id: 0}))
        dispatch(onLoadingRegister())
    }, [])

    useEffect(() => {
        if(submit){
            window.alert("ثبت نام باموفقیت انجام شد")
            dispatch(onSubmitRegister())
            dispatch(onLoadingRegister())
            navigate('/validation/login')
        }
    }, [submit])

    useEffect(() => {
        dispatch(onDisabledRegister())
    }, [username, email, password, repPassword])
    
    return(
        <div className="box mb-7">
            <header className="signup-header">
                <h1>Sign up</h1>
            </header>
            <div className="signup-body">
                <form>

                    {/* username */}
                    <p className="">
                        <label htmlFor="username">name</label>
                        <input 
                            value = {username.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onUsernameRegister({username: e.target.value}))}}
                            type="text" id = 'username' className="" placeholder="Type Name Here"
                        />
                        <span>message:  
                            <span className = {`${username.check ? "text-green-500 " : "text-red-500 "} px-3`}>{username.warning}</span>
                        </span>
                    </p>


                    {/* email */}
                    <p >
                        <label htmlFor="email">email</label>
                        <input 
                            value = {email.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onEmailRegister({email: e.target.value}))}}
                            type="email" id = 'email'  placeholder="xyz@gmail.com"
                        />
                        <span>message:  
                            <span className = {`${email.check ? "text-green-500 " : "text-red-500 "} px-3`}>{email.warning}</span>
                        </span>
                    </p>

                    {/* password */}
                    <p>
                        <label htmlFor="password">password</label>
                        <input 
                            value={password.pin}
                            onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onPasswordRegister({password: e.target.value}))}}
                            type={checkbox ? "text": 'password' }  id = 'password' placeholder="at last 8 characters" 
                        />
                        <span>message:  
                            <span className = {`${password.check ? "text-green-500 " : "text-red-500 "} px-3`}>{password.warning}</span>
                        </span>
                    </p>

                    {/* repeat password */}
                    <p>
                        <label htmlFor="rep_password">rep-password</label>
                        <input 
                            value = {repPassword.pin}
                            onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onRepeatPassowrdRegister({repPassword: e.target.value}))}}
                            type={checkbox ? "text": 'password' } id = 'rep_password' placeholder="at last 8 characters" 
                        />
                        <span>message:  
                            <span className = {`${repPassword.check ? "text-green-500 " : "text-red-500 "} px-3`}>{repPassword.warning}</span>
                        </span>
                    </p>

                    {/* input view & hidden type password */}
                    <p className="flex">
                        <label htmlFor="checkbox" className="text-sm!  w-31 " >
                            {checkbox ? 'hidden password' : 'show passowrd'}  
                        </label>
                        <input
                            className="w-4! " 
                            onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onCheckboxRegister({tick: e.target.checked}))}}
                            type = 'checkbox' id  = 'checkbox'
                        ></input>
                    </p>

                    {/* input submit */}
                    <p className=" ">
                        <input
                            disabled = {disabled} 
                            onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                                e.preventDefault()

                                // register thunk
                                dispatch(registerThunk({username: username.name, email: email.name, password: password.pin, repPassword: repPassword.pin}))
                            }}
                            type="submit" value = 'Sing Up' 
                            className={`
                                ${disabled ? "opacity-40" : 'opacity-100 cursor-pointer'}
                            `} 
                        />
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Register