import React, { useState, useCallback, useEffect } from 'react';
import { scaleBand, scaleLinear, max, format, group } from 'd3';
import AxisBottom from './barchart/AxisBottom';
import AxisLeft from './barchart/AxisLeft';
import MarksLine from './lineChart/MarksLine';
import { Grid, Typography } from '@material-ui/core';
import { useStyles } from '../../styles/mainStyles';
//import GroupBy from '../GroupBy'


const width = "5000";
const height = 450;
const margin = { top:-20, right: 30, bottom: 60, left: 90 };
const xAxisLabelOffset = 50;



function LineChart({ data, type, groupBy}) {
console.log("MYDATA",data)
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  
  
  const classes = useStyles();

  const yValue = (d) => d.tradeTime
  const xValue = (d) => d.id

  const siFormat = format('.2s');
  const yAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, data.length * 30])
    .paddingInner(0.15)

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight - 30, 60])

     

  return (
    <Grid container className={classes.linechartContainer} >
      <svg width={width} height={height} >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xScale.domain().map((tickValue) => (
            <AxisBottom xScale={xScale} innerWidth={innerWidth} tickValue={tickValue} />
          ))}
          {yScale.ticks().map((tickValue) => (
            <AxisLeft key={tickValue} yScale={yScale} tickFormat={yAxisTickFormat} innerWidth={innerWidth} tickValue={tickValue} />
          ))}
          <text className='axis-label' x={0} y={0} textAnchor='middle' stroke='#fff' fill='#fff' transform={`translate(-55, ${innerHeight / 2}) rotate(-90)`} style={{ fontSize: 30 }}>
            Time (seconds)
          </text>

          <MarksLine
            type={type}
            data={data}
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


export const MemoLineChart = React.memo(LineChart)
