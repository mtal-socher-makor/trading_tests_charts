import { forwardRef } from 'react'

const  Marks = forwardRef(({d,xScale,yScale,xValue,yValue, innerHeight, type}, ref) =>  {
  return (
    <g key={yValue(d)} ref={ref}>
                {type === "B" && 
                <text
                x={xScale(xValue(d)) + 7}
                y={yScale(yValue(d)) - 10}
                fill="#fff"
                textAnchor='middle'
                >
                    {Math.round(d.tradeTime*1000)}
                </text>}
                <rect
                className="mark"
               
                x={xScale(xValue(d))}
                y={yScale(yValue(d))}
                //width={xScale(xValue(d))}
                width={type === "A" ? xScale.bandwidth() : "15px"}                                                                                                                                                                                                                                                                                                                                                        
                height={innerHeight - yScale(yValue(d))}
                fill="var(--secondary)"
                >
               {type === "A" && <title>{d.name} {d.side} {d.type} {Math.round(d.time*1000)}ms</title>}
            </rect>
    </g>
  )
})

export default Marks