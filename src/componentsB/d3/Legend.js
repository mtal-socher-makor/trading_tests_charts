import React from "react";
import { Grid, Typography } from "@material-ui/core";
function Legend({ arrayNames, colorScale }) {
  return (
    <>
      <Grid
        container
        direction="column"

        // justifyContent="flex-start"
        // style={{
        //   gap: '2rem',
        //   backgroundImage: `linear-gradient(to right, ${colorScale(
        //     arrayNames[0]
        //   )},${colorScale(arrayNames[1])},${colorScale(arrayNames[2])})`,
        //   '-webkit-background-clip': "text",
        // }}
      >
        {arrayNames.map((name, index) => (
          <Grid
            item
            style={{
              borderBottom: `3px solid ${colorScale(arrayNames[index])}`,
            }}
          >
            {/* <svg width={100} height={50}>
              <g>
                <circle
                  cx={`${index * 10 + 45}`}
                  cy={5}
                  r="3"
                  fill={colorScale(arrayNames[index])}
                />
                <text
                  x={`${index * 5 + 10}`}
                  y={10}
                  fill={colorScale(arrayNames[index])}
                  style={{ fontSize: "0.9em" }}
                >
                  {name}{" "}
                </text>
              </g>
            </svg> */}

            <Typography style={{ fontWeight: "bold", color: "#dfe1e6" }}>
              {name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Legend;

// {arrayNames.length &&
//   arrayNames.map((name, index) => {
//     console.log("arrayNames[index]",colorScale(arrayNames[index]))
//     return (
//       <foreignobject>
//         <div>
//           <svg>
//             <g transform={`translate(200px,200px)`}>
//               <circle cx={`${200 + index*40}`} cy={innerHeight} r='6' fill={colorScale(arrayNames[index])} />
//               <text x={`${200 + index*40 + 10}`} y="0" >{name} </text>
//             </g>
//           </svg>
//         </div>
//       </foreignobject>

//     )
//   })}
