import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import type { AppDispatch, RooState } from "../../../../../../../../store";
import { useEffect, useState } from "react";
import { onAddItemsImage, onBodyImage, onListImage, onLoadingImage, onSetURLImage, onTitleImage } from "../redux/sliceImageMenus";
import { viewMenusHeaders } from "../../../../redux/actionsMenus";
import { foundItemsListHeadersThunk, viewListHeadersThunk } from "../../../redux/actionsMenuList";
import { createImageMenuHeadersThunk } from "../redux/actionsImageMenu";


const CreateMegaMenuImagePA = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [file, setFile] = useState<File | null>()
    
    const {image, title, urlImage, list, callback, addItems, body} = useSelector((state: RooState) => state.imagesMenus)
    const {Menus } = useSelector((state: RooState) => (state.menus))
    const {Lists } = useSelector((state: RooState) => (state.lists))

    useEffect(() => {
        dispatch(onLoadingImage())
        dispatch(viewMenusHeaders())
        dispatch(viewListHeadersThunk())
    }, [])

    useEffect(() => {
        title.name !== "" &&   dispatch(foundItemsListHeadersThunk({title: title.name}))
    }, [title])

    useEffect(() => {
        callback && navigate('/LogOut')
    }, [callback])

    useEffect(() => {
        if(addItems){
            navigate('/panelAdmin/megaMenuImage')
            dispatch(onAddItemsImage())
        }
    }, [addItems])

   const handlerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        setFile(file)
        if(file){
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(onSetURLImage({result: reader.result}))
            };
            reader.readAsDataURL(file);
        }
    }

    return(
          <div className={`flex flex-col w-[30%]`}>
            <Link to = "/panelAdmin/megaMenuImage" 
                className="text-center text-4xl my-3 cursor-pointer hover:text-sky-500 duration-200 hover:tracking-[.1rem] mb-14"
            >
                view image headers  
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

                    {/* caption -> body*/} 
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="caption" className="text-blue-500">caption</label>
                    <textarea 
                        value = {body.name}
                        id = "caption" className="border-2  w-full rounded-md h-30 p-2"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {dispatch(onBodyImage({body: e.target.value}))}}
                    ></textarea>
                </div>
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {body.warning}
                    </span>
                </div>

                <hr className="my-8"/>
                {/* title */}
                <div className="flex gap-5 items-center justify-center">
                    
                    <label htmlFor="title" className="text-blue-500">title</label>
                    <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {dispatch(onTitleImage({title: e.target.value}))}}
                        id = "title" className="bg-[#252525]!  text-white border-2  w-full rounded-md h-13 p-2 "
                    >
                        <option value= "" className="hidden">select one option ?</option>
                        {Array.isArray(Menus) && Menus?.map((item) => {
                            return(
                                <option  key = {item.id} value={item.title}>
                                    {item.title}
                                </option>
                            )
                        })}
                    </select>
                </div> 
                
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {title.warning}
                    </span>
                </div>
                
                <hr className="my-8"/>
                {/* list */}
                <div className="flex gap-5 items-center justify-center">
                    
                    <label htmlFor="list" className="text-blue-500">list</label>
                    <select
                        onChange={(e :React.ChangeEvent<HTMLSelectElement>) => {dispatch(onListImage({list: e.target.value}))}}
                        id = "list" className="bg-[#252525]!  text-white border-2  w-full rounded-md h-13 p-2 "
                    >
                        <option value= "" className="hidden">select one option ?</option>
                        {Array.isArray(Lists) && Lists?.map((item) => {
                            return(
                                <option  key = {item.id} value={item.list}>
                                    {item.list}
                                </option>
                            )
                        })}
                    </select>
                </div> 
                
                <div className="text-gray-500 py-5">message:
                    <span className="text-red-600 px-2">
                        {list.warning}
                    </span>
                </div>
                                    
                <div className="flex justify-center items-center">
                    <input 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                            event.preventDefault()

                            const formData = new FormData();
                            file &&  formData.append('image', file)
                            formData.append('body', body.name)
                            formData.append('list', list.name)
                            formData.append('title', title.name)
            
                            dispatch(createImageMenuHeadersThunk(formData));
                        }}                        
                        type="submit" value = "Add" 
                        className="border-2 px-4 py-2 rounded-xl cursor-pointer hover:text-green-600 duration-300 hover:border-green-600" 
                    />
                </div>

            </form>
        
        </div>
    )
}
export default CreateMegaMenuImagePA;