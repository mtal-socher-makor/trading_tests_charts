import { useState, useRef, useEffect } from 'react'
import Tooltip from '../Tooltip'
import { raise } from 'd3'

function MarksLineSingle({ d, xValue, yValue, xScale, yScale, color }) {
  const [tooltipState, setTooltipState] = useState(false)

  function tooltipEnter() {
    setTooltipState(true)
  }

  function tooltipLeave() {
    setTooltipState(false)
  }

  const elementRef = useRef()

  useEffect(() => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [])

  return (
    <g key={d.id} ref={elementRef}>
        <circle cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={6} fill={color} onMouseEnter={tooltipEnter} onMouseLeave={tooltipLeave} />
      <text x={xScale(xValue(d))} y={yScale(yValue(d)) - 18} fill='#fff' textAnchor='middle' {...(tooltipState && { fillOpacity: 0 })}>
        {d.tradeTime}
      </text>
      {tooltipState && (
        <Tooltip
          id='tooltip'
          x={xScale(xValue(d)) + 5}
          y={yScale(yValue(d)) - 18}
          d={d}
          //{...(tooltipState && {onMouseEnter: () => raise()})}
        />
      )}
    </g>
  )
}

export default MarksLineSingle
