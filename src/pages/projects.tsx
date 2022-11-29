import React, { useState } from 'react';
import styles from '../styles/projects/projects.module.sass';
import MyModal from '../components/UI/myModal/myModal';
import AddProject from '../components/projects/addProject';
import ProjectList from '../components/projects/projectList';
import { useTypedSelector } from '../hooks/useTypedSelector';

function Projects() {
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const projects = useTypedSelector(state => state)

  return (
    <div className={styles.wrapper}>
        <h1>Projects</h1>
        <button onClick={() => setVisibleModal(true)} className={styles.btn_add}>add new project</button>
        <MyModal visible={visibleModal} setVisible={setVisibleModal}>
            <AddProject setVisibleModal={setVisibleModal}/>
        </MyModal>
        <ProjectList projects={projects}/>
    </div>  
  );
}

export default Projects;