import React from 'react'

import { Igeo_data } from '../../interfaces';
import { Map } from './Map';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Props {
    data: Igeo_data[] | undefined
}
export const Geo: React.FC<Props> = (props) => {
    return (
        <div className="geo-container">
            <h1>Geo</h1>
            <Map data={props.data} />
        </div>);
}