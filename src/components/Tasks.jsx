import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskPanel from './TaskPanel';
import { useNavigate } from 'react-router';

const token = JSON.parse(localStorage.getItem('token'));

const fetchTasks = async (setTasks, navigate) => {
    try {
        const response = await fetch(`http://localhost:8000/api/tasks/all-tasks`, {
            method : 'GET',
            headers : {
                'authToken' : `${token}`
            }
        })
        const result = await response.json();
        if(result.code === 200){
            setTasks(result.data);
        }
        if(result.code === 401){
            navigate('/login')
        }
        if(result.code === 204){
            console.log(result.message);
        }
        return result;
    } catch (error) {
        console.log(`fetch task error :${error.message}`);
    }
}

const TaskForm = (props) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const { taskFormData, setTaskFormData, tasks, setTasks } = props;
    const [ error, setError ] = useState({});
    const handleTaskChange = (e) => {
        try {
            const name = e.target.name;
            const value = e.target.value;
            setTaskFormData({
                ...taskFormData,
                [name] : value
            })
            setError(prev => ({
                ...prev,
                [`${name}Error`] : ''
            }))
        } catch (error) {
            console.log(`error of task change : ${error.message}`);
        }
    }
    const handleTaskError = () => {
        try {
            let errors = {};
            if(!taskFormData.title){
                errors.titleError = 'Must enter title!';
            }
            if(!taskFormData.task){
                errors.taskError = 'Must enter task!';
            }
            if(Object.keys(errors).length > 0){
                setError(errors);
            }
        } catch (error) {
            console.log(`error of task error handler : ${error.message}`);
        }
    }
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        handleTaskError();
        try {
            const task = tasks.find((task) => task.id === taskFormData.id);
            
            if(!task){
                console.log(task, "add");
                const response = await fetch(`http://localhost:8000/api/tasks/add-task`, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        'authToken' : `${token}`
                    },
                    body : JSON.stringify({
                        id : taskFormData.id,
                        title : taskFormData.title,
                        task : taskFormData.task
                    })
                })
                if(!response.ok){
                    const errorData = await response.json();
                    if(errorData.message){
                        console.log(errorData.message);
                    }
                }
                const result = await response.json();
                
                if(result.status){
                    setTasks([...tasks, result.data]);
                    setTaskFormData({
                        id : uuidv4(),
                        title : '',
                        task :'',
                        type :'active'
                    })
                }
            }else{
                console.log(task, "update");
                const response = await fetch(`http://localhost:8000/api/tasks/update-task?task_id=${taskFormData.id}`, {
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json',
                        'authToken' : `${token}`
                    },
                    body : JSON.stringify({
                        title : taskFormData.title,
                        task : taskFormData.task
                    })
                })
                if(!response.ok){
                    const errorData = await response.json();
                    if(errorData.message){
                        console.log(errorData.message);
                    }
                }
                const result = await response.json();
                if(result.code ===  200){
                    setTasks(prevTasks =>
                        prevTasks.map(prevTask =>
                            prevTask._id === result.data._id
                                ? { ...prevTask, title: result.data.title, task: result.data.task }
                                : prevTask
                        )
                    );
                    setTaskFormData({
                        id : uuidv4(),
                        title : '',
                        task : ''
                    })
                }
            }
        } catch (error) {
            console.log(`error of task error handler : ${error.message}`);
        }
    }
    console.log(tasks, "added");
    
    return(
        <>
            <section className="col-4 border border-primary border-1 rounded p-4">
                <form method='post' onSubmit={(e) => handleTaskSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={taskFormData.title} onChange={(e) => handleTaskChange(e)}/>
                        {error.titleError && <p className="text-danger p-0 my-1">{error.titleError}</p> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="task" className="form-label">Description</label>
                        <input type="text" className="form-control" id="task" name='task' value={taskFormData.task} onChange={(e) => handleTaskChange(e)}/>
                        {error.taskError && <p className="text-danger p-0 my-1">{error.taskError}</p> }
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </section>
        </>
    )
}

function Tasks() {
    const navigate = useNavigate()
    const [ taskFormData, setTaskFormData ] = useState({
        id : uuidv4(),
        title : '',
        task : ''
    })
    const [ tasks, setTasks ] = useState([]);
    useEffect(() => {
        fetchTasks(setTasks, navigate)
    }, [])
    return (
        <>
           <section className="container-fluid mt-5">
                <div className="row d-flex justify-content-center">
                        <TaskForm 
                            taskFormData={taskFormData}
                            setTaskFormData={setTaskFormData}
                            tasks={tasks}
                            setTasks={setTasks}
                        />
                </div>
           </section>
           <section className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <TaskPanel 
                        tasks={tasks}
                        setTasks={setTasks}
                        setTaskFormData={setTaskFormData}
                        taskFormData={taskFormData}
                        fetchTasks={fetchTasks}
                    />
                </div>
           </section>
        </>
    )
}

export default Tasks;