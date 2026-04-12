import axios from 'axios'
import React, { useState } from 'react'
import { useTodosContext } from '../Hooks/useTodoContext'
import TodoForm from './TodoForm'

import formatDistaneToNow from "date-fns/formatDistanceToNow"
const BASE_URL = process.env.REACT_APP_API_URL

const TodoDetails = ({todo}) => {
    
    const { dispatch } = useTodosContext();
    const {setError} = TodoForm()
    const [updation, setUpdation] = useState(false)
    const [Title, setTitle] = useState(todo.Title)
    const [Content, setContent] = useState(todo.Content)

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Deleting Todo with Title : ${todo.Title}`);
        if (!confirmDelete) return;
        try{
        await axios.delete(`${BASE_URL}/api/todos/${todo._id}`)
        dispatch({type : 'DELETE_TODO' , payload : todo._id})
        }catch(error){
            setError(error.response?.data?.message);
        }
    }
    const handleUpdate = async () => {
    try {
    const response = await axios.put(`${BASE_URL}/api/todos/${todo._id}`, {
        Title: Title,
        Content: Content,
    })

    dispatch({ type: "UPDATE_TODO", payload: response.data.data })
    setUpdation(false)

    } catch (error) {
    console.log(error)
    }}
    const changingStatus = async () => {
        // console.log("clicked");
        
        try {
            const response = await axios.put(`${BASE_URL}/api/todos/${todo._id}`, {
                Completed: !todo.Completed,
            })
            dispatch({ type: "UPDATE_TODO", payload: response.data.data })
        } catch (error) {
            console.log(error)
        }
}
    return (
        <div className='todo-details'>
            <span onClick={handleDelete} className="deleting"><ion-icon name="trash-outline"></ion-icon></span>
            {updation ?
            (
                <div className='updation-section'>
                    <input
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='updation'
                    />
                    <input
                    value={Content}
                    onChange={(e) => setContent(e.target.value)}
                    className='updation'
                    />
                    <button onClick={handleUpdate}>Save</button>
                </div>
                    ) : (
                    <>
                    <h4>{todo.Title}</h4><br/>
                    <p><strong className='content'>Content:</strong> {todo.Content}</p><br/>
                    <p><strong className='status'> Status</strong> : {" "} <span  className={todo.Completed ? "comp" : "pend"}>{todo.Completed ? "Completed":"Pending"}</span>
                    <label>
                        <input type='checkbox'checked={todo.Completed === true}  onChange={changingStatus}/>
                    </label>
                    </p><br/>
                    <p>{formatDistaneToNow(new Date (todo.createdAt),{addSuffix : true}) }</p>
                    </>
            )}
            <span onClick={() =>setUpdation(true)} className='editing material-symbols-outlined'>edit</span>
            
        </div>  
    )
}


export default TodoDetails