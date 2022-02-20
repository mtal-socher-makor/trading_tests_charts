import React from 'react'

function AxisBottom({xScale, innerWidth, tickValue}) {
  return (
      
  //  { xScale.domain().map(tickValue => (
        <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
          <line y2={innerWidth} />
          <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerWidth + 3}>
            {/* {tickFormat(tickValue)} */}
            {tickValue}
          </text>
        </g>
  )
}

export default AxisBottom