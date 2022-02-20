import React, { useState, useEffect, useRef } from 'react'
import {useStyles, FilledButton }from "../styles/mainStyles";
import data from "../model_data.json";
import { Grid, Typography } from '@material-ui/core'
import BarChart from './d3/BarChart';
import FilterBar from './FilterBar';
import LineChart from "./d3/LineChart"
import * as webSocketService from '../services/websocket'





function VizArea2({ type }) {

    const classes = useStyles();
    console.log(data.data)

    
    
    
    const [stateTrades, setStateTrades] = useState([])

  //   let ws = webSocketService.connectWS()

  // useEffect(() => {
  //   let data = {
  //     type: 'getData',
  //     data: {
  //       type: 'MKT',
  //     },
  //   }

  //   webSocketService.sendEvent(data)
  //   ws.onmessage = (event) => {
  //     data = JSON.parse(event.data)
  //     setStateTrades((prev) => [...prev, data])
  //     // setLabels((prev) => [...prev, data.name])
  //   }
  // }, [])
     

  return (
    <>
    {/* {type === "B" && <FilledButton onClick={handleClick}> Try Me </FilledButton>} */}
    {/* { type === "B" && <Typography> {stateTrades}</Typography>} */}
      <Grid container className={classes.vizContainer}>
          {/* <FilterBar data={data.data} /> */}
          {(type === "A" && !data.data.length) && <Typography variant="h1" className={classes.loading}>Loading...</Typography>}
          {((type === "B" || type === "C") && !stateTrades.length) && <Typography variant="h1" className={classes.loading}>Loading...</Typography>}
          {(type === "A"|| type === "B" ) && <BarChart type={type} data={type === "A" ? data.data : stateTrades}/>}
          {(type === "C" && !stateTrades.length) && <LineChart data={stateTrades}/>}
      </Grid>
    </>
  )
}

export default VizArea2;