import React from 'react';

function AddTodo(props) {

    const { todos, setTodos, todoForm, setTodoForm } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (todoForm.id) {
                const updatedTodos = todos.map(task => 
                    task.id === todoForm.id ? { ...task, todo: todoForm.todo } : task
                );
                setTodos(updatedTodos);
            } else {
                const newTodo = {
                    id: todos.length + 1,
                    todo: todoForm.todo,
                    type : "active"
                };
                if(newTodo.todo === '' && !newTodo.todo){
                    return;
                }else{
                    setTodos([...todos, newTodo]);
                }
            }
            
            setTodoForm({
                id: 0,
                todo: ''
            });
        } catch (error) {
            console.log(`submit error : ${error.message}`);
        }
    }    

    const handleChange = (e) => {
        try {
            const name = e.target.name;
            const value = e.target.value;
            setTodoForm({
                ...todoForm,
                [name] : value
            })
        } catch (error) {
            console.log(`submit error : ${error.message}`);
        }
    }

    return (
        <>
            <div className="container-fluid my-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <form method="post" className='input-group' onSubmit={(e) => handleSubmit(e)}>
                            <input type="text" className='form-control' name="todo" id="todo" value={todoForm.todo} placeholder='Add todo' onChange={(e) => handleChange(e)} />
                            <button type="submit" className='btn btn-secondary'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTodo;
