import Grid from "./grid";
import styles from './connectDots.module.css'



const connectDots = () => {
  
    const dots = [
        { id: 'dot-1', row: 1, column: 1, color: 'red' },
        { id: 'dot-1', row: 3, column: 3, color: 'red' }, // Same ID as dot-1 to indicate connection
        { id: 'dot-2', row: 0, column: 4, color: 'blue' },
        { id: 'dot-2', row: 4, column: 0, color: 'blue' }, // Same ID as dot-2 to indicate connection
    ];

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