// import { Link } from 'react-router-dom';

import { useEffect } from "react";
import { Link } from "react-router-dom";


const MainProjectView = () => {

    useEffect(() => {
        const mainDiv = document.getElementById('root');
        console.log("hey")
        mainDiv?.classList.remove('noMargin')      
    })

    return (
    <>     
        <p>Surely there will be projects here</p>
        {/*  <Link to="/connectDots">wip game #1</Link>*/}
        <Link to="/map">Map guy</Link>
    </>
    )
}

export default MainProjectView;