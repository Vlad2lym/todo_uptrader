import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import AddTodo from '../components/todos/addTodo'
import TodoItem from '../components/todos/todoItem'
import MyModal from '../components/UI/myModal/myModal'
import { useTypedSelector } from '../hooks/useTypedSelector'
import styles from '../styles/todos/todos.module.sass'
import { ProjectActionTypes } from '../types/reduxTypes'
import { IBoard, IProject, ISubtask, ITodo } from '../types/types'

function Todos () {
    const {id} = useParams<string>()
    const dispatch = useDispatch()
    const [project, setProject] = useState<IProject>(useTypedSelector(state => state[Number(id)-1]))
    const [visibleModal, setVisibleModal] = useState(false)
    const [currentBoard, setCurrentBoard] = useState<IBoard>({id: 1, title: 'Queue', items: []})
    const [currentItem, setCurrentItem] = useState<ITodo>({id: 1, title: '', status: '', date: {created: ''}, files: [], subtasks: [], priority: ''})
    const [inputSort, setInputSort] = useState('')

    useEffect(() => {
        dispatch({type: ProjectActionTypes.FIX_PROJECT, payload: project})
    }, [project])

    function sortTodos (boards:IBoard[]):IBoard[]  {
        if (inputSort) {
            return [...boards.map(board => {
                return {...board, items: board.items.filter(item => item.title.includes(inputSort))}
            })]
        } 
        return boards
    }

    const addNewTodo = (todo:ITodo) => {
        setProject({...project, boards: project.boards.map(board => {
            if (todo.status === board.title) {
                return {...board, items: [...board.items, todo]}
            }
            return board
        })})
    }

    const removeTodo = (id:number, board:IBoard) => {
        setProject({...project, boards: project.boards.map(b => {
            if (b.id === board.id) {
                return {...b, items: b.items.filter(item => item.id !== id)}
            }
            return b
        })})
    }

    const fixTodo = (fixedTodo:ITodo, board:IBoard) => {
        fixedTodo.status === board.title ?
            setProject({...project, boards: project.boards.map(b => {
                if (b.id === board.id) {
                    return {...b, items: b.items.map(item => {
                        if (item.id === fixedTodo.id) {return fixedTodo}
                        return item
                    })}
                }
                return b
            })})
            :
            setProject({...project, boards: project.boards.map(b => {
                if (fixedTodo.status === b.title) {
                    return {...b, items: [...b.items, fixedTodo]}
                }
                if (board.id === b.id) {
                    return {...b, items: b.items.filter(item => item.id !== fixedTodo.id)}
                }
                return b
            })})
    }

    const removeSubtask = (taskID:number, todoID:number, boardID:number) => {
        setProject({...project, boards: project.boards.map(board => {
            if (board.id === boardID) {
                return {...board, items: board.items.map(item => {
                    if (item.id === todoID) {
                        return {...item, subtasks: item.subtasks.filter(task => task.id !== taskID)}
                    }
                    return item
                })}
            }
            return board
        })})
    }

    const toggleTask = (taskID:number, todoID:number, boardID:number) => {
        setProject({...project, boards: project.boards.map(board => {
            if (board.id === boardID) {
                return {...board, items: board.items.map(item => {
                    if (item.id === todoID) {
                        return {...item, subtasks: item.subtasks.map(task => {
                            if (task.id === taskID) {
                                task.active = !task.active
                            }
                            return task
                        })}
                    }
                    return item
                })}
            }
            return board
        })})
    }

    const addNewTask = (newTask:ISubtask, todoID:number, boardID:number) => {
        setProject({...project, boards: project.boards.map(board => {
            if (board.id === boardID) {
                return {...board, items: board.items.map(item => {
                    if (item.id === todoID) {
                        return {...item, subtasks: [...item.subtasks, newTask]}
                    }
                    return item
                })}
            }
            return board
        })})
    }

    const dragOverHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if ((e.target as HTMLDivElement).className === 'item') {
            (e.target as HTMLDivElement).style.boxShadow = '2px 4px 3px gray'
        }
    }

    const dragLeaveHandler = (e:React.DragEvent<HTMLDivElement>) => {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    const dragStartHandler = (e:React.DragEvent<HTMLDivElement>, board:IBoard, item:ITodo) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    const dragEndHandler = (e:React.DragEvent<HTMLDivElement>) => {
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    const dropHandler = (e:React.DragEvent<HTMLDivElement>, board:IBoard, item:ITodo) => {
        e.preventDefault();
        e.stopPropagation();
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex+1, 0, {...currentItem, status: board.title})
        setProject({...project, boards: project.boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        })});
        (e.target as HTMLDivElement).style.boxShadow = 'none'
    }

    const dropBoardHandler = (e:React.DragEvent<HTMLDivElement>, board:IBoard) => {
        e.preventDefault();
        board.items.push({...currentItem, status: board.title})
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setProject({...project, boards: project.boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        })})
    }

    return (
        <div>
            <MyModal visible={visibleModal} setVisible={setVisibleModal}>
                <AddTodo addNewTodo={addNewTodo} setVisibleModal={setVisibleModal}/>
            </MyModal>
            <div className={styles.linkBack}><h3><Link to='/'>back to projects</Link></h3></div>
            <h1 className={styles.projectNumber}>Project №{id}</h1>
            <h2 className={styles.title}>{project.title}</h2>
            <div className={styles.div_btn_add}><button className={styles.btn_add} onClick={() => setVisibleModal(true)}>Add todo</button></div>
            <div className={styles.div_sortInput}>
                <input type='text' placeholder='sort by title' className={styles.sortInput} value={inputSort} onChange={e => setInputSort(e.target.value)}/>
            </div>
            <div className={styles.wrapper}>
                {sortTodos(project.boards).map(board => {
                    return <div className={styles.board} key={board.id} onDragOver={e => dragOverHandler(e)} onDrop={e => dropBoardHandler(e, board)}>
                        <div className={styles.board_title}>{board.title}</div>
                        {board.items.map((item, i) => {
                            return <TodoItem 
                                index={i}
                                item={item} 
                                key={item.id} 
                                board={board}
                                removeTodo={removeTodo}
                                fixTodo={fixTodo}
                                removeSubtask={removeSubtask}
                                toggleTask={toggleTask}
                                addNewTask={addNewTask}
                                dragOverHandler={dragOverHandler}
                                dragLeaveHandler={dragLeaveHandler}
                                dragStartHandler={dragStartHandler}
                                dragEndHandler={dragEndHandler}
                                dropHandler={dropHandler}
                            />
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Todos