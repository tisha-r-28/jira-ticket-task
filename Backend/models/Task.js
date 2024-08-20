const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    id : {
        type : String,
        required : true
    },
    title : {
        type : String,
        require : true
    },
    task : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true,
        default : 'active'
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
})

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;