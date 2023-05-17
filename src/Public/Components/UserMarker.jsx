import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';


export const UserMarker = () => {

    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })
    

    useEffect(() => {
        map.locate();
      }, [map]);

    return position === null ? null : (

        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
};
