import axios from 'axios'
import React, { useState } from 'react'
import { useTodosContext } from '../Hooks/useTodoContext'

const BASE_URL = process.env.REACT_APP_API_URL
const TodoForm = () => {
    

    const { dispatch } = useTodosContext()
    const [Title , setTitle] = useState('')
    const [Content,setContent] = useState('')
    const [Completed ,setCompleted] = useState(false)
    const [error , setError] = useState(null)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const todo = { Title , Content , Completed }
        try{
        const response = await axios.post(`${BASE_URL}/api/todos/`,todo) 
        console.log(response.data)
        setError(null)
        setTitle('')
        setContent('')
        setCompleted(false)
        dispatch({type : 'CREATE_TODO', payload : response.data.CreatedTodo })
        }catch(err){
            setError(err.response?.data?.message)
        }

    }

    return (
        <form className='create'onSubmit={handleSubmit}>
            <h3>Add a New Todo</h3>
            
            <label>Title :</label>
            <input type='text' value={Title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='Enter the Title'/>
            <label>Content :</label>
            {/* <input type='text' value={Content} onChange={(e)=>{setContent(e.target.value)}} placeholder='Enter the Content'/> */}
            <textarea value={Content} onChange={(e)=>{setContent(e.target.value)}} placeholder='Enter the Content'rows="6" cols="45"></textarea>
            <div className="radio-group">
            <label>Is it Completed (true/false) :</label>
            <input type="radio"  name="status"  value="true"  checked={Completed === true}  onChange={() => setCompleted(true)}/> Completed
            <input  type="radio"  name="status"  value="false"  checked={Completed === false}  onChange={() => setCompleted(false)}/> Pending
            </div>
            <button>Add Todo</button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default TodoForm