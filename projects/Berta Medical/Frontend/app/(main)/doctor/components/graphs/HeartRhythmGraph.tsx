"use client"
import React, { useState } from 'react'
import { VictoryAxis, VictoryBrushContainer, VictoryChart, VictoryLabel, VictoryLine, VictoryTooltip, VictoryZoomContainer } from 'victory'

type input = {
    hours: number
    minutes: number
    seconds: number
    label?: boolean
    graphName?: string | "Heart Rate"
}

const HeartRhythmGraph = ({hours, minutes, seconds, label, graphName} : input) => {

  const [zoomDomain, setZoomDomain] = useState(0);
  const [graphData,  setGraphData]: any = useState([]);

  const generateRandomData = () => {
    const data = [];
    let initialValue = 0;

    for (let i = 0; i <= hours; i++) {
        for (let j = 0; j < minutes; j++) {
            for (let k = 0; k < seconds; k += 60) {
                let randomValue;
                if (Math.random() < 0.01) { // 1% chance of generating a value between 60 and 120
                    randomValue = Math.random() * 60 + 60;
                } else {
                    randomValue = Math.random() * 15 + 85; // Generate a value between 75 and 90
                }
    
                let bias = 0;
                let initialValue =  randomValue + bias;
    
                // Adjust the initial value based on the beating pattern
                if (i % 60 < 30) {
                    initialValue *= 0.8; // Reduce the amplitude of the heart during the diastolic phase
                } else {
                    initialValue *= 1.2; // Increase the amplitude of the heart during the systolic phase
                }
                if ((j % minutes == 0 || initialValue > 90 || initialValue < 60) && label) {
                data.push({ x: new Date(2024, 4, 6, i, j, 0), y: initialValue, label: Math.round(initialValue) });
                }
                else {
                data.push({ x: new Date(2024, 4, 6, i, j, 0), y: initialValue});
                }
            }
        }
    }

    return data;
  };

  const graphDataHandler = () => {
    const data = generateRandomData();
    setGraphData(data);
  }

  return (
    <div>
        <VictoryChart
            width={900}
            height={250}
            scale={{x: "time"}}
            containerComponent={
              <VictoryZoomContainer responsive={false}
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={setZoomDomain}
              />
            }
          >
            <VictoryLabel x={20} y={30} text={graphName}></VictoryLabel>
            <VictoryLine
              style={{
                data: {stroke: "darkblue"}
              }}
              data={graphData}
            />

          </VictoryChart>
          <button onClick={graphDataHandler} className='bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'>Get Data</button>
    </div>
  )
}

export default HeartRhythmGraph