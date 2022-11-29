import React, {FC} from 'react'
import { IProject } from '../../types/types'
import styles from '../../styles/projects/projectList.module.sass'
import ProjectItem from './projectItem'

interface ProjectListProps {
    projects: IProject[],
}

const ProjectList:FC<ProjectListProps> = ({projects}) => {
    return (
        <div className={styles.list}>
            {projects.length ?
                projects.map((project, i) => {
                    return <ProjectItem project={project} index={i} key={project.id}/>})
                :
                <h2>no projects</h2>
            }
        </div>

    )
}

export default ProjectList