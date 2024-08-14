require('dotenv').config();

const connectToMongoose = require('./database');
connectToMongoose();

const express = require('express');
const app = express();

const port = process.env.PORT || 8001;
const cors = require('cors');

app.use(cors());

const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');

app.use(express.json());

app.use('/api/users/', userRoute);
app.use('/api/tasks/', taskRoute);

app.listen(port, () => {
    console.log(`server is running on port : http://localhost:${port}`);
})