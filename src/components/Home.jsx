import React, { useState } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';

function Home() {

    const [todos, setTodos] = useState([]);
    const [todoForm, setTodoForm] = useState({
        id: 0,
        todo: '',
        type : 'active'
    });
    const [ doneTodos, setDoneTodos ] = useState([]);
    const [ onGoingTodos, setOnGoingTodos ] = useState([]);
    const [ value, setValue ] = useState('ACTIVE');
    const options = [
        { value : 'ACTIVE', label : 'Active'},
        { value : 'ONGOING', label : 'On-going'},
        { value : 'DONE', label : 'Done'}
    ]

    const handleEdit = (id) => {
        try {
            const todo = todos?.find(todo => todo.id === id);
            setTodoForm({
                id,
                todo : todo?.todo
            })
        } catch (error) {
            console.log(`handle edit error : ${error.message}`);
        }
    }

    const handleDelete = (id) => {
        try {
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos)
        } catch (error) {
            console.log(`handle edit error : ${error.message}`);
        }
    }

    const handleMove = (val, id, type) => {
        try {
            const { value } = val;
            if(type === "active"){
                const todo = todos.find((t) => t.id === id);
                const index = todos.findIndex((t) => t.id === id);
                console.log(index)
                if(value === 'ONGOING'){
                    const move = todos.splice(index, 1);
                    setTodos([...todos, todos]);
                    setOnGoingTodos([...onGoingTodos, move]);
                }
            }
            // const todo = todos.find((t) => t.id === id);
            // const index = todos.findIndex(todo);
            // if()
        } catch (error) {
            console.log(`handle edit error : ${error.message}`);
        }
    }

    console.log(todos, onGoingTodos, doneTodos, "todos")

    return (
        <>
            <section className="cotainer-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center my-2">Task Manager</h1>
                    </div>
                </div>
            </section>
                <AddTodo
                    setTodos={setTodos}
                    todos={todos}
                    todoForm={todoForm}
                    setTodoForm={setTodoForm}
                />
                <Todo
                    todos={todos}
                    setTodos={setTodos}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    setTodoForm={setTodoForm}
                    doneTodos={doneTodos}
                    setDoneTodos={setDoneTodos}
                    onGoingTodos={onGoingTodos}
                    setOnGoingTodos={setOnGoingTodos}
                    options={options}
                    value={value}
                    setValue={setValue}
                    handleMove={handleMove}
                />
        </>
    )
}

export default Home;
