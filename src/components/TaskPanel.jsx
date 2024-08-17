import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select from 'react-select';

const token = JSON.parse(localStorage.getItem('token'));

// const fetchTasks = async (setTasks, navigate) => {
//     try {
//         const response = await fetch(`http://localhost:8000/api/tasks/all-tasks`, {
//             method : 'GET',
//             headers : {
//                 'authToken' : `${token}`
//             }
//         })
//         const result = await response.json();
//         if(result.code === 200){
//             setTasks(result.data);
//         }
//         if(result.code === 401){
//             navigate('/login')
//         }
//         if(result.code === 204){
//             console.log(result.message);
//         }
//         return result;
//     } catch (error) {
//         console.log(`fetch task error :${error.message}`);
//     }
// }

const handleDelete = async (id, tasks, setTasks) => {
    try {
        const response = await fetch(`http://localhost:8000/api/tasks/remove-task?task_id=${id}`, {
            method : 'DELETE',
            headers : {
                'authToken' : `${token}`
            }
        })
        await response.json();
        const task = tasks.findIndex(task => task._id === id);
        tasks.splice(task, 1);
        setTasks([...tasks])
    } catch (error) {
        console.log(`delete task error :${error.message}`);
    }
}

const handleUpdate = async (id, tasks, taskFormData, setTaskFormData) => {
    try {
        console.log(id, "update");
        
        const task = tasks.find((task) => task._id === id);
        if(task){
            setTaskFormData({
                ...taskFormData,
                id : task._id,
                title : task.title, 
                task : task.task,
                type : task.type
            })
        }
    } catch (error) {
        console.log(`delete task error :${error.message}`);
    }
}

