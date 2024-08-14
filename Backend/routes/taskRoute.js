const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
const User = require('../models/User')
const authUser = require('../middlewares/authentication');
const mongoose = require('mongoose');

//ROUTE - 1 create task
router.post('/add-task', authUser, async ( req, res ) => {
    try {
        const userEmail = req.user.email;
        if(!userEmail){
            return res.status(401).json({
                code : 401,
                message : `unauthorized!`
            })
        }
        const user = await User.findOne({email : userEmail});
        if(!user){
            return res.status(401).json({
                code : 401,
                message : `unauthorized for creating tasks!`
            })
        }
        const { id, task, type } = req.body;
        if(!task){
            return res.status(400).json({
                code : 400,
                message : `task is require!`
            })
        }
        const newTask = await Task.create({
            id : id,
            task : task,
            type : type,
            user_id : user
        })
        await User.findByIdAndUpdate(
            user._id,
            { $push: { tasks: newTask._id } },
            { new: true } 
        );
        if(!newTask){
            return res.status(500).json({
                code : 500,
                message : `issue while creating task!`
            })
        }
        return res.status(201).json({
            code : 201,
            message : `Task created successfully`,
            data : {
                id : newTask.id,
                task : newTask.task,
                type : newTask.type,
                user : newTask.user_id
            }
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`
        })
    }
})

//ROUTE - 2 get all tasks user wise
router.get('/all-tasks', authUser,  async ( req, res ) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email : userEmail});
        if(!user){
            return res.status(401).json({
                code : 401,
                message : `Unauthorized user!`
            })
        }
        const userSpecificTask = await Task.find({user_id : user.id});
        if(!userSpecificTask || userSpecificTask.length === 0){
            return res.status(204).json({
                code : 204,
                message : `No task available for provided user!`
            })
        }
        return res.status(200).json({
            code : 200,
            message : `user specific task get sucessfully!`,
            data : userSpecificTask
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`
        })
    }
})

//ROUTE - 3 updating the task
router.put('/update-task', authUser, async ( req, res ) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email : userEmail});
        if(!user){
            return res.status(401).json({
                code : 401,
                message : `Unauthorized user!`
            })
        }
        const { task_id } = req.query;

        if (!task_id) {
            return res.status(400).json({
                code: 400,
                message: 'Task ID is required!'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(task_id)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid Task ID!'
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(task_id, { $set : req.body }, { new : true });
        if (!updatedTask) {
            return res.status(404).json({
                code: 404,
                message: 'Task not found!'
            });
        }
        return res.status(200).json({
            code : 200,
            message : `task updated sucessfully!`,
            data : updatedTask
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`
        })
    }
})

//ROUTE - 4 delete task via query 
router.delete('/remove-task', authUser, async ( req, res ) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email : userEmail});
        if(!user){
            return res.status(401).json({
                code : 401,
                message : `Unauthorized user!`
            })
        }
        const { task_id } = req.query;

        if (!task_id) {
            return res.status(400).json({
                code: 400,
                message: 'Task ID is required!'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(task_id)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid Task ID!'
            });
        }

        const deletedTask = await Task.deleteOne({_id : task_id});
        if(!deletedTask){
            return res.status(500).json({
                code : 500,
                message : `issue encoutered while deleting the task`
            })
        }
        return res.status(200).json({
            code : 200,
            message : `task deleted successfully`
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`
        })
    }
})

//ROUTE - 5 Get tasks type wise
router.get('/get-tasks', authUser, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email : userEmail });
        if(!user){
            return res.status(401).json({
                code : 401,
                message : `Unauthorized user!`
            })
        }
        const { task_type } = req.query;
        if(!task_type){
            return res.status(400).json({
                code: 400,
                message: 'Type for task is required!'
            });
        }
        const tasks = await Task.find({ user_id: user._id, type: task_type });
        if(!tasks || tasks.length <= 0){
            return res.status(404).json({
                code: 404,
                message: 'Task not found!'
            });
        };
        return res.status(200).json({
            code: 200,
            message: 'Get tasks successfully!',
            data : tasks
        });
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `internal server error : ${error.message}`
        })
    }
})

module.exports = router;