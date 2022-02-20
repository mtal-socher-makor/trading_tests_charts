import React from 'react'

function AxisLeft({  tickValue, yScale, innerWidth }) {
  return (
            <g className="tick" >
              <line x1={0} x2={innerWidth} y1={yScale(tickValue)} y2={yScale(tickValue)} stroke="#fff"/>
            <text
                key={tickValue}
                style={{ textAnchor: 'end' }}
                x={-12}
                dy=".32em"
                y={yScale(tickValue)}
                stroke="#fff"
            >
                {tickValue}
            </text>
            </g>
       
    
  )
}

export default AxisLeft