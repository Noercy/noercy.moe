import styles from './chat.module.css'
import { useEffect } from 'react';
import Nav from '../Nav'; 
import BottomNav from '../bottomNav';

const CollectionScreen: React.FC = () => {
    
  useEffect(() => {
    document.body.classList.add(styles.fullscreen);

    return () => {
      document.body.classList.remove(styles.fullscreen);
    }
  }, []);


    return (
    <>     
    
         <div className={styles.CollectionWrapper}>
          <div className={styles.topBar}><Nav className={styles.hellNav} /></div>
          <div className={styles.collectionMain}>
            <div className={styles.collectionHolder}></div>
          </div>
          <div className={styles.bottomBar}><BottomNav className={styles.hellNav} onNavClick={function (content: ContentType): void {
            throw new Error('Function not implemented.');
          } } /></div>
        </div>
    </>
    )
}

export default CollectionScreen;