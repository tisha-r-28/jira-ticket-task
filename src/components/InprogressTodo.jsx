import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function InprogressTodo(props) {
    const { todos, ongoingTodos, setOnGoingTodos, handleEdit, handleDelete, setTodoForm } = props;
    return (
        <>
            {ongoingTodos?.map((task, index) => (
                <Draggable key={index} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                        <div 
                            className="card mb-3" 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div className="card-body d-flex justify-content-between">
                                <p className="card-text w-75">{task.todo}</p>
                                <div className="d-flex align-items-center fs-5">
                                    <i className="fa-regular fa-pen-to-square" onClick={() => {handleEdit(task.id)}} style={{cursor : "pointer"}}></i>
                                    <i className="fa-regular fa-trash-can mx-3" onClick={() =>{handleDelete(task.id)}} style={{cursor : "pointer"}}></i>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            ))}
        </>
    )
}

export default InprogressTodo;