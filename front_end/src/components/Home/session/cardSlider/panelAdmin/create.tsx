import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RooState, AppDispatch } from "../../../../../store";
import { useEffect, useState } from "react";
import { onLoadingCard, onCallBackCard, onSetItemsCard, onSetURLCard, onTitleCard,  } from "../redux/cardSlice";
import { createCardSliderSessionThunk } from "../redux/actionCard";

const CreateCardSliderSessionPA = () => {
    const {urlImage, title, image, callback, addItems} = useSelector((state: RooState) => state.card )
    const dispatch = useDispatch<AppDispatch>();
    const [file, setFile] = useState<File | null>()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(onLoadingCard())
    }, [])

    useEffect(() => {
        callback && navigate('/LogOut')
    }, [callback])

    useEffect(() => {
        if(addItems){
            navigate('/panelAdmin/sessionCardSlider')
            dispatch(onSetItemsCard())
        }
    }, [addItems])


    const  handlerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        setFile(file)
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(onSetURLCard({result: reader.result}))
            }
            reader.readAsDataURL(file);
        }
    }
    return (
        <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/sessionCardSlider" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.1rem] mb-14"
            >
                view card
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
                        {image.warning}
                    </span>
                </div>
                
                <hr className="my-8"/>

                {/* title */}
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="title" className="text-blue-500">title</label>
                    <input 
                        value = {title.name}
                        type="text" id = "title" className="border-2 w-full rounded-md h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(onTitleCard({title: e.target.value}))}}
                    ></input>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {title.warning}
                    </span>
                </div>

                                    
                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()

                            const formData = new FormData();
                            file &&  formData.append('image', file)
                            formData.append('title', title.name)
            
                            dispatch(createCardSliderSessionThunk(formData));
                        }}                        
                        type="submit" value = "Add" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>

            </form>
        </div>
    )
}

export default CreateCardSliderSessionPA;