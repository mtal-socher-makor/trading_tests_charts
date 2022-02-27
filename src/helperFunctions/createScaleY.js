import { scaleBand, scaleLinear, max, format, group, scaleOrdinal } from "d3";

const createScaleY = (data) => {
  const yValue = (d) => d.tradeTime;
  const siFormat = format(".2s");
  const yAxisTickFormat = (tickValue) => siFormat(tickValue);
  const windowWidth = window.innerWidth;
  const dynamicWidth = windowWidth + data?.length * 30;
  const height = 600;
  const margin = { top: -20, right: 30, bottom: 60, left: 20 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = dynamicWidth - margin.left - margin.right;

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight - 30, 60]);

  return [
    yScale,
    innerWidth,
    yAxisTickFormat,
    innerHeight,
    height,
    margin,
    dynamicWidth,
    yValue,
  ];
};

export default createScaleY;
