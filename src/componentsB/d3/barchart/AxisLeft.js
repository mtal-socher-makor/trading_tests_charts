import React, {useRef, useEffect} from "react";

function AxisLeft({ tickValue, yScale, innerWidth }) {

  // const countRef = useRef(0);

  // useEffect(() => {
  //   countRef.current++;
  // }, [dataStates])

  // const elementRef = useRef();

  //   useEffect(() => {
  //     elementRef.current?.scrollBy(30,0);
  //   }, [stateTrades])

  return (
        <g className="tick" transform="translate(10,0)">
          <line
            x1={0}
            x2={innerWidth}
            y1={yScale(tickValue) }
            y2={yScale(tickValue)}
            stroke="#646970"
          />
          {/* <text
            key={tickValue}
            style={{ textAnchor: "end" }}
            x={-12}
            dy=".32em"
            y={yScale(tickValue)}
            stroke="#fff"
          >
            {tickValue}
          </text> */}
        </g>
  );
}

export default AxisLeft;
