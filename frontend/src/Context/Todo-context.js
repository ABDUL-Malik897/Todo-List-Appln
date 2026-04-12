import { createContext, useReducer , useState } from "react";



export const TodoContext = createContext() 

export const TodoReducer = (state,action) =>{
    switch (action.type) {
        case 'SET_TODO':
            return {
                todos : action.payload 
            }
        case 'CREATE_TODO':
            return {
                todos : [action.payload, ...state.todos]
            }
        case 'DELETE_TODO':
            return {
                todos : state.todos.filter((each) => each._id !== action.payload)
            }
        case 'UPDATE_TODO' :
            return {
                todos : state.todos.map((todo) => todo._id === action.payload._id ? action.payload : todo),
            }
        default:
            return state
    }
}



export const TodoContextProvider = ({children}) => {
    const [state ,dispatch] = useReducer(TodoReducer,{
        todos : []
    })
    const [search, setSearch] = useState("")
    return(
        <TodoContext.Provider value={{ ...state ,dispatch , search, setSearch}}>
            {children}
        </TodoContext.Provider>
    )
}