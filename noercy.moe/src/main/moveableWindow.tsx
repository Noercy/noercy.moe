import Draggable from 'react-draggable';
import GifWindow from './gifWindow';

const MoveableWindow: React.FC = () => {
    
    return (
    <>     
        <Draggable handle='.header'>
            <div className="window" style={{ width: '400px', height: '400px', backgroundColor: 'black' }} >
                <div className="header" style={{ width: '300px', cursor: 'move', backgroundColor: 'gray', padding: '10px'}}> 
                    Konata
                </div>
                <div> <GifWindow /> </div>
            </div>
        </Draggable>
         
        
    </>
    )
}

export default MoveableWindow;