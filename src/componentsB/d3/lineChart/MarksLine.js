import { forwardRef } from 'react'
import { line, curveNatural, transition, ease,duration, easeSin } from "d3";

const transitionPath = transition().ease(easeSin).duration(2500);

const  MarksLine = forwardRef(({data,xScale,yScale,xValue,yValue,tooltipFormat, innerHeight, type}, ref) =>  {

  return (

    <g className="marks">
      <path
        fill="none"
        stroke="#fff"
        strokeDashoffset="pathLength"
        strokeDasharray="pathLength"
        transition={transitionPath}
        strokeDashoffset={0}
        d={line()
          .x(d => xScale(xValue(d)))
          .y(d => yScale(yValue(d)))
          .curve(curveNatural)(data)}
      />
    {
      data.map(d => (
        <>
        <circle  
          cx={xScale(xValue(d))} 
          cy={yScale(yValue(d))} 
          r={6} 
          fill="var(--secondary)">
        </circle>
          <text 
          x={xScale(xValue(d))} 
          y={yScale(yValue(d)) - 18} 
          fill="#fff"
          textAnchor='middle'
          >
            {Math.round(d.tradeTime*1000)}</text>
        </>
      ))
    }
  </g>
    // <g  key={yValue(d)} ref={ref}>
    //             {type === "B" && 
    //             <text
    //             x={xScale(xValue(d)) + 7}
    //             y={yScale(yValue(d)) - 10}
    //             fill="#fff"
    //             textAnchor='middle'
    //             >
    //                 {Math.round(d.time*1000)}
    //             </text>}
    //             <rect
    //             className="mark"
               
    //             x={xScale(xValue(d))}
    //             y={yScale(yValue(d))}
    //             //width={xScale(xValue(d))}
    //             width={type === "A" ? xScale.bandwidth() : "15px"}                                                                                                                                                                                                                                                                                                                                                        
    //             height={innerHeight - yScale(yValue(d))}
    //             fill="var(--secondary)"
    //             >
    //            {type === "A" && <title>{d.name} {d.side} {d.type} {Math.round(d.time*1000)}ms</title>}
    //         </rect>
    // </g>
  )
})

export default MarksLine;