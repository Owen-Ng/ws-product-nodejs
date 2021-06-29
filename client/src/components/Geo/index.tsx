import React from 'react'

import { Igeo_data } from '../../interfaces';
import { Map } from './Map';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './index.css';
interface Props {
    data: Igeo_data[] | undefined
}
export const Geo: React.FC<Props> = (props) => {
    const [events, Setevents] = React.useState<boolean>(true);
    const [impressions, Setimpressions] = React.useState<boolean>(true);
    const [clicks, Setclicks] = React.useState<boolean>(true);
    const [revenue, Setrevenue] = React.useState<boolean>(true);

    return (
        <div className="geo-container">
            <h1>Geo</h1>
            <div id="buttons">
                <div onClick={() => Setevents(!events)}><div className="red">     </div><span className={events ? "" : "overline"}>events</span></div>
                <div onClick={() => Setimpressions(!impressions)}><div className="blue">     </div><span className={impressions ? "" : "overline"}>impressions</span></div>
                <div onClick={() => Setclicks(!clicks)}><div className="yellow">     </div><span className={clicks ? "" : "overline"}>clicks</span></div>
                <div onClick={() => Setrevenue(!revenue)}><div className="green">     </div><span className={revenue ? "" : "overline"}>revenue</span></div>
            </div>
            <Map data={props.data} Isevents={events} Isimpressions={impressions} Isclicks={clicks} Isrevenue={revenue} />
        </div>);
}