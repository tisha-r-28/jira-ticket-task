import React from 'react';
import Select from 'react-select';

function InprogressTodo(props) {
    const { onGoingTodos, setOnGoingTodos, handleEdit, handleDelete, options, value, setValue, handleMove } = props;
    return (
        <>
            {onGoingTodos?.map((task, index) => (
                <div className="card mb-3" key={index} >
                    <div className="card-body d-flex justify-content-between">
                        <p className="card-text w-75">{task.todo}</p>
                        <div className="d-flex align-items-center fs-5">
                            <i className="fa-regular fa-pen-to-square" onClick={() => {handleEdit(task.id)}} style={{cursor : "pointer"}}></i>
                            <i className="fa-regular fa-trash-can mx-3" onClick={() =>{handleDelete(task.id)}} style={{cursor : "pointer"}}></i>
                            <Select 
                                placeholder='Staus'
                                options={options}
                                value={options.find(option => option.value === value)}
                                isSearchable={false}
                                onChange={(val) => {
                                    setValue(val.value)
                                    handleMove(val, task.id, task.type)
                                }}
                                styles={{
                                    placeholder : (baseStyle) => ({
                                        ...baseStyle,
                                        fontSize : '16px',
                                        padding : '0px 10px 0px 0px'
                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        fontSize: '14px'
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        fontSize: '14px',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        fontSize: '12px', 
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default InprogressTodo;