import Grid from "./grid";
import styles from './connectDots.module.css'



const connectDots = () => {
  

    return (
    <>     
          <p>The connect game!</p>
          <div className={styles.mainField}>
            <Grid/>
          </div>
          
    </>
    )
}

export default connectDots;