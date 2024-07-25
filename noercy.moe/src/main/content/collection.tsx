
import styles from './chat.module.css'

interface CollectionProps {
    onAnimationClick: () => void;  
}

const Collection: React.FC<CollectionProps> = ({ onAnimationClick}) => {
    
    return (
    <>     
        <div className={styles.changelog}>
            <div> Open the Vault</div> 
            <div onClick={onAnimationClick}>Open</div>
        </div>
    </>
    )
}

export default Collection;