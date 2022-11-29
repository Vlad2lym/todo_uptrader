import React, {FC, useState, useMemo} from 'react'
import { IProject } from '../../types/types'
import styles from '../../styles/projects/projectItem.module.sass'
import { useNavigate } from 'react-router-dom';
import MyModal from '../UI/myModal/myModal';
import FixProject from './fixProject';
import { useDispatch } from 'react-redux';
import { ProjectActionTypes } from '../../types/reduxTypes';

interface ProjectItemProps {
    project: IProject,
    index: number,
}

const ProjectItem:FC<ProjectItemProps> = ({project, index}) => {
    const [showDescription, setShowDescription] = useState(false)
    const [visibleFixModal, setVisibleFixModal] = useState(false)
    const router = useNavigate()
    const dispatch = useDispatch()
    const completedTasksProcent = useMemo(() => {
        const doneTodosNumber = project.boards[2].items.length;
        const allTodoNumber = project.boards[0].items.length + project.boards[1].items.length + doneTodosNumber;
        return (Math.trunc(doneTodosNumber/allTodoNumber*100)).toString()
    }, [project])

    return (
        <div key={project.id} className={styles.item} onClick={() => router(`/project/${index+1}`)}>
            <MyModal visible={visibleFixModal} setVisible={setVisibleFixModal}>
                <FixProject project={project} setVisibleModal={setVisibleFixModal}/>
            </MyModal>
            <div className={styles.title}>
                <h2>{index+1}. {project.title}</h2>
                <div>
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        setVisibleFixModal(true)}}
                        >fix
                    </button>
                    <button 
                        onClick={(e) => {
                        e.stopPropagation();
                        dispatch({type: ProjectActionTypes.REMOVE_PROJECT, payload: project.id})}}
                        >&times;
                    </button>
                </div>
            </div>
            {project.boards[0].items.length || project.boards[1].items.length || project.boards[2].items.length ?
                <div className={styles.progress}>
                    <label htmlFor='projectProgress'>project completed by {completedTasksProcent}%</label>
                    <progress id='projectProgress' max='100' value={completedTasksProcent} style={{width: '90%'}}></progress>
                </div>
                :
                undefined
            }
            <div>
                {showDescription ?
                    <div>
                        {project.description ?
                            <h3>{project.description}</h3>
                            :
                            undefined}
                        <h4>the project was created at {project.createdDate}</h4>
                        <h5 
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowDescription(false)}} 
                            className={styles.showDescription}
                            >hide description
                        </h5>
                    </div>
                    :
                    <h5 
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowDescription(true)}}
                        className={styles.showDescription}
                        >show description
                    </h5>
                }
            </div>
        </div>
    )
}

export default ProjectItem