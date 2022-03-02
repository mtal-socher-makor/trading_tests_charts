import { useEffect, forwardRef } from "react";
import { line, transition, easeSin } from "d3";
import MarksLineSingle from "./MarksLineSingle";

import { useSelector, useDispatch } from "react-redux";
import createDataArrays from "../../../helperFunctions/createDataArrays";
import { motion } from "framer-motion"

//const transitionPath = transition().ease(easeSin).duration(2500)

const MarksLine = forwardRef(({ xScale, yScale, xValue, yValue }) => {
  const dataStates = useSelector((state) => state.trades?.dataStates);
  const power = useSelector((state) => state.trades?.power);
  const groupBy = useSelector((state) => state.groupingAndFilters?.grouping);
  const filters = useSelector((state) => state.groupingAndFilters?.filters);
  const timesMode = useSelector((state) => state.groupingAndFilters?.timesMode);
  const [arrays, arrayNames, colorScale] = createDataArrays(
    dataStates,
    groupBy,
    filters,
    timesMode
  );

  // const pathVariants = {
  //   hidden: {
  //     opacity: 0,
  //     pathLength: 0,
  //   },
  //   visible: {
  //     opacity: 1,
  //     pathLength: 1,
  //     transition: { 
  //       duration: 2,
  //       ease: "easeInOut",
  //     }
  //   }
  // };

  return (
    <>
      <g className="marks" transform="translate(10,35)">
        {(groupBy?.thread && arrays?.length) ||
        (arrays?.length &&
          (groupBy?.type || groupBy?.side || groupBy?.location)) ||
        timesMode
          ? arrays.map((arr, index) => {
              return (
                <>
               
                  <motion.path
                    fill="none"
                    //stroke={colorScale(arrayNames[index])}
                    //variants={pathVariants}
                    initial={{ opacity: 0, stroke: "#000",  pathLength: 0 }}
                    animate={{ opacity: 1, stroke: colorScale(arrayNames[index]),  pathLength: 1}}
                    transition={{ duration: 5, type: "tween", repeat: power ? Infinity : 0}}
                    d={line()
                      .x((d) => xScale(xValue(d)))
                      .y((d) => yScale(yValue(d)))(arr)}
                  />
                  {arr.map((d) => {
                    return (
                      <MarksLineSingle
                        d={d}
                        xScale={xScale}
                        yScale={yScale}
                        xValue={xValue}
                        yValue={yValue}
                        color={colorScale(arrayNames[index])}
                      />
                    );
                  })}
                </>
              );
            })
          : null}
        {dataStates?.stateTradesPartly?.length && (
          <>
            <motion.path
              fill="none"
              //stroke="rgba(0, 700, 0 ,1)"
              initial={{ opacity: 0, stroke: "#000",  pathLength: 0 }}
              animate={{ opacity: 1, stroke: "rgba(0, 700, 0 ,1)",  pathLength: 1}}
              transition={{ duration: dataStates.stateTradesPartly.length*5, type: "tween"}}
              // transitionEnd={{opacity: 0.5, pathLength: 1}}
              
              d={line()
                .x((d) => xScale(xValue(d)))
                .y((d) => yScale(yValue(d)))(dataStates?.stateTradesPartly)}
            />
            {dataStates?.stateTradesPartly.map((d) => {
              return (
                <MarksLineSingle
                  d={d}
                  xScale={xScale}
                  yScale={yScale}
                  xValue={xValue}
                  yValue={yValue}
                  color="rgba(0, 255, 0 ,1)"
                />
              );
            })}
          </>
        )}
      </g>
    </>
  );
});

export default MarksLine;
