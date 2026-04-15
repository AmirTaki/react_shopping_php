import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type{ AppDispatch, RooState } from "../../../store"
import { changeAuth } from "../validation/redux/validationSlice"
import { onCheckboxRegister, onEmailRegister, onPasswordRegister, onRepeatPassowrdRegister, onUsernameRegister } from "./redux/registerSlice"

const Register = () => {
    const {username, email, password, repPassword, checkbox} = useSelector((state: RooState) => state.register)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(changeAuth({id: 0}))
    }, [])
    
    
    return(
        <div className="mx-auto w-[90%]    ">
            <div className="border-2  my-3 rounded-3xl  ">
                <form>
                    <div className="flex flex-col justify-center items-center my-10 ">

                        {/* username */}
                        <div className="flex flex-col w-[50%] gap-3">
                            <label htmlFor="username">username</label>
                            <input 
                                value = {username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onUsernameRegister({username: e.target.value}))}}
                                type="text" id = 'username' className="border-2  p-2"
                            />
                            <span>message:  
                                <span className="text-red-500"></span>
                            </span>
                        </div>

                        <div className="border-b-2 w-[50%] my-10"></div>

                        {/* email */}
                        <div className="flex flex-col w-[50%] gap-3">
                            <label htmlFor="email">email</label>
                            <input 
                                value = {email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onEmailRegister({email: e.target.value}))}}
                                type="email" id = 'email' className="border-2  p-2"
                            />
                            <span>message:  
                                <span className="text-red-500"></span>
                            </span>
                        </div>

                        <div className="border-b-2 w-[50%] my-10"></div>

                        {/* password */}
                        <div className="flex flex-col w-[50%] gap-3">
                            <label htmlFor="password">password</label>
                            <input 
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onPasswordRegister({password: e.target.value}))}}
                                type={checkbox ? "text": 'password' }  id = 'password' className="border-2  p-2"
                            />
                            <span>message:  
                                <span className="text-red-500"></span>
                            </span>
                        </div>

                        <div className="border-b-2 w-[50%] my-10"></div>

                        {/* repeat password */}
                        <div className="flex flex-col w-[50%] gap-3">
                            <label htmlFor="rep_password">rep-password</label>
                            <input 
                                value = {repPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onRepeatPassowrdRegister({repPassword: e.target.value}))}}
                                type={checkbox ? "text": 'password' } id = 'rep_password' className="border-2  p-2"
                            />
                            <span>message:  
                                <span className="text-red-500"></span>
                            </span>
                        </div>

                        {/* input view & hidden type password */}
                        <div className="flex my-8 w-[50%] gap-3">
                            <label htmlFor="checkbox">{checkbox ? 'hidden password' : 'show passowrd'} </label>
                            <input 
                                onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {dispatch(onCheckboxRegister({tick: e.target.checked}))}}
                                type = 'checkbox' id  = 'checkbox'
                            ></input>
                        </div>

                        <div className="border-b-2 w-[50%] my-3"></div>

                        {/* input submit */}
                        <div className="flex my-8 w-[50%] gap-3 justify-center items-center ">
                            <input 
                                onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                                    e.preventDefault()
                                    
                                }}
                                type="submit" value = 'register' className="border-2 w-[50%] p-2 rounded-xl cursor-pointer" 
                            />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register