import React from "react";

function AxisBottom({ xScale, innerWidth, tickValue }) {
  return (
    <g key={`${xScale}${tickValue}`}
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerWidth} />
    </g>
  );
}

export default AxisBottom;
