import React, { useRef, useEffect } from "react";

function AxisLeftText({ tickValue, yScale }) {
  return (
    <g>
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        x={60}
        dy=".32em"
        y={yScale(tickValue) + 8}
        stroke="#fff"
        fill="#fff"
      >
        {tickValue}
      </text>
    </g>
  );
}

export default AxisLeftText;
