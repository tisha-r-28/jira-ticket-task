import React, { useState } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { DragDropContext } from 'react-beautiful-dnd';
// import ActiveTodo from './ActiveTodo';
// import InprogressTodo from './InprogressTodo';
// import DoneTodo from './DoneTodo';

function Home() {

    const [todos, setTodos] = useState([]);
    const [todoForm, setTodoForm] = useState({
        id: 0,
        todo: '',
        type : 'active'
    });
    const [ doneTodos, setDoneTodos ] = useState([]);
    const [ onGoingTodos, setOnGoingTodos ] = useState([]);

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

    const onDragEnd = (result) => {
        console.log(result);
        const { destination, source } = result;
        if(!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;

        // if(source.droppableId === 'active-todos' && destination.droppableId === 'ongoing-todos'){
        //     const move = todos?.splice(source.index, 1);
        //     onGoingTodos.splice(destination.index, 0, move)
        //     setTodos(todos);
        //     setOnGoingTodos(onGoingTodos);
        // }else if(source.droppableId === 'active-todos' && destination.droppableId === 'done-todos'){
        //     const move = todos?.splice(source.index, 1);
        //     setTodos(todos);
        //     setDoneTodos(move);
        // }else{
        //     const move = todos?.splice(source.index, 0);
        //     setTodos(todos);
        // }

        // if(source.droppableId === 'active-todos' && destination.droppableId === 'ongoing-todos'){
        //     const move = todos?.splice(source.index, 1);
        //     setTodos(todos);
        //     setOnGoingTodos(move);
        // }else if(source.droppableId === 'active-todos' && destination.droppableId === 'done-todos'){
        //     const move = todos?.splice(source.index, 1);
        //     setTodos(todos);
        //     setDoneTodos(move);
        // }else{
        //     const move = todos?.splice(source.index, 1);
        //     setTodos(todos);
        //     setDoneTodos(move);
        // }

        // if(source.droppableId === 'active-todos' && destination.droppableId === 'ongoing-todos'){
        //     const move = todos?.splice(source.index, 1);
        //     setTodos(todos);
        //     setOnGoingTodos(move);
        // }else if(source.droppableId === 'active-todos' && destination.droppableId === 'done-todos'){
        //     const move = todos?.splice(source.index, 1);
        //     setTodos(todos);
        //     setDoneTodos(move);
        // }else{
        //     const move = todos?.splice(source.index, 1);
        //     setTodos(todos);
        //     setDoneTodos(move);
        // }

        // let task;
        // source.droppableId === 'active-todos' ? task = todos : source.droppableId === 'ongoing-todo' ? task = onGoingTodos : task = 'done-todos';

        // let dropTask;
        // destination.droppableId === 'active-todos' ? dropTask = todos : destination.droppableId === 'ongoing-task' ? dropTask = onGoingTodos : dropTask = doneTodos;
        
        // if(source.droppableId === 'ongoing-todos'){

        // }else{

        // }
       
        // setOnGoingTodos(ongoing);
        // setDoneTodos(done);
    }

    return (
        <>
            <section className="cotainer-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center my-2">Task Manager</h1>
                    </div>
                </div>
            </section>
            <DragDropContext onDragEnd={onDragEnd}>
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
                />
            </DragDropContext>
        </>
    )
}

export default Home;
