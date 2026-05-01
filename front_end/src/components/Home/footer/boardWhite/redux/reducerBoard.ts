
type IActionColumn = 
{type: 'openClose', payload: {id: number}} | {type: 'closeAll'} 


interface IColumnRows {
    [key: string]: boolean
}

interface IColumnSection  {
    columnsRows: IColumnRows,
}
export const initialBaord: IColumnSection = {
    columnsRows: {},   
}
export const reducerBoard = (state: IColumnSection, action: IActionColumn): IColumnSection => {
    switch(action.type){
        case "openClose":
            return {...state, 
                columnsRows: {...state.columnsRows, 
                    [action.payload.id]: state.columnsRows[action.payload.id] ? false: true,
                }
            }

        case "closeAll": 
            const newColumnRows = Object.keys(state.columnsRows).reduce<IColumnRows>((acc, key) => {
                acc[key] = false
                return acc
            }, {})
            return {...state,  columnsRows: newColumnRows, }
        
   
        default:
            return state
    }
}
