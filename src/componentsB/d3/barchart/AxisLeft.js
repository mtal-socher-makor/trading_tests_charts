import React, { useRef, useEffect } from "react";

function AxisLeft({ tickValue, yScale, innerWidth }) {
  return (
    <g className="tick" transform="translate(10,35)" key={tickValue}>
      <line
        x1={0}
        x2={innerWidth}
        y1={yScale(tickValue)}
        y2={yScale(tickValue)}
        stroke="#646970"
      />
    </g>
  );
}

export default AxisLeft;
