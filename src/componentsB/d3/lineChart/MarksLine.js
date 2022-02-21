import { useState,forwardRef } from 'react'
import { line,  curveNatural, transition, ease,duration, easeSin } from "d3";
import Tooltip from '../Tooltip';
import MarksLineSingle from './MarksLineSingle';

const transitionPath = transition().ease(easeSin).duration(2500);

const  MarksLine = forwardRef(({data,xScale,yScale,xValue,yValue,tooltipFormat, innerHeight, type}, ref) =>  {

  //const [showTooltips, setShowTooltips] = useState(true)

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

        <MarksLineSingle 
          d={d}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      ))
    }
  </g>
  )
})

export default MarksLine;