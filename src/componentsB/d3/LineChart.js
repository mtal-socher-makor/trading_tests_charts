import React, { useState, useCallback, useEffect } from "react";
import { scaleBand, scaleLinear, max, format, group, scaleOrdinal } from "d3";
import AxisBottom from "./barchart/AxisBottom";
import AxisLeft from "./barchart/AxisLeft";
import MarksLine from "./lineChart/MarksLine";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../../styles/mainStyles";
//import GroupBy from '../GroupBy'

function LineChart({ type, groupBy, dataStates ,filters}) {
  const [stateTrades] = dataStates;
  const windowWidth = window.innerWidth;
  const dynamicWidth = windowWidth + stateTrades.length * 30;
  const height = 450;
  const margin = { top: -20, right: 30, bottom: 60, left: 90 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = dynamicWidth - margin.left - margin.right;
  // const stylesProps = {
  //   w: width,
  // }
  const classes = useStyles();

  const yValue = (d) => d.tradeTime;
  const xValue = (d) => d.id;

  const siFormat = format(".2s");
  const yAxisTickFormat = (tickValue) => siFormat(tickValue);

  const xScale = scaleBand()
    .domain(dataStates[0].map(xValue))
    .range([20, dataStates[0].length * 35])
    .paddingInner(0.15);

  const yScale = scaleLinear()
    .domain([0, max(dataStates[0], yValue)])
    .range([innerHeight - 30, 60]);

  return (
    <Grid
      container
      style={{ position: "relative", width: dynamicWidth }}
    >
      <svg width={dynamicWidth} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xScale.domain().map((tickValue) => (
            <AxisBottom
              xScale={xScale}
              innerWidth={innerWidth}
              tickValue={tickValue}
            />
          ))}
              {yScale.ticks().map((tickValue) => (
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
            transform={`translate(-55, ${innerHeight / 2}) rotate(-90)`}
            style={{ fontSize: 30 }}
          >
            Time (seconds)
          </text>

          <MarksLine
            type={type}
            groupBy={groupBy}
            dataStates={dataStates}
            filters={filters}
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
  );
}

export const MemoLineChart = React.memo(LineChart);
