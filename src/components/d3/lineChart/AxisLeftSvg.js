import { useSelector } from "react-redux";
import createScaleY from "../../../helperFunctions/createScaleY";
import AxisLeftText from "./AxisLeftText";
const AxisLeftSvg = (props) => {
  const stateTrades = useSelector(
    (state) => state.trades?.dataStates?.stateTrades
  );
  const [yScale, innerWidth, yAxisTickFormat, innerHeight] =
    createScaleY(stateTrades);
  return (
    <svg width={60} height={innerHeight}>
      <g>
        {stateTrades.length > 0 && (
          <text
            className="axis-label"
            x={0}
            y={0}
            textAnchor="middle"
            stroke="#fff"
            fill="#fff"
            transform={`translate(25, ${innerHeight / 2 + 40}) rotate(-90)`}
            style={{ fontSize: 30 }}
          >
            Time (seconds)
          </text>
        )}

        {yScale.ticks().map((tickValue) => (
          <AxisLeftText
            key={tickValue}
            tickValue={tickValue}
            yScale={yScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        ))}
      </g>
    </svg>
  );
};
export default AxisLeftSvg;
