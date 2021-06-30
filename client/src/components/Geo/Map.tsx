import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Icon } from "leaflet";
// import MarkerClusterGroup from 'react-leaflet-markercluster';

import { Igeo_data } from '../../interfaces';
import MarkerClusterGroup from 'react-leaflet-cluster'
const pin = new Icon({ iconUrl: "/pin.png", iconSize: [30, 30], });

interface Props {
    data: Igeo_data[] | undefined
    Isevents: boolean;
    Isimpressions: boolean;
    Isclicks: boolean;
    Isrevenue: boolean;
}
const blueOptions = { fillColor: 'blue' }
const greenOptions = { color: 'green' }
const yellowOptions = { color: 'yellow' }
const redOptions = { color: 'red' }

export const Map: React.FC<Props> = (props) => {
    const [Markers, setMarkers] = React.useState<React.ReactElement[] | []>([])
    // React.useEffect(() => {
    //     setMarkers([]);
    //     props.data?.forEach(i => {
    //         const location: [number, number] = [i.lat, i.lon];
    //         const name = i.name;
    //         console.log(i.revenue);
    //         setMarkers(prev => {
    //             const impressions = i.impressions / 10000;
    //             const clicks = i.clicks / 10;
    //             const revenue = i.revenue / 100;
    //             return [...prev,
    //             <div>
    //                 {/* events */}
    //                 <Marker key={i.poi_id} position={location} icon={pin}></Marker>
    //                 {props.Isevents ?
    //                     <CircleMarker key={i.poi_id + "e"} center={[location[0], location[1]]} pathOptions={redOptions} radius={i.events}>
    //                         <Popup>{name} <br />events: {i.events}</Popup>
    //                     </CircleMarker>
    //                     : ""}

    //                 {/* impressions */}
    //                 {props.Isimpressions ?
    //                     <CircleMarker key={i.poi_id + "i"} center={[location[0], location[1]]} pathOptions={blueOptions} radius={impressions}>
    //                         <Popup>{name} <br />impressions: {i.impressions}</Popup>
    //                     </CircleMarker>
    //                     : ""}

    //                 {/* clicks */}
    //                 {props.Isclicks ?
    //                     <CircleMarker key={i.poi_id + "c"} center={[location[0], location[1]]} pathOptions={yellowOptions} radius={clicks}>
    //                         <Popup>{name} <br />clicks: {i.clicks}</Popup>
    //                     </CircleMarker>
    //                     : ""}

    //                 {/* revenue */}
    //                 {props.Isrevenue ?
    //                     <CircleMarker key={i.poi_id + "r"} center={[location[0], location[1]]} pathOptions={greenOptions} radius={revenue}>
    //                         <Popup>{name} <br />revenue: {i.revenue}</Popup>
    //                     </CircleMarker>
    //                     : ""}

    //             </div>

    //             ]
    //         }
    //         )

    //     })

    // }, [props.data, props.Isrevenue, props.Isclicks, props.Isimpressions, props.Isevents])
    console.log(Markers)
    return (<MapContainer center={[51.505, -0.09]} zoom={13} noWrap={true} scrollWheelZoom={true} style={{ height: '500px', width: "80%", margin: "auto" }} >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.data?.map(i => {
            const location: [number, number] = [i.lat, i.lon];
            const name = i.name;

            const impressions = i.impressions / 10000;
            const clicks = i.clicks / 10;
            const revenue = i.revenue / 100;
            return (
                <div>
                    {/* events */}
                    {props.Isevents ?
                        <CircleMarker key={i.poi_id + "e"} center={[location[0], location[1]]} pathOptions={redOptions} radius={i.events}>
                            <Popup>{name} <br />events: {i.events}</Popup>
                        </CircleMarker>
                        : ""}

                    {/* impressions */}
                    {props.Isimpressions ?
                        <CircleMarker key={i.poi_id + "i"} center={[location[0], location[1]]} pathOptions={blueOptions} radius={impressions}>
                            <Popup>{name} <br />impressions: {i.impressions}</Popup>
                        </CircleMarker>
                        : ""}

                    {/* clicks */}
                    {props.Isclicks ?
                        <CircleMarker key={i.poi_id + "c"} center={[location[0], location[1]]} pathOptions={yellowOptions} radius={clicks}>
                            <Popup>{name} <br />clicks: {i.clicks}</Popup>
                        </CircleMarker>
                        : ""}

                    {/* revenue */}
                    {props.Isrevenue ?
                        <CircleMarker key={i.poi_id + "r"} center={[location[0], location[1]]} pathOptions={greenOptions} radius={revenue}>
                            <Popup>{name} <br />revenue: {i.revenue}</Popup>
                        </CircleMarker>
                        : ""}

                </div>
            )
        })}
        <MarkerClusterGroup>
            {/* {Markers.map(res => { return res })} */}
            {props.data?.map(i => {
                const location: [number, number] = [i.lat, i.lon];
                return (
                    <div>
                        {/* events */}
                        <Marker key={i.poi_id} position={location} icon={pin}></Marker>
                    </div>

                );
            }
            )

            }


        </MarkerClusterGroup>
    </MapContainer>);
}