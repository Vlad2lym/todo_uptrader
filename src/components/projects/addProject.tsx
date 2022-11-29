import React, {FC, useState} from 'react'
import styles from '../../styles/projects/addProject.module.sass'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { ProjectActionTypes } from '../../types/reduxTypes'
import { IProject } from '../../types/types'

interface AddProjectProps {
    setVisibleModal: Function
}

const AddProject:FC<AddProjectProps> = ({setVisibleModal}) => {
    const [titleProject, setTitleProject] = useState('')
    const [descriptionProject, setDescriptionProject] = useState('')
    const dispatch = useDispatch()

    const addProjectButton = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (titleProject.trim()) {
            const project:IProject = {
                id: Date.now(),
                title: titleProject,
                description: descriptionProject,
                createdDate: dayjs().format('HH:mm DD MMMM YYYY'),
                boards: [
                    {id: 1, title: 'Queue', items: []},
                    {id: 2, title: 'Development', items: []},
                    {id: 3, title: 'Done', items: []}
                ]
            }
            dispatch({type: ProjectActionTypes.ADD_PROJECT, payload: project})
            setVisibleModal(false)
            setTitleProject('')
            setDescriptionProject('')
        }
    }

    return (
        <div>
            <form className={styles.form}>
                <input type='text' placeholder=' Project name' onChange={e => setTitleProject(e.target.value)} value={titleProject}></input>
                <input type='text' placeholder=' Description' onChange={e => setDescriptionProject(e.target.value)} value={descriptionProject}></input>
                <button onClick={e => addProjectButton(e)} className={styles.btnAdd}>Add project</button>
            </form>
        </div>
    )
}

export default AddProject