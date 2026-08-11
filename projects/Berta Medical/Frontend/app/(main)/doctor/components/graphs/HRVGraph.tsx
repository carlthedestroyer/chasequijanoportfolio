"use client";
import React from 'react';
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel } from 'victory';

const data = [
    { "age": 54, "hrv": 76 },
    { "age": 33, "hrv": 57 },
    { "age": 20, "hrv": 62 },
    { "age": 24, "hrv": 58 },
    { "age": 59, "hrv": 36 },
    { "age": 61, "hrv": 49 },
    { "age": 28, "hrv": 43 },
    { "age": 36, "hrv": 41 },
    { "age": 46, "hrv": 54 },
    { "age": 87, "hrv": 73 },
    { "age": 66, "hrv": 99 },
    { "age": 37, "hrv": 42 },
    { "age": 21, "hrv": 85 },
    { "age": 43, "hrv": 58 },
    { "age": 52, "hrv": 17 },
    { "age": 64, "hrv": 33 },
    { "age": 49, "hrv": 26.4 },
    { "age": 70, "hrv": 100 },
    { "age": 108, "hrv": 63 },
    { "age": 43, "hrv": 58 }
];

const HRVGraph = () => {
  return (
    <div>
        <h1 className="font-bold text-2xl -mb-2 ml-2">HRV vs Age - Males</h1>
        <VictoryChart>
        <VictoryScatter
            data={data}
            x="age"
            y="hrv"
            style={{
            data: { fill: 'teal' },
            }}
            size={5} // Adjust the size of the dots as needed
        />
        <VictoryAxis
            label="Age"
            tickValues={[0,10,20, 30, 40, 50,60,70,80,90,100]}
            tickFormat={['0', '10', '20', '30', '40', '50','60','70','80','90','100']}
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

export default HRVGraph;