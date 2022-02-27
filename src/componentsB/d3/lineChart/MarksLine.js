import { useEffect, forwardRef } from 'react'
import { line, transition, easeSin } from 'd3'
import MarksLineSingle from './MarksLineSingle'

import { useSelector, useDispatch } from 'react-redux'
import createDataArrays from '../../../helperFunctions/createDataArrays'

const transitionPath = transition().ease(easeSin).duration(2500)

const MarksLine = forwardRef(({ xScale, yScale, xValue, yValue }) => {
  const dataStates = useSelector((state) => state.trades?.dataStates)
  const groupBy = useSelector((state) => state.groupingAndFilters?.grouping)
  const filters = useSelector((state) => state.groupingAndFilters?.filters)
  const [arrays, arrayNames, colorScale] = createDataArrays(dataStates, groupBy, filters)

  return (
    <>
      <g className='marks' transform='translate(10,35)'>
        {(groupBy?.thread && arrays?.length) || (arrays?.length && (groupBy?.type || groupBy?.side || groupBy?.location))
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
                      .y((d) => yScale(yValue(d)))(arr)}
                  />
                  {arr.map((d) => {
                    return <MarksLineSingle d={d} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} color={colorScale(arrayNames[index])} />
                  })}
                </>
              )
            })
          : null}
        {dataStates?.stateTradesPartly?.length && (
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
                .y((d) => yScale(yValue(d)))(dataStates?.stateTradesPartly)}
            />
            {dataStates?.stateTradesPartly.map((d) => (
              <MarksLineSingle d={d} xScale={xScale} yScale={yScale} xValue={xValue} yValue={yValue} color='rgba(0, 255, 0 ,1)' />
            ))}
          </>
        )}
      </g>
    </>
  )
})

export default MarksLine
