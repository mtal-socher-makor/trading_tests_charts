import { useState, forwardRef } from 'react'
import { line, curveNatural, curveCardinal, transition, ease, duration, easeSin, scaleOrdinal } from 'd3'
import Tooltip from '../Tooltip'
import MarksLineSingle from './MarksLineSingle'
import createDataArrays from '../../../helperFunctions.js/createDataArrays'
const transitionPath = transition().ease(easeSin).duration(2500)

const MarksLine = forwardRef(({ xScale, yScale, xValue, yValue, tooltipFormat, innerHeight, type, groupBy, dataStates, filters }, ref) => {
  //const [showTooltips, setShowTooltips] = useState(true)
  const [stateTrades, stateTradesPartly, typeTrades, sideTrades, locationTrades, threadTrades] = dataStates
  const [groupByType, groupBySide, groupByLocation, groupByThread, allBtn] = groupBy
  const [arrays, arrayNames, colorScale] = createDataArrays(dataStates, groupBy,filters)
  return (
    <>
      <g className='marks'>
        {(groupByThread && arrays.length) || (arrays.length && (groupByType || groupBySide || groupByLocation))
          ? arrays.map((arr, index) => {
            console.log("ARRAYS", arrays)
              return (
                <>
                  <path
                    fill='none'
                    stroke={colorScale(arrayNames[index])}
                    strokeDashoffset='pathLength'
                    strokeDasharray='pathLength'
                    transition={transitionPath}
                    strokeDashoffset={0}
                    d={line()
                      .x((d) => xScale(xValue(d)))
                      .y((d) => yScale(yValue(d)))(arr)}
                  />
                  {arr.map((d) => {
                    return <MarksLineSingle d={d} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} color={colorScale(arrayNames[index])} />
                  })}
                </>
              )
            })
          : null}
        {
          (stateTradesPartly.length  && (
            <>
              <path
                fill='none'
                stroke='rgba(0, 700, 0 ,1)'
                strokeDashoffset='pathLength'
                strokeDasharray='pathLength'
                transition={transitionPath}
                strokeDashoffset={0}
                d={line()
                  .x((d) => xScale(xValue(d)))
                  .y((d) => yScale(yValue(d)))(stateTradesPartly)}
              />
              {stateTradesPartly.map((d) => (
                <MarksLineSingle d={d} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} color='rgba(0, 255, 0 ,1)' />
              ))}
            </>
          ))}
      </g>
    </>
  )
})

export default MarksLine
