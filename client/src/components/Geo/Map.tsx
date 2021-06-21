import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Igeo_data } from '../../interfaces';

interface Props {
    data: Igeo_data[] | undefined

}

export const Map: React.FC<Props> = (props) => {
    return (<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{ height: '500px', width: "80%" }}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker> */}
    </MapContainer>);
}