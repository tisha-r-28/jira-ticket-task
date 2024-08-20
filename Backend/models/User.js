const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fname : {
        type : String
    },
    lname : {
        type : String
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'tasks'
    }]
})

const User = mongoose.model('users', userSchema);
module.exports = User;