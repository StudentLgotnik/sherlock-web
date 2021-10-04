import React from 'react';

import {Chart} from './components/chart/chart';
import {List} from './components/list/list';


export const MainContent = props => {
    return (
        <div>
            <Chart />
            <List />
        </div>
    );
};

