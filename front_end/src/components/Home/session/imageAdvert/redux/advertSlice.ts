import { createSlice } from "@reduxjs/toolkit";
import { editItemImageAdvertSessionThunk, deleteImageAdvertSessionThunk, changeStatusImageAdvertSessionThunk, createImageAdvertSessionThunk, readingAllItemsImageAdvertSessionThunk, viewImageAdvertSessionThunk, readingItemImageAdvertSessionThunk } from "./actionAdvert";
import { imgURL } from "../../../../../baseURL";

export type TImageAdvert = Array<{id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}> | string | boolean
export type TImageAdvertObject = {id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}

interface IScrollSlider {
    items: TImageAdvert ,
    counter: number,

    // panel admin
    warningMessage: string
    
    // create & edit
    urlImage: string , // save url image & view for user
    image: {url: string, warning: string} ,  // save view image for reading item
    body: {caption: string, warning: string},
    title: {name: string, warning: string},
    
    addItems: boolean, 
    callback: boolean,


    // stauts & delete
    loading: boolean
}

const initialState: IScrollSlider = {
    items: [],
    counter: 0,
    
    // panel admin
    warningMessage: '',

    // create & edit
    urlImage: '' , // save url image & view for user
    image: {url: '', warning: ''} ,  // save view image for reading item
    body: {caption: '', warning: ''},
    title: {name: '', warning: ''},
    
    addItems: false, 
    callback: false,


    // stauts & delete
    loading: false
}

const advertSlice = createSlice({
    name: 'scroll_slider_toolkit',
    initialState: initialState,
    reducers: {
        handlerScrollTo: (state, action) => {
            const {index} = action.payload
            const maxIndex =  Array.isArray(state.items) ? state.items.length - 1 : 0
            const newIndex = Math.max(0, Math.min(index, maxIndex))
            state.counter = newIndex
        },

        handlerButtons: (state, action) => {
            state.counter = action.payload.index
        },

        // panel adimin
        onLoadingAdvert: (state) => {
            state.image = {url: '', warning: ''},
            state.body = {caption: '', warning: ''},
            state.title = {name: '', warning: ''},
            state.urlImage = ''
        },
        onSetItemsAdvert: (state) => {
            state.addItems = false
        },
        onSetURLAdvert: (state, action) => {
            state.urlImage = action.payload.result
        },
        onTitleAdvert: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onBodyAdvert: (state, action) => {
            state.body = {caption: action.payload.body, warning: ''}
        },
        onWarningAdvert: (state, action) => {
            state.body = {caption: state.body.caption, warning: action.payload.body},
            state.image = {url: state.image.url, warning: action.payload.image},
            state.title = {name: state.title.name, warning: action.payload.title}
        },
        onCallBackAdvert: (state) => {
            state.callback = true
        }
        
    },
    extraReducers: (builder) => {
        // view item image advert : advert image
        builder.addCase(viewImageAdvertSessionThunk.pending, (state) =>  {
            state.warningMessage = ''
        })
        builder.addCase(viewImageAdvertSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })


        // create item image advert : advert image
        builder.addCase(createImageAdvertSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.callback = false
        })
        builder.addCase(createImageAdvertSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(createImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.callback = false
            state.addItems = action.payload === true ? true : false
            state.warningMessage = ''
        })

        // delete item image advert : advert image
        builder.addCase(deleteImageAdvertSessionThunk.pending, (state, ) => {
            state.loading = true;
            state.warningMessage = ''
        })
        builder.addCase(deleteImageAdvertSessionThunk.rejected, (state, action) => {
            state.loading = false;
            state.warningMessage = action.payload as string
        })
        builder.addCase(deleteImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.loading = true
            state.warningMessage = ''
            state.items = action.payload
        })

        // change status item image advert: advert image
        builder.addCase(changeStatusImageAdvertSessionThunk.pending, (state, ) => {
            state.loading = true;
            state.warningMessage = ''
        })
        builder.addCase(changeStatusImageAdvertSessionThunk.rejected, (state, action) => {
            state.loading = false;
            state.warningMessage = action.payload as string
        })
        builder.addCase(changeStatusImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.loading = true
            state.warningMessage = ''
            state.items = action.payload
        })

        
        // reading item image advert: advert image
        builder.addCase(readingItemImageAdvertSessionThunk.pending, (state) => {
            state.warningMessage = ''
            state.urlImage =''
        })
        builder.addCase(readingItemImageAdvertSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingItemImageAdvertSessionThunk.fulfilled, (state, action) => {
            const advert = action.payload as TImageAdvertObject
            state.body = {caption: advert.body, warning: ''}
            state.title = {name: advert.title, warning: ''}
            state.urlImage = imgURL + advert.image
            
        })

        // edit item image advert: advert image
        builder.addCase(editItemImageAdvertSessionThunk.pending, (state) => {
            state.callback = false
            state.warningMessage = ''
        })
        builder.addCase(editItemImageAdvertSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
            state.callback = false
            state.addItems = false
        })
        builder.addCase(editItemImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
            state.warningMessage = ''
        })

        
        //  reading all items image advert: advert image
        builder.addCase(readingAllItemsImageAdvertSessionThunk.pending, (state) =>  {
            state.warningMessage = ''
        })
        builder.addCase(readingAllItemsImageAdvertSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingAllItemsImageAdvertSessionThunk.fulfilled, (state, action) => {
            state.items = action.payload
            state.warningMessage = ''
        })

    }
            
})
export default advertSlice;
export const {handlerScrollTo, handlerButtons, onBodyAdvert, onCallBackAdvert, onLoadingAdvert,  onSetItemsAdvert, onSetURLAdvert, onTitleAdvert, onWarningAdvert} = advertSlice.actions