

interface ISideToSide {
    [key: string]: boolean
}

interface ISideState {
    SideToSide: ISideToSide
    hasInteracted: null | boolean   
}

export const SideState:ISideState = {
    SideToSide: {},
    hasInteracted: null
}
type TAction = 
    {type: 'open', payload: {id: number}}  |
    {type: 'close', payload: {id: number}} |
    {type: 'closeAll'} |
    {type: 'nullHasInteracted'}




export const reducerSideToSide = (state: ISideState, action: TAction): ISideState => {
    switch(action.type){
        case "open":
            return {...state, 
                hasInteracted: true, 
                SideToSide: {
                    ...state.SideToSide, [action.payload.id]: true
                }
            }

        case "close":
            return {...state,
                hasInteracted: false, 
                SideToSide: {...state.SideToSide, [action.payload.id]: false}
            }
        
        case "closeAll":
            const newSideToSide =  Object.keys(state.SideToSide).reduce<ISideToSide>((acc, key) => {
                acc[key] = false
                return acc
            }, {})
            return {...state, SideToSide: newSideToSide}

        case "nullHasInteracted":
            return {...state, hasInteracted: null}

        default:
            return state
    }

}