const RedcuerPayloar = (state: typeof initialPayloar, action:ActionType ): typeof initialPayloar => {
    switch(action.type){
    
        case "handlerScroll": 
            return {...state, scroll: action.payload.offset}

        case "right":
            var {container} = action.payload
   
            if(container){
                container.style.scrollBehavior = 'smooth'
                container.scrollLeft += 400
            }
            return {...state, 
                scroll : state.scroll + 400 >= state.sizeItems - state.widthContainer ? (state.sizeItems - state.widthContainer) - state.scroll :  state.scroll + 400
            }

        case "left":
            var {container} = action.payload
            if(container){
                container.style.scrollBehavior = 'smooth'
                container.scrollLeft -= 400
            }
            return {...state,
                scroll : state.scroll - 400 <= 0 ? 0 : state.scroll - 400
            }

        case "widthContainer":
            return {...state, widthContainer: action.payload.offset}

        case "sizeHandler": 
            const size = (state.items.length * 300) + (state.items.length * 20)
            return {...state, sizeItems: size}

        case "mouseDown" : 
            var {container} = action.payload
            var {client} = action.payload

            state.isDrag = true
            if(container){
                container.style.scrollBehavior = 'auto'
                return {...state, startX: client, stratScrollLeft: container.scrollLeft}
            }
            return {...state}

        case "mouseMove": 
            if(state.isDrag){
                const {client} = action.payload
                const {container} = action.payload
                
                if(container){
                    const drag = client - state.startX;
                    container.scrollLeft = state.stratScrollLeft - drag
                
                    return {...state, dragOffset: drag }
                }

            }
            return {...state}
        
        case "mouseUp":
            if(state.isDrag){
                const {container} = action.payload
                
                if(container){
                    container.style.scrollBehavior = 'smooth'
                    container.scrollLeft -= state.dragOffset
                    return {...state, isDrag: false, dragOffset: 0,  startX: 0, stratScrollLeft: 0}
                }
                
            }
            return {...state}
        

        default: 
            return state
    }
}

export default RedcuerPayloar


type ActionType =   
 {type : 'right', payload: {container: HTMLDivElement | null}} |
 {type : 'left', payload: {container: HTMLDivElement | null}} | 
 {type: 'widthContainer', payload: {offset: number}} |
 {type: 'sizeHandler' } |
 {type: 'mouseDown', payload: {client: number, container: HTMLDivElement | null}} |
 {type: 'mouseMove', payload: {client: number, container: HTMLDivElement | null} } |
 {type: 'mouseUp', payload: {container: HTMLDivElement | null}} |
 {type: 'handlerScroll', payload: {offset: number}}


interface IPayloar {
    items: Array<string>,
    scroll: number,
    sizeItems: number, 
    widthContainer: number,
    isDrag: boolean,
    startX: number, 
    stratScrollLeft: number,
    dragOffset: number,

}

export const initialPayloar: IPayloar = {
    items : ['blue', 'red', 'yellow', 'pink', 'brown', 'green', 'gray', 'orange', 'silver','blue', 'red', 'yellow', 'pink', 'brown', 'green', 'gray', 'orange', 'silver',],
    scroll: 0,
    sizeItems: 0,
    widthContainer: 0,
    isDrag: false,
    startX: 0, 
    stratScrollLeft: 0,
    dragOffset: 0
}