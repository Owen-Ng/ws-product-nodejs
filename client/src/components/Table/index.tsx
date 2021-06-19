import React from 'react'

import { Ieventshourly, Ieventsdaily, Istatshourly, Istatsdaily, Ipoi } from '../../interfaces';

interface Props {
    statshour: Istatshourly[] | undefined,
    statsdaily: Istatsdaily[] | undefined,
    eventsdaily: Ieventsdaily[] | undefined,
    eventshour: Ieventshourly[] | undefined,
    poi: Ipoi[] | undefined
}

export const Table: React.FC<Props> = () => {
    return (
        <div>
            <h1>Table</h1>

        </div>);
}