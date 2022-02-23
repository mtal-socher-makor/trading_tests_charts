import React, { useState, useEffect, useRef } from "react";
import { useStyles, FilledButton } from "../styles/mainStyles";
// import data from "../model_data.json";
import { Grid, Typography } from '@material-ui/core'

import FilterBar from './FilterBar';
import { MemoLineChart } from "./d3/LineChart"
import DataCircle from './d3/DataCircle';
import GroupBy from './GroupBy';
// import * as webSocketService from '../services/websocket'

function VizArea({  groupBy, dataStates }) {

    const classes = useStyles();
   const [average, setAverage] = useState("0")
    
    useEffect(() => {
     if(dataStates[0].length){
      setAverage((dataStates[0].reduce((acc, current) => (acc + current.tradeTime), 0) / dataStates[0].length).toFixed(3))
      
     }
    }, [dataStates[0]])
    

  return (
    
    
      <Grid container className={classes.vizContainer} style={{width : "80vw"}}>
         
          {/* {!dataStates[0].length ?  <Typography variant="h1" className={classes.loading}>Loading...</Typography> : null} */}
          {dataStates[0].length ? <MemoLineChart groupBy={groupBy} dataStates={dataStates} /> : null}
          
      </Grid>
  );
}

export default VizArea;
