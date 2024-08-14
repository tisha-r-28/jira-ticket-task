const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    task : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true,
        default : 'Active'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
})

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;