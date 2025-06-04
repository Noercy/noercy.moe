import { Link } from 'react-router-dom';
import styles from './chat.module.css'

const Projects = () => {
    
    return (
    <>     
        <div className={styles.changelog}>
            <p>Nothing here at the moment</p>
            <Link to="/projects">show all project view</Link>
        </div>
    </>
    )
}

export default Projects;