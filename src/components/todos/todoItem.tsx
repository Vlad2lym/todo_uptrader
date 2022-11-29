import dayjs from 'dayjs'
import React, {FC, useState, useEffect} from 'react'
import '../../styles/todos/todoItem.sass'
import styles from '../../styles/todos/todoItem.module.sass'
import { IBoard, ISubtask, ITodo } from '../../types/types'
import MyModal from '../UI/myModal/myModal'
import FixTodo from './fixTodo'
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)

interface TodoItemProps {
    index: number,
    item: ITodo,
    board: IBoard,
    removeTodo: Function,
    fixTodo: Function,
    removeSubtask: Function,
    toggleTask: Function,
    addNewTask: Function,
    dragOverHandler: Function,
    dragLeaveHandler: Function,
    dragStartHandler: Function,
    dragEndHandler: Function,
    dropHandler: Function
}

const TodoItem:FC<TodoItemProps> = ({item, board, dragOverHandler, dragLeaveHandler, dragStartHandler, dragEndHandler, dropHandler, index, removeTodo, fixTodo, removeSubtask, toggleTask, addNewTask}) => {
    const [visibleFixTodoModal, setVisibleFixTodoModal] = useState(false)
    const [visibleAddTaskModal, setVisibleAddTaskModal] = useState(false)
    const [showDescriptionTodo, setShowDescriptionTodo] = useState(false)
    const [addTaskInput, setAddTaskInput] = useState('')
    const [time, setTime] = useState(dayjs().format('HH:mm:ss DD MMMM YYYY'))
    const todoPriorityDoneClasses = [styles.item]

    if (item.priority === 'low') {
        todoPriorityDoneClasses.push(styles.low)
    }
    if (item.priority === 'medium') {
        todoPriorityDoneClasses.push(styles.medium)
    }
    if (item.priority === 'high') {
        todoPriorityDoneClasses.push(styles.high)
    }
    if (item.status === 'Done') {
        todoPriorityDoneClasses.push(styles.done)
    }

    const addTask = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (addTaskInput.trim()) {
            const newTask:ISubtask = {
                id: Date.now(),
                title: addTaskInput,
                active: true
            }
            addNewTask(newTask, item.id, board.id)
            setAddTaskInput('')
            setVisibleAddTaskModal(false)
        }
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(dayjs().format('HH:mm:ss DD MMMM YYYY'))
        }, 1000)
        return () => {
            clearInterval(interval)}
    }, [])

    return (
        <div 
        className={todoPriorityDoneClasses.join(' ')} 
        draggable={true} 
        onDragOver={(e:React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
        onDragLeave={(e:React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
        onDragStart={(e:React.DragEvent<HTMLDivElement>) => dragStartHandler(e, board, item)}
        onDragEnd={(e:React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
        onDrop={(e:React.DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
        >
            <MyModal visible={visibleFixTodoModal} setVisible={setVisibleFixTodoModal}>
                <FixTodo board={board} todo={item} setVisibleModal={setVisibleFixTodoModal} fixTodo={fixTodo}/>
            </MyModal>
            <MyModal visible={visibleAddTaskModal} setVisible={setVisibleAddTaskModal}>
                <form className='addTaskModal'>
                    <input type='text' placeholder='What needs to be done?' value={addTaskInput} onChange={e => setAddTaskInput(e.target.value)}/>
                    <button onClick={(e) => addTask(e)}>Add task</button>
                </form>
            </MyModal>
            <div className='title_btns'>
                <h2>{index+1}. {item.title}</h2>
                <div className='btns'>
                    <button onClick={() => setVisibleFixTodoModal(true)}>fix</button>
                    <button onClick={() => removeTodo(item.id, board)}>&times;</button>
                </div>
            </div>
            <h4 className='deadline'>{item.date.deadline ? `deadline ${dayjs(item.date.deadline).format('HH:mm DD MMMM YYYY')}` : 'no deadline'}</h4>
            <div>
                {showDescriptionTodo ? 
                    <div className='descriptions'>
                        <hr/>
                        {item.description ? <h3>{item.description}</h3> : undefined}
                        <button onClick={() => setVisibleAddTaskModal(true)} className='btn_addTask'>add task</button>
                        {item.subtasks.length ?
                            <div>
                                <h4>Tasks:</h4>
                                {item.subtasks.map(task => {
                                    const taskDoneClasses = [styles.taskTitle]
                                    if (!task.active) {
                                        taskDoneClasses.push(styles.taskDone)
                                    }
                                    return <div className='task' key={task.id}>
                                        <span className={taskDoneClasses.join(' ')}>
                                            <input 
                                                className='checkbox'
                                                type='checkbox' 
                                                checked={!task.active}
                                                onChange={() => toggleTask(task.id, item.id, board.id)}
                                            />
                                            {task.title}
                                        </span>
                                        <button onClick={()=> removeSubtask(task.id, item.id, board.id)}>&times;</button>
                                    </div>
                                })}
                                <hr/>
                            </div>
                            :
                            undefined
                        }
                        {item.date.deadline ? <h4>deadline {dayjs(item.date.deadline).from(time)}</h4> : undefined}
                        <h4>the project was created at {item.date.created}</h4>
                        <h4>Priority {item.priority}</h4>
                        {item.files.map((file => {
                            return <img src={file.url} alt='file' width='200px' key={file.id}/>
                        }))}
                        <h5 onClick={() => setShowDescriptionTodo(false)} className='showDescription'>hide description</h5>
                    </div>
                    :
                    <h5 onClick={() => setShowDescriptionTodo(true)} className='showDescription'>show description</h5>
                }
            </div>
        </div>
    )
}
export default TodoItem