const handleMove = async ({value}, setTasks, id, tasks) => {
    try {
        const response = await fetch(`http://localhost:8000/api/tasks/update-task?task_id=${id}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'authToken' : `${token}`
            },
            body : JSON.stringify({
                type : value
            })
        });
        const result = await response.json();
        if(result?.code === 200){
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === id ? { ...task, type: value } : task
                )
            );
        }
        console.log(tasks, "changed");
    } catch (error) {
        console.log(`move task error :${error.message}`);
    }
}


const ActiveTask = (props) => {
    const { tasks, setTasks, value, taskFormData, setTaskFormData } = props;
    const activeTask = tasks.filter((task) => task.type === 'active');
    const options = [
        {value : 'active', label : 'Active'},
        {value : 'ongoing', label : 'On-going'},
        {value : 'done', label : 'Done'}
    ]
    return(
        <>
        <section className="col-4 p-5">
            <h1 className="fs-3">Active tasks</h1>
                {activeTask?.length > 0 ? activeTask?.map((task) => {
                    return (
                        <div className="card my-4" key={task?.id}>
                            <div className="card-body">
                                <h1 className="card-title fs-5">{task?.title}</h1>
                                <p className="card-text">{task?.task}</p>
                                <div className="d-flex justify-content-start align-items-center">
                                    <Select
                                        placeholder='Status'
                                        options={options}
                                        isSearchable={false}
                                        defaultValue={value}
                                        onChange={(selectedOption) =>handleMove(selectedOption, setTasks, task._id, tasks)}
                                    />
                                    <i className="fa-regular fa-pen-to-square fs-5 mx-4" style={{ cursor: "pointer" }} onClick={() => handleUpdate(task?._id, tasks, taskFormData, setTaskFormData)}></i>
                                    <i className="fa-regular fa-trash-can fs-5" style={{ cursor: "pointer" }} onClick={() => handleDelete(task?._id, tasks, setTasks)}></i>
                                </div>
                            </div>
                        </div>
                    )
                }) : <p className="fs-3">No task available</p> }
        </section>
        </>
    )
}

const OngoingTask = (props) => {
    const { tasks, setTasks, taskFormData, setTaskFormData } = props;
    const ongoingTask = tasks.filter((task) => task.type === 'ongoing');
    const options = [
        {value : 'active', label : 'Active'},
        {value : 'ongoing', label : 'On-going'},
        {value : 'done', label : 'Done'}
    ]
    return(
        <>
            <section className="col-4 p-5" >
                <h1 className="fs-3">Ongoing tasks</h1>
                    {ongoingTask.length > 0 ? ongoingTask.map((task) => {
                        return (
                            <div className="card my-4" key={task.id}>
                                <div className="card-body">
                                    <h1 className="card-title fs-5">{task.title}</h1>
                                    <p className="card-text">{task.task}</p>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <Select
                                            placeholder='Status'
                                            options={options}
                                            isSearchable={false}
                                            onChange={(selectedOption) =>handleMove(selectedOption, setTasks, task._id, tasks)}
                                        />
                                        <i className="fa-regular fa-pen-to-square fs-5 mx-4" style={{ cursor: "pointer" }} onClick={() => handleUpdate(task?._id, tasks, taskFormData, setTaskFormData)}></i>
                                        <i className="fa-regular fa-trash-can fs-5" style={{ cursor: "pointer" }} onClick={() => handleDelete(task?._id, tasks, setTasks)}></i>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p className="fs-3">No task available</p> }
            </section>
        </>
    )
}

const DoneTask = (props) => {
    const { tasks, setTasks, taskFormData, setTaskFormData } = props;
    const doneTask = tasks.filter((task) => task.type === 'done');
    const options = [
        {value : 'active', label : 'Active'},
        {value : 'ongoing', label : 'On-going'},
        {value : 'done', label : 'Done'}
    ]
    return(
        <>
        <section className="col-4 p-5" >
            <h1 className="fs-3">Done tasks</h1>
                {doneTask.length > 0 ? doneTask.map((task) => {
                    return (
                        <div className="card my-4" key={task.id}>
                            <div className="card-body">
                                <h1 className="card-title fs-5">{task.title}</h1>
                                <p className="card-text">{task.task}</p>
                                <div className="d-flex justify-content-start align-items-center">
                                    <Select
                                        placeholder='Status'
                                        options={options}
                                        isSearchable={false}
                                        onChange={(selectedOption) =>handleMove(selectedOption, setTasks, task._id, tasks)}
                                    />
                                    <i className="fa-regular fa-pen-to-square fs-5 mx-4" style={{ cursor: "pointer" }} onClick={() => handleUpdate(task?._id, tasks, taskFormData, setTaskFormData)}></i>
                                    <i className="fa-regular fa-trash-can fs-5" style={{ cursor: "pointer" }} onClick={() => handleDelete(task?._id, tasks, setTasks)}></i>
                                </div>
                            </div>
                        </div>
                    )
                }) : <p className="fs-3">No task available</p> }
        </section>
        </>
    )
}

function TaskPanel(props) {
    const { tasks, setTasks, setTaskFormData, taskFormData, fetchTasks } = props;
    // eslint-disable-next-line
    const [ value, setValue ] = useState('active');
    const navigate = useNavigate();
    useEffect(() => {
        fetchTasks(setTasks, navigate);
    }, []);
    console.log(tasks, "tasks");
    return (
        <>
            <section className="container-fluid">
                <div className="row d-flex">
                    <ActiveTask 
                        tasks={tasks}
                        setTasks={setTasks}
                        value={value}
                        setTaskFormData={setTaskFormData}
                        taskFormData={taskFormData}
                    />
                    <OngoingTask 
                        tasks={tasks}
                        setTasks={setTasks}
                        setTaskFormData={setTaskFormData}
                        taskFormData={taskFormData}
                    />
                    <DoneTask 
                        tasks={tasks}
                        setTasks={setTasks}
                        setTaskFormData={setTaskFormData}
                        taskFormData={taskFormData}
                    />
                </div>
            </section>
        </>
    )
}

export default TaskPanel;