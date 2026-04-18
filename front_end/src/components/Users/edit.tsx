import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RooState } from "../../store";
import { editUserThunk, ReadingUserThunk } from "../Auth/register/redux/actonsRegister";
import { onCheckboxRegister, onEmailRegister, onLeavelRegister, onLoadingRegister, onPasswordRegister, onRepeatPassowrdRegister, onSubmitRegister, onUsernameRegister } from "../Auth/register/redux/registerSlice";

const EditUsersPanelAdmin = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {username, email, password, repPassword, checkbox, submit, level, levels} = useSelector((state: RooState) => (state.register))
    const dispatch =  useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(onLoadingRegister())
        dispatch(ReadingUserThunk({id: Number(id)}))
   
    }, [])
    useEffect(() => {
        if(submit){
            window.alert("تغییرات باموفقیت انجام شد")
            dispatch(onSubmitRegister())
            navigate('/panelAdmin/users');
        }
    }, [submit])



    return(
        <div className={`flex flex-col w-[30%]`}>

            <Link to = "/panelAdmin/users" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.3rem] mb-14"
            >
                view users 
            </Link>
            {/* form */}
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
                    <span   className={`${username.check ? 'text-green-500' : 'text-red-500'} absolute`}>
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
                   <span className={`${username.check ? 'text-green-500' : 'text-red-500'} absolute`}>
                        {email.warning}
                    </span>
                </div>
        
                <hr className="my-8"/>

                {/* level */}
                <div className="flex gap-5 items-center justify-center ">
                    <label htmlFor="level" className="text-yellow-500">level</label>
                    <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(onLeavelRegister({level: e.target.value}))}}
                        id = "level" className="bg-[#252525]!  text-white border-2 w-full rounded-md h-13 p-2 "
                    >
                        {Array.isArray(levels) && levels?.map((item, ind) => {
                            return(
                                <option  
                                    key = {ind} 
                                    selected = {item.access === level}
                                    value={item.access}
                                >
                                    {item.access}: {item.message}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="text-gray-500 py-5">message:
                   <span className={`${username.check ? 'text-green-500' : 'text-red-500'} absolute`}>
                        {/* {email.warning} */}
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
                     <span className={`text-red-500 px-5`}>
                        {password.warning}
                    </span>
                </div>

                <hr className="my-8"/>
                {/* rep password */}

                <div className="flex gap-5 items-center justify-center ">
                    <label htmlFor="repPassword" className="text-red-500">rep-passowrd</label>
                    <input 
                        type = {checkbox ? 'text' : 'password'} 
                        id = "repPassword" 
                        value={repPassword.pin}
                        className="border-2  rounded-md h-10 p-2 w-full"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(onRepeatPassowrdRegister({repPassword: event.target.value}))}}
                    >        
                    </input>
                </div>
                
                <div className="text-gray-500 py-5">message:
                    <span className={`text-red-500 px-5`}>
                        {repPassword.warning}
                    </span>
                </div>



                {/* checkbox show hidden password */}
                <div className="flex justify-between  items-center">
                    <div className="flex gap-2 items-center justify-left  pt-8">
                        <label htmlFor = "showpass"> {checkbox ? "hidden password" : "show password"} </label>
                        <input  
                            id = "showpass" type="checkbox"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {dispatch(onCheckboxRegister({tick: event.target.checked}))}}
                        />
                    </div>
             
                </div>

                <hr className="my-8"/>

                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()
                            dispatch(editUserThunk({
                                username: username.name,
                                email: email.name,
                                password: password.pin,
                                repPassowrd: repPassword.pin,
                                level: level,
                                id: Number(id)
                            }))
                        
                        }}                        
                        type="submit" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>
        
            </form>
        </div>
    )
}

export default EditUsersPanelAdmin;