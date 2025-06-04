import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import Styles from "./map.module.css"
import { useEffect } from 'react';

const API_KEY = import.meta.env.VITE_MAPTILES;

const Mapguy = () => {

    useEffect(() => {
        const mainDiv = document.getElementById('root');
        console.log("hey")
        mainDiv?.classList.add('noMargin')
    })

    return (
        <div className={Styles.mapContainer}>
            <Map
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
            }}
            style={{position: 'relative', width: '100%', height: '100%'}}
            mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`}/>
        </div>
        
    )
}

export default Mapguy;