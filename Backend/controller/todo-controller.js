const todoModels = require("../models/todo-models");

//? get all Todos
exports.getAllTodos = async (req,res) => {
    const todos = await todoModels.find().sort({ createdAt: -1 })
    if(!todos || todos.length === 0){
        return res.status(404).json({
            AnyTodos : false,
            message : 'No Todos exist'
        })
    }
    res.status(200).json({
        AnyTodos : true,
        data : todos
    })
};

//? get Todos by id
exports.getSingleTodoById = async (req,res) => {
    const { id } =req.params
    const todo = await todoModels.findById(id)
    if(!todo || todo.length === 0){
        return res.status(404).json({
            isThereAnyTodo : false,
            message : 'No such Todo exist'
        })
    }
    res.status(200).json({
        isThereAnyTodo : true,
        data : todo
    })
};

//? create a new Todo
exports.addNewTodo = async (req,res) => {
    try{
    const { Title , Content , Completed } = req.body
    if(!Title || !Content || Completed === undefined){
        res.status(400).json({
            isTodoCreated : false,
            message : "Please provide all the required fields"
        })
    }
    const data = {Title,Content,Completed}
    const saved = await todoModels.create(data)
    res.status(201).json({
        isTodoCreated : true,
        CreatedTodo : saved
    })}catch(error){
    // console.log(error);
    res.status(500).json({
        message: "Please provide all the required fields"
    });
    }}

//? update a existing todo
exports.updateTodoById = async (req,res) => {
    const { id } = req.params
    const data  = req.body
    
    if(!data|| Object.keys(data).length === 0 ){
        return res.status(400).json({
            isTheTodoUpdated: false,
            message : "Please provide the data to update"
        })
    }
    const updateTodo = await todoModels.findByIdAndUpdate(id,data,{new: true})
    if(!updateTodo){
        return res.status(404).json({
            isTheTodoUpdated: false,
            msg : `No Todo with ID : ${id}`
        })
    }
    res.status(200).json({
            isTheTodoUpdated : true,
            message : `Todo Updated Successfully `,
            data : updateTodo
        })
};

//? delete a todo
exports.deleteTodoById = async (req,res) => {
    const { id } = req.params
    const todo  = await todoModels.findById(id)
    if(!todo){
        return res.status(404).json({
            isTodoDeleted : false,
            message : 'No such todo exist'
        })
    }
    await todoModels.findByIdAndDelete({_id : id})
    const todos  = await todoModels.find().sort({ createdAt: -1 })
    return res.status(200).json({
        isTodoDeleted : true,
        data : todos, 
        message : `Todo with id: ${id} has been deleted`
    }) 

};