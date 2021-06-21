import React from 'react'

import { Itable_data } from '../../interfaces';

interface Props {
    data: Itable_data[] | undefined
}

export const Table: React.FC<Props> = () => {
    return (
        <div>
            <h1>Table</h1>

        </div>);
}