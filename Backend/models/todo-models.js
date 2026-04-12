const mongoose = require('mongoose');

const Schema = mongoose.Schema

const TodoSchema = new Schema ({
    Title:{
        type : String,
        required : true
    },
    Content:{
        type : String,
        required : true
    },
    Completed:{
        type : Boolean,
        required : false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Todos',TodoSchema)