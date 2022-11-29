import dayjs from 'dayjs'
import React, {FC, useState} from 'react'
import styles from '../../styles/todos/addTodo.module.sass'
import { IFile } from '../../types/types'

interface AddTodoProps {
    addNewTodo: Function,
    setVisibleModal: Function
}

const AddTodo:FC<AddTodoProps> = ({addNewTodo, setVisibleModal}) => {
    const [titleTodo, setTitleTodo] = useState('')
    const [descriptionTodo, setDescriptionTodo] = useState('')
    const [deadline, setDeadline] = useState('')
    const [status, setStatus] = useState('Queue')
    const [priority, setPriority] = useState('medium')
    const [files, setFiles] = useState<IFile[]>([])

    const handleOnChangeFile = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files.length) {
            setFiles([...files, {id: Date.now(), file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])}]);
        }
    }

    const removeFile = (id:number) => {
        setFiles(files.filter(file => file.id !== id))
    }

    const addTodoButton = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (titleTodo.trim()) {
            const todo = {
                id: Date.now(),
                title: titleTodo,
                description: descriptionTodo,
                date: {
                    created: dayjs().format('HH:mm DD MMMM YYYY'),
                    deadline
                },
                priority,
                status,
                files,
                subtasks: [],
                comments: []
            }
            addNewTodo(todo)
            setVisibleModal(false)
            setTitleTodo('')
            setDescriptionTodo('')
            setDeadline('')
            setStatus('Queue')
            setPriority('medium')
            setFiles([])
        }
    }

    return (
        <div>
            <form className={styles.form}>
                <input className={styles.inputText} type='text' placeholder='What needs to be done?' value={titleTodo} onChange={e => setTitleTodo(e.target.value)}/>
                <input className={styles.inputText} type='text' placeholder='description' value={descriptionTodo} onChange={e => setDescriptionTodo(e.target.value)}/>
                <div className={styles.status_priority}>
                    <span>
                        <label htmlFor='status'>Status </label>
                        <select id='status' value={status} onChange={e => setStatus(e.target.value)}>
                            <option>Queue</option>
                            <option>Development</option>
                            <option>Done</option>
                        </select>
                    </span>
                    <span>
                        <label htmlFor='priority'>Priority </label>
                        <select id='priority' value={priority} onChange={e => setPriority(e.target.value)}>
                            <option>low</option>
                            <option>medium</option>
                            <option>high</option>
                        </select>
                    </span>
                </div>
                <div className={styles.date_files}>
                    <input type='datetime-local' onChange={e => setDeadline(e.target.value)} value={`${deadline}`}/>
                    <input type='file' onChange={e => handleOnChangeFile(e)}></input>
                </div>
                {files.length ?
                    <div className={styles.imgs}>
                        {files.map((file => {
                            return <div key={file.id}>
                                <img src={file.url} alt='file' width='200px'/>
                                <button onClick={() => removeFile(file.id)}>remove file</button>
                            </div>
                        }))}
                    </div>
                    :
                    undefined
                }
                <button className={styles.btnAdd} onClick={e => addTodoButton(e)}>Add todo</button>
            </form>
        </div>
    )
}

export default AddTodo