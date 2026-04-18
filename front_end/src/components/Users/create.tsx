import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { AppDispatch, RooState } from "../../store"
import { onCheckboxRegister, onEmailRegister, onLoadingRegister, onPasswordRegister, onRepeatPassowrdRegister, onSubmitRegister, onUsernameRegister } from "../Auth/register/redux/registerSlice"
import { registerThunk } from "../Auth/register/redux/actonsRegister"


const CreateUsersPanelAdmin = () => {
    const {username, email, password, repPassword, checkbox, submit} = useSelector((state: RooState) => (state.register))
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
   

    useEffect(() => {
        if(submit){
            window.alert("ثبت نام باموفقیت انجام شد")
            dispatch(onSubmitRegister())
            navigate('/panelAdmin/users')
        }
    }, [submit])
    
    useEffect(() => {dispatch(onLoadingRegister())}, [])

    return(
        <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/users" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem] mb-14"
            >
                view users
            </Link>
            
            <form>

                {/* name */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="name" className="text-blue-500">name</label>
                    <input 
                        value={username.name} 
                        type="text" id = "name" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(onUsernameRegister({username: event.target.value}))}}
                    ></input>
                    
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className={`${username.check ? 'text-green-500': `text-red-500`} px-5`}>
                        {username.warning}
                    </span>
                </div>

                <hr className="my-8"/>
                {/* email */}
                <div className="flex gap-5 items-center justify-center ">
                    <label htmlFor="email" className="text-yellow-500">email</label>
                    <input 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(onEmailRegister({email: event.target.value}))}}
                        type="email" 
                        value={email.name} 
                        id = "email" className="border-2  rounded-md h-10 p-2 w-full"
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className={`${email.check ? 'text-green-500': `text-red-500`} px-5`}>
                        {email.warning}
                    </span>
                </div>
        
                <hr className="my-8"/>
                {/* passowrd */}
                <div className="flex gap-5 items-center justify-center ">
                    <label htmlFor="password" className="text-red-500">password</label>
                    <input 
                        value={password.pin}
                        type = {checkbox ? 'text' : 'password'} 
                        id = "password" 
                        className="border-2  rounded-md h-10 p-2 w-full"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(onPasswordRegister({password: event.target.value}))}}
                    >        
                    </input>
                </div>

                <div className="text-gray-500 py-5">message:
                    <span className={`${password.check ? 'text-green-500': `text-red-500`} px-5`}>
                        {password.warning}
                    </span>                
                </div>

                <hr className="my-8"/>
                {/* rep password */}

                <div className="flex gap-5 items-center justify-center ">
                    <label htmlFor="repPassword" className="text-red-500">rep-passowrd</label>
                    <input 
                        value={repPassword.pin}
                        type = {checkbox ? 'text' : 'password'} 
                        id = "repPassword" 
                        className="border-2  rounded-md h-10 p-2 w-full"
                         onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(onRepeatPassowrdRegister({repPassword: event.target.value}))}}
                    >        
                    </input>
                </div>
                
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        <span className={`${repPassword.check ? 'text-green-500': `text-red-500`} px-5`}>
                            {repPassword.warning}
                        </span>   
                    </span>
                </div>



                {/* checkbox show hidden password */}
                <div className="flex gap-2 items-center justify-left  pt-8">
                    <label htmlFor = "showpass"> {checkbox ? "hidden password" : "show password"} </label>
                    <input  
                        id = "showpass" type="checkbox"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(onCheckboxRegister({tick: event.target.checked}))}}
                    />
                </div>

                <hr className="my-8"/>

                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()
                            dispatch(registerThunk({username: username.name, email: email.name, password: password.pin, repPassword :repPassword.pin}));
                        }}                        
                        type="submit" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>
        
            </form>
        </div>
    )
}
export default CreateUsersPanelAdmin;