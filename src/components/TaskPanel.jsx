import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { handleDelete, handleUpdate, handleMove } from '../API/APIs';

const ActiveTask = React.memo((props) => {
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
})

const OngoingTask = React.memo((props) => {
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
})

const DoneTask = React.memo((props) => {
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
})

function TaskPanel(props) {
    const { tasks, setTasks, setTaskFormData, taskFormData, fetchTasks } = props;
    // eslint-disable-next-line
    const [ value, setValue ] = useState('active');
    const navigate = useNavigate();
    useEffect(() => {
        fetchTasks(setTasks, navigate);
        // eslint-disable-next-line
    }, []);
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