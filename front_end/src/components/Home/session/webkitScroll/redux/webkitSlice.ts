import { createSlice } from "@reduxjs/toolkit"
import { readingItemWebkitScrollSessionThunk, editItemWebkitScrollSessionThunk, viewWebkitScrollSessionThunk, createWebkitScrollSessionThunk, deleteWebkitScrollSessionThunk, changeStatusWebkitScrollSessionThunk } from "./actionsWebkit"
import { imgURL } from "../../../../../baseURL"

export type TWebkit = Array<{id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}> | string | boolean
export type TWebkitObject = {id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}

interface IWebkit {
    items: TWebkit,

    // panel admin
    warningMessage: string,

    // create & edit
    urlImage: string , // save url image & view for user

    image: {url: string, warning: string},
    title: {name: string, warning: string},
    body: {caption: string, warning: string},

    addItems: boolean, 
    callback: boolean,

    // stauts & delete
    loading: boolean
}
const initialState: IWebkit = {
    items: [],

    // panel admin
    warningMessage: '',

    // create & edit
    urlImage: '' , // save url image & view for user
   
    image: {url: '', warning: ''},
    title: {name: '', warning: ''},
    body: {caption: '', warning: ''},
     
    addItems: false, 
    callback: false,

    // stauts & delete
    loading: false
}

const webkitScrollSlice = createSlice({
    name: 'webkit_scroll_toolkit', 
    initialState: initialState,
    reducers: {
        // panel admin
        onLoadingWebkit: (state) => {
            state.urlImage = ''
            state.body = {caption: '', warning: ''},
            state.title = {name: '', warning: ''},
            state.image = {url: '', warning: ''}
        },
        onSetURLWebkit:  (state, action) => {
            state.urlImage = action.payload.result
        },
        onTitleWebkit: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onBodyWebkit: (state, action) => {
            state.body = {caption: action.payload.body, warning: ''}
        },
        onImageWebkit: (state, action) => {
            state.image = {url: action.payload.image, warning: ''}
        },
        onWarningWebkit: (state, action) => {
            state.title = {name: state.title.name, warning: action.payload.title}
            state.body = {caption: state.body.caption, warning: action.payload.body}
            state.image = {url: state.image.url, warning: action.payload.image}
        },
        onCallBackWebkit: (state) => {
            state.callback = true
        },
        onSetItemsWebkit: (state) => {
            state.addItems = false
        }
    },
    extraReducers: (builder) => {
        // veiw items resource image
        builder.addCase(viewWebkitScrollSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewWebkitScrollSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewWebkitScrollSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload
        })

        // create item resource image
        builder.addCase(createWebkitScrollSessionThunk.pending, (state) => {
            state.addItems = false
            state.callback = false
            state.warningMessage = ''
        })
        builder.addCase(createWebkitScrollSessionThunk.rejected, (state, action) => {
            state.addItems = false
            state.callback = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(createWebkitScrollSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
            state.warningMessage = ''
        })

        // delete item reosurce image
        builder.addCase(deleteWebkitScrollSessionThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(deleteWebkitScrollSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload  as string
            state.loading = false
        })
        builder.addCase(deleteWebkitScrollSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.items = action.payload
        })

        // change status item resource image 
        builder.addCase(changeStatusWebkitScrollSessionThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(changeStatusWebkitScrollSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload  as string
            state.loading = false
        })
        builder.addCase(changeStatusWebkitScrollSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.items = action.payload
        })

        
        // reading item resourc image
        builder.addCase(readingItemWebkitScrollSessionThunk.pending, (state) => {
            state.urlImage = ''
            state.warningMessage = ''

        })
        builder.addCase(readingItemWebkitScrollSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingItemWebkitScrollSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            const answer = action.payload as TWebkitObject
            state.body = {caption: answer.body, warning: ''}
            state.title = {name: answer.title, warning: ''}
            state.urlImage = imgURL + answer.image
        })

        // edit item resource image
        builder.addCase(editItemWebkitScrollSessionThunk.pending, (state) => {
            state.addItems = false
            state.callback = false
            state.warningMessage = ''
        })
        builder.addCase(editItemWebkitScrollSessionThunk.rejected, (state, action) => {
            state.callback = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(editItemWebkitScrollSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
            state.warningMessage = ''
        })
    }
})

export default webkitScrollSlice
export const {onBodyWebkit, onCallBackWebkit, onImageWebkit, onLoadingWebkit, onSetItemsWebkit, onSetURLWebkit,  onTitleWebkit,  onWarningWebkit,

 } = webkitScrollSlice.actions