import React, { ReactElement } from 'react'
import { statsdaily } from '../../api_calls';
import { Ieventshourly, Ieventsdaily, Istatshourly, Istatsdaily, Ipoi } from '../../interfaces';
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";
import { RadarChart } from "../RadarChart";
import "./Chart.css"
interface Props {
    statshour: Istatshourly[] | undefined,
    statsdaily: Istatsdaily[] | undefined,
    eventsdaily: Ieventsdaily[] | undefined,
    eventshour: Ieventshourly[] | undefined,
    poi: Ipoi[] | undefined
}

export const Chart: React.FC<Props> = (props) => {
    const [chart, Setchart] = React.useState<ReactElement | undefined>()
    const [Active, SetActive] = React.useState<string>('');
    const [chartoption, Setchartoption] = React.useState<string>('Bar');
    function Chart(event: React.MouseEvent<HTMLButtonElement>) {
        const name: keyof Props = (event.target as HTMLTextAreaElement).name as keyof Props;
        SetActive(name);
        Setchart(undefined);
        if (chartoption === "Bar") {
            Setchart(<BarChart data={props[name]} />)


        }
        else if (chartoption === "Line") {
            Setchart(<LineChart data={props[name]} />)


        } else if (chartoption === "Radar") {
            Setchart(<RadarChart data={props[name]} />)


        }
        // return (<BarChart data={props[name]}/>)
    }
    function HandleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const name: string = event.target.value;
        Setchartoption(name);

    }
    return (
        <div>
            <div id="chart-header">
                <select onChange={HandleChange} value={chartoption}>
                    <option value="Bar">Bar</option>
                    <option value="Line">Line</option>
                    <option value="Radar">Radar</option>

                </select>

                <h1>Chart</h1>


            </div>
            {/* <BarChart data={props.eventshour} /> */}
            {chart}
            <div id="button-container">
                <button name='eventsdaily' onClick={Chart} className={Active === 'eventsdaily' ? 'button-selected' : ''}>Daily Events</button>
                <button name="eventshour" onClick={Chart} className={Active === "eventshour" ? 'button-selected' : ''}>Hourly Events</button>
                <button name="statsdaily" onClick={Chart} className={Active === "statsdaily" ? 'button-selected' : ''}>Daily Stats</button>
                <button name="statshour" onClick={Chart} className={Active === "statshour" ? 'button-selected' : ''}>Hourly Stats</button>
            </div>



        </div>);
}