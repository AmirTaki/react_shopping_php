import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RooState, AppDispatch } from "../../../../../store";
// import { onSetURL, onTitleChange, onBodyChange, onPriceChange, onLoading, onSetItems } from "../../../../redux/scrollImage/scrollImage";
// import { createScrollSliderSessionThunk } from "./actionsScrollSlider";

const CreateSessionScrollSliderPA = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {boxses, loading} = useSelector((state: RooState) => state.scrollPayloar)
    const [file, setFile] = useState<File | null>()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(onLoading()) 
    }, [])
    
    useEffect(() => {  callback && navigate('/LogOut') }, [callback])
    
    useEffect(() => {
        if(addItems){
            navigate('/panelAdmin/sessionScrollSlider')
            dispatch(onSetItems())
        }
    }, [addItems])

    const  handlerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        setFile(file)
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(onSetURL({result: reader.result}))
            }
            reader.readAsDataURL(file);
        }
    }

    return(
        <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/sessionScrollSlider" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.1rem] mb-14"
            >
                view boxes slider  
            </Link>
            
            <form  
                // enctype="multipart/form-data"
            >
                {/* image view */}
                <div className="flex gap-5 items-center justify-center m-4">
                    {urlImage && (
                        <img src={urlImage} style={{width: 250}}></img>
                    )}
                </div>

                {/* image */}
                <div className="flex gap-5 items-center justify-center">
                    

                    <label htmlFor="image" className="text-blue-500">image</label>
                    <input 
                        type="file" id = "image" className="border-2 w-full rounded-md h-10 p-2"
                        placeholder="select image ...." 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handlerImageChange(e)}}
                        accept="image/*"
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {imageWarning}
                    </span>
                </div>
                
                <hr className="my-8"/>

                {/* title */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="title" className="text-blue-500">title</label>
                    <input 
                        value = {title}
                        type="text" id = "title" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onTitleChange({title: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {titleWarning}
                    </span>
                </div>

                <hr className="my-8"/>  

                {/* body */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="body" className="text-blue-500">caption</label>
                
                    <textarea
                        id = 'body'
                        value = {body}
                        className="border-2 w-full rounded-md h-23  p-1"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {dispatch(onBodyChange({body: e.target.value}))}}
                    ></textarea>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {bodyWarning}
                    </span>
                </div>

                <hr className="my-8"/>    
                
                {/* price */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="price" className="text-blue-500">price</label>
                    <input 
                        value = {price}
                        type="number" id = "price" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onPriceChange({price: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {priceWarning}
                    </span>
                </div>      

                                    
                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()

                            const formData = new FormData();
                            file &&  formData.append('image', file)
                            formData.append('title', title)
                            formData.append('body', body)
                            formData.append('price', String(price))
            
                            dispatch(createScrollSliderSessionThunk(formData));
                        }}                        
                        type="submit" value = "Add" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>

            </form>
        </div>
    )
}
export default CreateSessionScrollSliderPA;