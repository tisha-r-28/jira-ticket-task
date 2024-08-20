const token = JSON.parse(localStorage.getItem('token'));

export const fetchTasks = async (setTasks, navigate) => {
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
        return result;
    } catch (error) {
    }
}

export const handleDelete = async (id, tasks, setTasks) => {
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
    }
}

export const handleUpdate = async (id, tasks, taskFormData, setTaskFormData) => {
    try {
        
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
    }
}

export const handleMove = async ({value}, setTasks, id, tasks) => {
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
    } catch (error) {
    }
}