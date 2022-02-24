import React, {useRef, useEffect} from "react";

function AxisLeftText({ tickValue, yScale, innerWidth, stateTrades, innerHeight }) {

  

//   const elementRef = useRef();

    // useEffect(() => {
    //   elementRef.current?.scrollBy(30,0);
    // }, [stateTrades])

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
          {/* <text
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
          </text> */}
              </g>
  );
}

export default AxisLeftText;
