import React from "react";
import { scaleBand } from "d3";
import AxisBottom from "./lineChart/AxisBottom";
import AxisLeft from "./lineChart/AxisLeft";
import MarksLine from "./lineChart/MarksLine";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import createScaleY from "../../helperFunctions/createScaleY";
import TooltipRegular from "./TooltipRegular";


function LineChart() {
  const stateTrades = useSelector(
    (state) => state.trades?.dataStates?.stateTrades
  );
  //const [arrays, arrayNames, colorScale] = createDataArrays(dataStates, groupBy, filters)

 
  const [
    yScale,
    innerWidth,
    yAxisTickFormat,
    innerHeight,
    height,
    margin,
    dynamicWidth,
    yValue,
  ] = createScaleY(stateTrades);


  const xValue = (d) => d.id;


  const xScale = scaleBand()
    .domain(stateTrades.map(xValue))
    .range([20, stateTrades.length * 35])
    .paddingInner(0.15);

  return (
    <Grid item style={{ position: "relative", width: dynamicWidth }}>
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
              innerHeight={innerHeight}
            />
          ))}

          <MarksLine
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
      {stateTrades. length && stateTrades.map(trade => (
        <TooltipRegular 
          d={trade}
          x={xScale(xValue(trade)) + 5}
          y={yScale(yValue(trade)) - 18}
        />
      ))}
    </Grid>
  );
}

export default LineChart;
