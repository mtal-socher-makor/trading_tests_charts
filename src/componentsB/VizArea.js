import React, { useState, useEffect, useRef } from 'react'
import {useStyles, FilledButton }from "../styles/mainStyles";
// import data from "../model_data.json";
import { Grid, Typography } from '@material-ui/core'

import FilterBar from './FilterBar';
import {MemoLineChart} from "./d3/LineChart"
import DataCircle from './d3/DataCircle';
import GroupBy from './GroupBy';
// import * as webSocketService from '../services/websocket'





function VizArea({ data, type, value ,setValue }) {

  
    const classes = useStyles();
   const [average, setAverage] = useState("0")
    
    useEffect(() => {
     if(data.length){
      setAverage((data.reduce((acc, current) => (acc + current.tradeTime), 0) / data.length).toFixed(3))
      
     }
    }, [data])
    

  return (
    <Grid className={classes.vizWrapper}>
      {/* { data.length ? 
        <DataCircle  d={ data[data.length -1]} /> 
        : null
      } */}
      { data.length ? 
        <Grid  className={classes.avgDiv} >
          {<Typography className={classes.avgText} >Average Time: {average}</Typography>}
        </Grid> 
    : null}
      <Grid container className={classes.vizContainer}>
         
          {!data.length ?  <Typography variant="h1" className={classes.loading}>Loading...</Typography> : null}
          {data.length ? <MemoLineChart data={data}/> : null}
          
      </Grid>
    </Grid>
  )
}

export default VizArea