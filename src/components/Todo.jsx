import React from 'react';
import ActiveTodo from './ActiveTodo';
import InprogressTodo from './InprogressTodo';
import DoneTodo from './DoneTodo';
import { Droppable } from 'react-beautiful-dnd';

function Todo(props) {
    const { todos, setTodos, handleDelete, handleEdit, setTodoForm, doneTodos, setDoneTodos, onGoingTodos, setOnGoingTodos } = props;
    
    return (
        <>
            {/* <section className="container-fluid bg-secondary">
                <div className="row p-4"> */}
                    <Droppable droppableId="active-todos">
                        { (provided) => {
                            return (
                                <section 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="col-4 bg-danger-subtle p-3"
                                >
                                    <h1 className='fs-3 mb-3'>Active task</h1>
                                    <ActiveTodo
                                        todos={todos}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                        setTodoForm={setTodoForm}
                                    />
                                    {provided.placeholder}
                                </section>
                            )
                        }}
                    </Droppable>
                    <Droppable droppableId='ongoing-todos'>
                        {(provided) => (
                            <section 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="col-4 bg-warning-subtle p-3"
                            >
                                <h1 className='fs-3 mb-3'>On going Task</h1>
                                <InprogressTodo
                                    todos={todos}
                                    setTodoForm={setTodoForm}
                                    onGoingTodos={onGoingTodos}
                                    setOnGoingTodos={setOnGoingTodos}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                                {provided.placeholder}
                            </section>
                        )}
                    </Droppable>
                    <Droppable droppableId='done-todos'>
                        { (provided) => (
                            <section 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="col-4 bg-primary-subtle p-3" 
                            >
                                <h1 className='fs-3 mb-3'>Done task</h1>
                                <DoneTodo
                                    doneTodos={doneTodos}
                                    setDoneTodos={setDoneTodos}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    setTodoForm={setTodoForm}
                                    todos={todos}
                                />
                                {provided.placeholder}
                            </section>
                        )}
                    </Droppable>
                {/* </div>
            </section> */}
        </>
    )
}

export default Todo;
