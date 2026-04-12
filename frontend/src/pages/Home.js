import React, { useEffect } from 'react'
import axios from 'axios'


//* Component
import TodoDetails from '../Components/TodoDetails';
import TodoForm from '../Components/TodoForm';
import { useTodosContext } from '../Hooks/useTodoContext';


const Home = () => {
    const {todos , dispatch , search } = useTodosContext()
    useEffect(() => {
        const fetchTODOs = async () => 
            {
                const response = await axios.get('/api/todos/')
                dispatch({type : 'SET_TODO', payload : response.data.data})
            }
        fetchTODOs()
    },[dispatch])
    const fTodos = todos?.filter((todo) =>
    todo.Title.toLowerCase().includes(search.toLowerCase()) 
    // ||  todo._id.toLowerCase().includes(search.toLowerCase())        /* {If ID is containing the similar wordings it is also getting filtered with title} */    // ||  "completed".includes(search) && todo.Completed === true ||   //     "pending".includes(search) && todo.Completed === false
)

    return (
        <div className='home'>
            <div className='todos'>
                {   
                    fTodos && fTodos.length === 0 ? (
                    <p className='error'>No todo found</p>
                    ) : (
                    fTodos && fTodos.map((todo,index) => (
                        <TodoDetails key={todo._id} todo = {todo}/>
                    )))
                }
                
            </div>
            <TodoForm/>
        </div>
    )
}

export default Home