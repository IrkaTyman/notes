import React, { createContext, useReducer } from "react";
import type {note} from '../types'

// Types for Context
type Action = {type:'set_last_id', payload:number} |  {type:'set_note',payload:note}
type State = typeof initialState;
 
//Initial State
const initialState:{note:note,route:string,lastIdOfNote:number}= {
    note:{id:-1,priority:0,title:'',creationTime:0, theme:'',changeTime:0},
    route:'home',
    lastIdOfNote:0
}

function reducer(state:State,action:Action){
    switch(action.type){
        case 'set_last_id':
            return{
                ...state,
                lastIdOfNote:action.payload
            }
        case 'set_note':
            return{
                ...state,
                note:action.payload
            }
    }
}

export const Context = createContext<{
    state:State;
    dispatch: React.Dispatch<Action>
}>({state:initialState, dispatch: () => {}})

export function Provider({children}:{children:React.ReactNode}){
    const [state, dispatch] = useReducer(reducer,initialState)

    return(
        <Context.Provider value={{state,dispatch}}>
            {children}
        </Context.Provider>
    )
}
