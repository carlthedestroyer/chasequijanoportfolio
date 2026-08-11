"use client";
import React from 'react';
import { VictoryChart, VictoryScatter, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

const data = [
    { x: 0, y: 100 },
    { x: 0, y: 0 },
    { x: 0, y: 25 },
    { x: 1, y: 28.1 },
    { x: 4, y: 22.9 },
    { x: 2, y: 25.5 },
    { x: 6, y: 32.3 },
    { x: 8, y: 25.7 },
    { x: 3, y: 44.2 },
    { x: 7, y: 25.8 },
    { x: 5, y: 20.6 },
    { x: 9, y: 25.4 },
    { x: 10, y: 24.1 },
    { x: 12, y: 20.9 },
    { x: 11, y: 25.5 },
    { x: 13, y: 20.3 },
    { x: 15, y: 25.7 },
    { x: 14, y: 34.2 },
    { x: 17, y: 35.8 },
    { x: 16, y: 35.6 },
    { x: 19, y: 25.4 },
    { x: 20, y: 34.1 },
  ];

const averageHRV = data.reduce((sum, d) => sum + d.y, 0) / data.length;

const HRVDataGraph = () => {
    return (
        <div>
            <h1 className="font-bold text-2xl -mb-2 ml-2">HRV</h1>
            <VictoryChart>
                <VictoryLine
                data={data}
                x="x"
                y="y"
                style={{
                    data: { stroke: 'orange' },
                }}
                />
                <VictoryLine
                data={[{ x: 0, y: averageHRV }, { x: 20, y: averageHRV }]}
                style={{
                    data: { stroke: 'red', strokeWidth: 2 },
                }}
                />
                <VictoryAxis
                label="Time(min)"
                tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                tickFormat={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']}
                />
                <VictoryAxis
                label="HRV"
                dependentAxis
                tickFormat={(t) => t.toFixed(1)}
                />
            </VictoryChart>
        </div>
    );
  };

export default HRVDataGraph;