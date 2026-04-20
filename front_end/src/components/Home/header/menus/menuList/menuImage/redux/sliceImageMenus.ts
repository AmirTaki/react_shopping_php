import { createSlice } from "@reduxjs/toolkit";
import {editImageMenuHeadersThunk, readingItemImageMenuThunk, changeStatusImageMenuThunk, deleteImageMenuHeadersThunk, viewImageMenuHeadresThunk, createImageMenuHeadersThunk } from "./actionsImageMenu";
import { imgURL } from "../../../../../../../baseURL";

export type TImageMenuHeader =  Array<{id: number, image: string,  list: string, title: string, body: string, status: number, created_at: string, updated_at: string }> | boolean  | string
export type TImageMenuHeaderObject = {id: number, image: string,  list: string, title: string, body: string, status: number, created_at: string, updated_at: string }

interface IImage{
    images: TImageMenuHeader | [],
    warningMessage: string,

    // cereate & edit 
    urlImage: string , // save image url
    image: {name: string ,warning: string},
    body: {name: string, warning: string},
    title: {name: string, warning: string},
    list: {name: string, warning: string},
    callback: boolean, 
    addItems: boolean,

    // delete & status
    loading: boolean
}

const initialState: IImage = {
    images:  [],
    warningMessage: '',

    // cereate & edit 
    urlImage: '' , // save image url
   
    image: {name: '' ,warning: ''},
    body:  {name: '' ,warning: ''},
    title: {name: '' ,warning: ''},
    list:  {name: '' ,warning: ''},
   
    callback: false, 
    addItems: false,

    // delete & status
    loading: false
}

const imageMenuSlice = createSlice({
    name: 'image_menus_slice_toolkit',
    initialState: initialState, 
    reducers: {
        onSetURLImage: (state, action) => {
            state.urlImage = action.payload.result
        },
        onImageMenus: (state, action) => {
            state.image = {name: action.payload.image, warning: ''}
        },
        onBodyImage: (state, action) => {
            state.body = {name: action.payload.body, warning: ''}
        }, 
        onTitleImage: (state, action) =>  {
            state.title = {name: action.payload.title, warning: ''}
        },
        onListImage: (state, action) => {
            state.list = {name: action.payload.list, warning: ''}
        },
        onWarningImage: (state, action) => {
            state.image = {name: state.image.name, warning: action.payload.image}
            state.body = {name: state.body.name, warning: action.payload.body},
            state.title = {name: state.title.name, warning: action.payload.title},
            state.list = {name: state.list.name, warning: action.payload.list}
        },
        onCallBackImage: (state) => {
            state.callback = true
        },
        onAddItemsImage: (state) => {
            state.addItems = false
        },
        onLoadingImage: (state) => {
            state.image = {name: '', warning: ""}
            state.title = {name: '', warning: ""}
            state.body = {name: '', warning: ""}
            state.list = {name: '', warning: ""}
        }

    },
    extraReducers: (builder) => {
        // view image menu headers
        builder.addCase(viewImageMenuHeadresThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewImageMenuHeadresThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewImageMenuHeadresThunk.fulfilled, (state, action) => {
            state.images = action.payload 
        })

        // create item image menu headers 
        builder.addCase(createImageMenuHeadersThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
            state.addItems = false
        })
        builder.addCase(createImageMenuHeadersThunk.rejected, (state, action) => {
            state.callback = false
            state.addItems = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(createImageMenuHeadersThunk.fulfilled, (state, action) => {
            state.callback = false
            state.addItems = action.payload === true ? true : false
        })

                // delete items image menu headers
        builder.addCase(deleteImageMenuHeadersThunk.pending, (state) => {
            state.loading = true
        }) 
        builder.addCase(deleteImageMenuHeadersThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        }) 
        builder.addCase(deleteImageMenuHeadersThunk.fulfilled, (state, action) => {
            state.loading = false 
            state.warningMessage  = ''
            state.images = action.payload
        }) 

        // status items image menu headers
        builder.addCase(changeStatusImageMenuThunk.pending, (state) => {
            state.loading = true
        }) 
        builder.addCase(changeStatusImageMenuThunk.rejected, (state, action) => {
            state.loading = false
            state.warningMessage = action.payload as string
        }) 
        builder.addCase(changeStatusImageMenuThunk.fulfilled, (state, action) => {
            state.loading = false 
            state.warningMessage  = ''
            state.images = action.payload
        }) 

          // reading itemms image menu headers
        builder.addCase(readingItemImageMenuThunk.pending, (state) => {
            state.warningMessage = ''
            state.urlImage = ''
        })
        builder.addCase(readingItemImageMenuThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingItemImageMenuThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            const answer = action.payload as TImageMenuHeaderObject
            state.image = {name: imgURL + answer.image , warning: ''},
            state.body = {name: answer.body, warning: ''},
            state.title = {name: answer.title, warning: ''},
            state.list = {name: answer.list, warning: ''}
        })

        // edit items image menu headers
        builder.addCase(editImageMenuHeadersThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
        })
        builder.addCase(editImageMenuHeadersThunk.rejected, (state, action) => {
            state.callback = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(editImageMenuHeadersThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
        })

    }
})

export default imageMenuSlice
export const {onBodyImage, onCallBackImage ,onImageMenus, onListImage, onTitleImage, onLoadingImage, onSetURLImage, onWarningImage, onAddItemsImage} = imageMenuSlice.actions