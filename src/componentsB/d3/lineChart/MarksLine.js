import { useState, forwardRef } from 'react'
import { line, curveNatural, transition, ease, duration, easeSin, scaleOrdinal } from 'd3'
import Tooltip from '../Tooltip'
import MarksLineSingle from './MarksLineSingle'

const transitionPath = transition().ease(easeSin).duration(2500)

const MarksLine = forwardRef(({ data, data2, xScale, yScale, xValue, yValue, tooltipFormat, innerHeight, type, groupBy, dataStates }, ref) => {
  //const [showTooltips, setShowTooltips] = useState(true)
  const [stateTrades, stateTradesPartly, typeTrades, sideTrades, locationTrades] = dataStates
  const [groupByType, groupBySide, groupByLocation] = groupBy
  let gdata = []
  if (groupByType === true) {
    gdata = typeTrades
  } else if (groupBySide === true) {
    gdata = sideTrades
  } else if (groupByLocation === true) {
    gdata = locationTrades
  }
  let arrays = Object.values(gdata)
  let arrayNames = Object.keys(gdata)
  const colorScale = scaleOrdinal()
    .domain([...arrayNames])
    .range(['#e41a1c', '#ffff33', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])
  console.log('arrays', arrays)
  return (
    <g className='marks'>
      {arrays.length
        ? arrays.map((arr, index) => {
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
                    .y((d) => yScale(yValue(d)))
                    .curve(curveNatural)(arr)}
                />
                {arr.map((d) => (
                  <MarksLineSingle d={d} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} color={colorScale(arrayNames[index])} />
                ))}
              </>
            )
          })
        : // <>
          //   <path
          //     fill='none'
          //     stroke="rgba(0, 255, 0 ,1)"
          //     strokeDashoffset='pathLength'
          //     strokeDasharray='pathLength'
          //     transition={transitionPath}
          //     strokeDashoffset={0}
          //     d={line()
          //       .x((d) => xScale(xValue(d)))
          //       .y((d) => yScale(yValue(d)))
          //       .curve(curveNatural)(stateTrades)}
          //   />
          //   {stateTrades.map((d) => (
          //     <MarksLineSingle d={d} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} color="rgba(0, 255, 0 ,1)" />
          //   ))}
          // </>
          null}
      {stateTradesPartly.length && (
        <>
          <path
            fill='none'
            stroke='rgba(0, 255, 0 ,1)'
            strokeDashoffset='pathLength'
            strokeDasharray='pathLength'
            transition={transitionPath}
            strokeDashoffset={0}
            d={line()
              .x((d) => xScale(xValue(d)))
              .y((d) => yScale(yValue(d)))
              .curve(curveNatural)(stateTradesPartly)}
          />
          {stateTradesPartly.map((d) => (
            <MarksLineSingle d={d} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} color='rgba(0, 255, 0 ,1)' />
          ))}
        </>
      )}
    </g>
  )
})

export default MarksLine
