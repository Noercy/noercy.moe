
import styles from './chat.module.css'
import { Link } from 'react-router-dom';


const Collection = () => {
    
    return (
    <>     
        <div className={styles.changelog}>
            <div> Open the Vault</div> 
            <Link to="/collection">Open link</Link>
           
        </div>
    </>
    )
}

export default Collection;