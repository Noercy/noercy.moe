import styles from './chat.module.css'

import { Link } from 'react-router-dom';

const Projects = () => {
    
    return (
    <>     
        <div className={styles.changelog}>
        <div> 11.06.24</div>
           
             
            <Link to="/projects">show all project view</Link>
           
        </div>
    </>
    )
}

export default Projects;