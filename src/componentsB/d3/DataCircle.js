import React from 'react'
import { scaleBand, scaleLinear, max, format,scaleOrdinal } from 'd3';
import { hourglass, basicGradient } from "./Hourglass";
import {useStyles } from "../../styles/mainStyles";



const innerWidth = 200;
const innerHeight = 200;
const width = innerWidth + 50;
const height = innerHeight + 50;

function DataCircle({ d }) {

const classes = useStyles();
const gradient = basicGradient(d.tradeTime, d.product_id)
    
// const gradientColorScale = scaleOrdinal()
//                             .domain(["time", "rest"])
//                             .range(["var(--main)", "#fff"]);

//url(#gradientindex+0.47851950199712556)
//id="gradientindex+0.47851950199712556" 
  return (
      <div className={classes.dataCircle}> 
          <svg
            width={width}
            height={height}
          >
        <defs>
            {hourglass}
            {gradient}
        </defs>
        <g>
        
            <circle 
                r={100}
                cx={innerWidth / 2}
                cy={innerHeight / 2}
                fill="var(--secondary)"
            />
            <text
            x={innerWidth / 2}
            y={45}
            fill="var(--main)"
            style= {{fontSize: 25, fontWeight: 600}}
            textAnchor="middle"
            >Current
            </text>
            <use
                href={`#hourglass`}
                id={`${d.tradeTime}${d.product_id}`}
                transform= {`scale(0.2)`}
                x={280}
                y={280}
                fill={`url(#gradient${d.product_id})`}
                //id={`gradient${name}`}
                // fill={`url(#gradient${year})`
            />
        
        <text
            x={innerWidth / 2}
            y={innerHeight - 20}
            fill="var(--main)"
            style= {{fontSize: 25, fontWeight: 600}}
            textAnchor="middle"
        >{d.tradeTime.toFixed(3)}</text>
        </g>
        
    </svg>
      </div>
    
  )
}

export default DataCircle