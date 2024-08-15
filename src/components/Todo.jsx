import React from 'react';
import ActiveTodo from './ActiveTodo';
import InprogressTodo from './InprogressTodo';
import DoneTodo from './DoneTodo';

function Todo(props) {
    const { todos, setTodos, handleDelete, handleEdit, setTodoForm, doneTodos, setDoneTodos, onGoingTodos, setOnGoingTodos, options, value, setValue, handleMove } = props;

    return (
        <>
            <section className="container-fluid bg-secondary">
                <div className="row p-4">
                    <section
                        className="col-4 bg-danger-subtle p-3"
                    >
                        <h1 className='fs-3 mb-3'>Active task</h1>
                        <ActiveTodo
                            todos={todos}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            setTodoForm={setTodoForm}
                            options={options}
                            value={value}
                            setValue={setValue}
                            handleMove={handleMove}
                        />
                    </section>

                    <section
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
                            options={options}
                            value={value}
                            setValue={setValue}
                            handleMove={handleMove}
                        />
                    </section>
                    <section
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
                            options={options}
                            value={value}
                            setValue={setValue}
                            handleMove={handleMove}
                        />
                    </section>
                </div>
            </section>
        </>
    )
}

export default Todo;
