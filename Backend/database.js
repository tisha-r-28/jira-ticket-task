require('dotenv').config();

const mongoose = require('mongoose');

const mongoURI = `${process.env.MONGO_URI}/todo-task`;

async function connectToMongoose () {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log(`connected to mongoDB`);
    } catch (error) {
        console.log(`error for connection to database ${error.message}`);
    }
}

module.exports = connectToMongoose;