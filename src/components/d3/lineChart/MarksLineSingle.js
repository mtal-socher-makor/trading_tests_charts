import { useState, useRef, useEffect } from "react";
import Tooltip from "../Tooltip";
import { descending } from "d3";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";

function MarksLineSingle({ d, xValue, yValue, xScale, yScale, color }) {
  const [tooltipState, setTooltipState] = useState(false);
  const error = useSelector((state) => state.groupingAndFilters?.error);
  function tooltipEnter() {
    setTooltipState(true);
  }

  function tooltipLeave() {
    setTooltipState(false);
  }

  const elementRef = useRef();

  useEffect(() => {
    elementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, []);

  

  return (
    <g key={d.id} ref={elementRef}>
      <circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={d.id === error ? 6 : 3}
        fill={d.id === error ? "red" : color}
        onMouseEnter={tooltipEnter}
        onMouseLeave={tooltipLeave}
      ></circle>
      <text
        x={xScale(xValue(d))}
        y={yScale(yValue(d)) - 18}
        fill="#fff"
        textAnchor="middle"
        {...(tooltipState && { fillOpacity: 0 })}
      >
        {d.tradeTime}
      </text>
      {tooltipState || d.id === error ? (
        <Tooltip
          id="tooltip"
          x={xScale(xValue(d)) + 5}
          y={yScale(yValue(d)) - 18}
          d={d}
          //{...(tooltipState && {onMouseEnter: () => raise()})}
        />
      ) : null}
    </g>
  );
}

export default MarksLineSingle;
