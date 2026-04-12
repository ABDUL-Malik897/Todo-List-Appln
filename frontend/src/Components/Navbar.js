import React from 'react'
import { Link } from 'react-router-dom'
import { useTodosContext } from '../Hooks/useTodoContext'



const Navbar = () => {
    const { search  , setSearch } = useTodosContext()
    return (
        <header>
            <div className='container'>
                <Link to ='/'>
                    <h1>Todo-List-Appln</h1>
                </Link>
                <input
                    type="text"
                    placeholder= "Search todos with Titles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
        />
            </div>
        </header>
    )
}

export default Navbar