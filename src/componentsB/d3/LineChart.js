
import React, { useState, useCallback, useEffect } from 'react';
import { scaleBand, scaleLinear, max, format } from 'd3';
import AxisBottom  from './barchart/AxisBottom';
import AxisLeft  from './barchart/AxisLeft';
import MarksLine from "./lineChart/MarksLine";
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from "../../styles/mainStyles"


const width = "5000";
const height = 700;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;


function LineChart({ data, type }) {
  
  const classes = useStyles();

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const yValue = d => d.tradeTime;
    const xValue = d => d.id;

    const siFormat = format('.2s');
    const yAxisTickFormat = tickValue => siFormat(tickValue);

    const xScale = scaleBand()
      .domain(data.map(xValue))
      .range([0, data.length*30])
    //   .range([0, innerWidth])
      .paddingInner(0.15);

    const yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([innerHeight - 30, 60]);

  return (
    <Grid container className={classes.barchartContainer} >
      
      <svg width={width} height={height} >
        <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.domain().map(tickValue => (
          <AxisBottom
          xScale={xScale}
          innerWidth={innerWidth}
          tickValue={tickValue}
          
          />
        ))}
         {yScale.ticks().map(tickValue => (
          <AxisLeft 
            key={tickValue}
            yScale={yScale}
            tickFormat={yAxisTickFormat}
            innerWidth={innerWidth}
            tickValue={tickValue}
            />
         ))}
         <text
            className="axis-label"
            x={0}
            y={0}
            textAnchor="middle"
            stroke="#fff"
            fill="#fff"
            transform={`translate(-55, ${innerHeight /2}) rotate(-90)`}
            style={{fontSize: 30}}
            
          >
            Time (seconds)
        </text>          
         
        <MarksLine 
            type={type}
            data={data}
            //key={`${d.time}${d.name}${d.type}`}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
            //tooltipFormat={yAxisTickFormat}
                />
        </g>
      </svg>
    </Grid>
  )
}

export default LineChart