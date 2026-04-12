const express = require('express');
const app = express()
const dotenv = require('dotenv');
const DbConnection = require('./dbConnection');
dotenv.config()
DbConnection()

const port = process.env.PORT || 8080   //* : "always after dotenv.config()"

const todoRouter = require('./routes/todo-routes')


app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "Home Page"
    })
})

app.use('/api/todos/', todoRouter)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);   
})