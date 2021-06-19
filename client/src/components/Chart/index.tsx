import React from 'react'
import { statsdaily } from '../../api_calls';
import { Ieventshourly, Ieventsdaily, Istatshourly, Istatsdaily, Ipoi } from '../../interfaces';
import { BarChart } from "../BarChart";
interface Props {
    statshour: Istatshourly[] | undefined,
    statsdaily: Istatsdaily[] | undefined,
    eventsdaily: Ieventsdaily[] | undefined,
    eventshour: Ieventshourly[] | undefined,
    poi: Ipoi[] | undefined
}

export const Chart: React.FC<Props> = (props) => {


    return (
        <div>
            <h1>Chart</h1>
            <BarChart data={props.eventshour} />
        </div>);
}