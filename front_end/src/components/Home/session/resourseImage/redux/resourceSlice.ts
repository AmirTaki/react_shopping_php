import { createSlice } from "@reduxjs/toolkit";
import { editItemResourceImageSessionThunk, readingItemResourcImageSessionThunk, viewResourceImageSessionThunk, readingAllResourceImageSessionThnk, createResourceImageSessionThunk, deleteResourceImageSessionThunk, changeStatusResourceImageSessionThunk } from "./actionsResourse";
import { imgURL } from "../../../../../baseURL";

export type TResouceImage = Array<{id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}> | string | boolean
export type TResouceImageObject = {id: number, image: string, title: string, body: string, status: number, created_at: string, updated_at: string}

interface IPayloar {
    items: TResouceImage,
    translateX: number,
    isTransition: boolean,
    widthContainer: number,
    isDrag: boolean,
    startX: number,
    currentX: number,
    dragOffset: number,
    sizeContainer: number,
    widthScroll: number,
    sizeThumble: number,
    isScroll: boolean,
    startScroll: number,
    currentScroll: number,
    dragScroll: number,
    translateThumble: number

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
const initialState: IPayloar = {
    items: [],
   
    // scroll slide
    translateX: 0,
    isTransition: true,
    widthContainer: 0,
    isDrag: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,

    // scroll thumb
    sizeContainer: 0,
    widthScroll: 0,
    sizeThumble: 0,
    isScroll: false,
    startScroll: 0,
    currentScroll: 0,
    dragScroll: 0,

    translateThumble: 0,

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

const resourceImageSlice = createSlice({
    name: 'payloar_toolkit',
    initialState: initialState,
    reducers: {
        handlerSizeContainer: (state) => {
            if(Array.isArray(state.items)){
                const sizeRef = (state.items.length * 350) + (state.items.length * 20)
                state.sizeContainer = sizeRef - state.widthContainer
            }
        },
        rightClick: (state, action) => {           
            const newTranslate = state.translateX + action.payload.distance >= state.sizeContainer ? state.sizeContainer - state.translateX : action.payload.distance
            
            state.isTransition = true
            state.translateX += newTranslate
        },
        leftClick: (state, action) => {
            const newTranslate = state.translateX - action.payload.distance <= 0 ? state.translateX : action.payload.distance
           
            state.isTransition = true,
            state.translateX -= newTranslate
        },
        endTranistion: (state) => {
            state.isTransition = false
        },
        handlerWidthContainer: (state, action) => {
            state.widthContainer = action.payload.offset
        },  
        payloarDown: (state, action) => {
            state.isDrag = true
            state.startX = action.payload.client
            state.isTransition = false
        },
        payloarMove: (state, action) => {
            if (state.isDrag){
                state.currentX = action.payload.client
                state.dragOffset = state.currentX - state.startX
            }
        },
        payloarUp: (state, ) => {
            if(state.isDrag){
                state.isDrag = false
               
                if(state.dragOffset > 0){
                    const newTranslate = state.translateX - (state.dragOffset * 2) <= 0 ? state.translateX : state.dragOffset * 2
                    state.isTransition = true,
                    state.translateX -= newTranslate
                }
               
                else if(state.dragOffset < 0){
                    const newTranslate = state.translateX + (-state.dragOffset * 2) >= state.sizeContainer ? state.sizeContainer - state.translateX : -state.dragOffset * 2
                    state.isTransition = true
                    state.translateX += newTranslate
                }
               
                else {
                    state.isTransition = true
                }
                state.dragOffset = 0
            }
        },
   
        handlerContainerScroll: (state, action) => {
            state.widthScroll = action.payload.offset
        },
        sizeThumbe: (state,) => {
            if(Array.isArray(state.items)){
                const size = (state.items.length * 350) + (state.items.length * 20) 
                state.sizeThumble =  state.widthScroll / ( size / state.widthContainer )
            }

        },
        scrollStart: (state, action) => {
            state.isScroll = true
            state.startScroll =  action.payload.client
            state.isTransition = false
        },
        scrollMove: (state, action) => {
            if(!state.isScroll) return;
            state.currentScroll = action.payload.client  
            state.dragScroll = state.currentScroll - state.startScroll
            
        },
        scrollUp: (state) => {
            if(!state.isScroll) return;

            state.isScroll = false;

            if(Array.isArray(state.items)){

                if(state.currentScroll > state.startScroll){
    
                    const translate = state.dragScroll * (((state.items.length * 350) + (state.items.length * 20)) / state.widthContainer)
    
                    const newTranslate = state.translateX + translate >= state.sizeContainer ? state.sizeContainer - state.translateX : translate
                
                    state.isTransition = true
                    state.translateX += newTranslate
                }
                else if (state.currentScroll < state.startScroll){
                    const translate = - state.dragScroll * (((state.items.length * 350) + (state.items.length * 20)) / state.widthContainer)
                    
                    const newTranslate = state.translateX - translate <= 0 ? state.translateX : translate
            
                    state.isTransition = true,
                    state.translateX -= newTranslate
                }
                else {
                    state.isTransition = true
                }
            }

            state.dragScroll = 0
        },
        handlerTranslateThumble: (state, action) => {
            state.translateThumble= action.payload.thumble
        },

        // panel admin
        onLoadingResource: (state) => {
            state.urlImage = ''
            state.body = {caption: '', warning: ''},
            state.title = {name: '', warning: ''},
            state.image = {url: '', warning: ''}
        },
        onSetURLResource:  (state, action) => {
            state.urlImage = action.payload.result
        },
        onTitleResource: (state, action) => {
            state.title = {name: action.payload.title, warning: ''}
        },
        onBodyResource: (state, action) => {
            state.body = {caption: action.payload.body, warning: ''}
        },
        onImageResource: (state, action) => {
            state.image = {url: action.payload.image, warning: ''}
        },
        onWarningResource: (state, action) => {
            state.title = {name: state.title.name, warning: action.payload.title}
            state.body = {caption: state.body.caption, warning: action.payload.body}
            state.image = {url: state.image.url, warning: action.payload.image}
        },
        onCallBackResource: (state) => {
            state.callback = true
        },
        onSetItemsResource: (state) => {
            state.addItems = false
        }
        

    },
    extraReducers: (builder) => {
        
        // veiw items resource image
        builder.addCase(viewResourceImageSessionThunk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(viewResourceImageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(viewResourceImageSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload
        })

        // create item resource image
        builder.addCase(createResourceImageSessionThunk.pending, (state) => {
            state.addItems = false
            state.callback = false
            state.warningMessage = ''
        })
        builder.addCase(createResourceImageSessionThunk.rejected, (state, action) => {
            state.addItems = false
            state.callback = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(createResourceImageSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
            state.warningMessage = ''
        })

              // delete item reosurce image
        builder.addCase(deleteResourceImageSessionThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(deleteResourceImageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload  as string
            state.loading = false
        })
        builder.addCase(deleteResourceImageSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.items = action.payload
        })

        // change status item resource image 
        builder.addCase(changeStatusResourceImageSessionThunk.pending, (state) => {
            state.loading = true
            state.warningMessage = ''
        })
        builder.addCase(changeStatusResourceImageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload  as string
            state.loading = false
        })
        builder.addCase(changeStatusResourceImageSessionThunk.fulfilled, (state, action) => {
            state.loading = false
            state.warningMessage = ''
            state.items = action.payload
        })

        // reading item resourc image
        builder.addCase(readingItemResourcImageSessionThunk.pending, (state) => {
            state.urlImage = ''
            state.warningMessage = ''

        })
        builder.addCase(readingItemResourcImageSessionThunk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingItemResourcImageSessionThunk.fulfilled, (state, action) => {
            state.warningMessage = ''
            const answer = action.payload as TResouceImageObject
            state.body = {caption: answer.body, warning: ''}
            state.title = {name: answer.title, warning: ''}
            state.urlImage = imgURL + answer.image
        })

        // edit item resource image
        builder.addCase(editItemResourceImageSessionThunk.pending, (state) => {
            state.addItems = false
            state.callback = false
            state.warningMessage = ''
        })
        builder.addCase(editItemResourceImageSessionThunk.rejected, (state, action) => {
            state.callback = false
            state.warningMessage = action.payload as string
        })
        builder.addCase(editItemResourceImageSessionThunk.fulfilled, (state, action) => {
            state.addItems = action.payload === true ? true : false
            state.callback = false
            state.warningMessage = ''
        })

        // reading all itemss resource image
        builder.addCase(readingAllResourceImageSessionThnk.pending, (state) => {
            state.warningMessage = ''
        })
        builder.addCase(readingAllResourceImageSessionThnk.rejected, (state, action) => {
            state.warningMessage = action.payload as string
        })
        builder.addCase(readingAllResourceImageSessionThnk.fulfilled, (state, action) => {
            state.warningMessage = ''
            state.items = action.payload
        })

    }
})

export default resourceImageSlice
export const {rightClick, endTranistion, leftClick, handlerWidthContainer, payloarDown, payloarMove, payloarUp, handlerSizeContainer, handlerContainerScroll ,sizeThumbe, scrollStart, scrollMove, scrollUp, handlerTranslateThumble, 

    onBodyResource, onCallBackResource, onImageResource, onLoadingResource, onSetItemsResource, onSetURLResource, onTitleResource, onWarningResource
} = resourceImageSlice.actions