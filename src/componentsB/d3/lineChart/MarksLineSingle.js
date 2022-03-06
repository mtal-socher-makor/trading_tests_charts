import { useState, useRef, useEffect } from 'react'
import Tooltip from '../Tooltip'
import { descending } from 'd3'
import { useSelector, useDispatch } from 'react-redux'
import { setHoveredTrade } from '../../../Redux/Trades/TradesSlice'

function MarksLineSingle({ d, xValue, yValue, xScale, yScale, color }) {
  //const [tooltipState, setTooltipState] = useState(false)
  const error = useSelector((state) => state.groupingAndFilters?.error)
  const dispatch = useDispatch()
  function tooltipEnter() {
    dispatch(setHoveredTrade(d))
  }

  function tooltipLeave() {
    dispatch(setHoveredTrade({}))
  }

  const elementRef = useRef()

  useEffect(() => {
    elementRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [])

  return (
    <g key={d.id} ref={elementRef} onMouseEnter={tooltipEnter} onMouseLeave={tooltipLeave}>
      <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={d.id === error ? 10 : 5} fill={d.id === error ? 'red' : color} ></circle>
      <text x={xScale(xValue(d))} y={yScale(yValue(d)) - 18} fill='#fff' textAnchor='middle' >
        {d.tradeTime}
      </text>
      {/* {tooltipState || d.id === error ? (
        <Tooltip
          id='tooltip'
          x={xScale(xValue(d)) + 5}
          y={yScale(yValue(d)) - 18}
          d={d}
          //{...(tooltipState && {onMouseEnter: () => raise()})}
        />
      ) : null} */}
    </g>
  )
}

export default MarksLineSingle
