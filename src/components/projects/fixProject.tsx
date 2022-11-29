import React, {FC, useState} from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../styles/projects/addProject.module.sass'
import { ProjectActionTypes } from '../../types/reduxTypes'
import { IProject } from '../../types/types'

interface FixProjectProps {
    setVisibleModal: Function,
    project: IProject
}

const FixProject:FC<FixProjectProps> = ({setVisibleModal, project}) => {
    const [titleProject, setTitleProject] = useState(project.title)
    const [descriptionProject, setDescriptionProject] = useState(project.description)
    const dispatch = useDispatch()


    const fixProjectButton = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (titleProject.trim()) {
            const fixedProject = {
                id: project.id,
                title: titleProject,
                description: descriptionProject,
                createdDate: project.createdDate,
                boards: project.boards
            }
            dispatch({type: ProjectActionTypes.FIX_PROJECT, payload: fixedProject})
            setVisibleModal(false)
        }
    }

    return (
        <div>
            <form className={styles.form}>
                <input type='text' placeholder=' Project name' onChange={e => setTitleProject(e.target.value)} value={titleProject}></input>
                <input type='text' placeholder=' Description' onChange={e => setDescriptionProject(e.target.value)} value={descriptionProject}></input>
                <button onClick={e => fixProjectButton(e)} className={styles.btnAdd}>Fix project</button>
            </form>
        </div>
    )
}

export default FixProject