import React, { useState, useEffect, useRef } from 'react'
import { useStyles, FilledButton } from '../styles/mainStyles'
// import data from "../model_data.json";
import { Grid, Typography } from '@material-ui/core'

import FilterBar from './FilterBar'
import { MemoLineChart } from './d3/LineChart'
import DataCircle from './d3/DataCircle'
import GroupBy from './GroupBy'
import AxisLeftText from "./d3/barchart/AxisLeftText"
import createScaleY from "../helperFunctions.js/createScaleY"

// import * as webSocketService from '../services/websocket'

function VizArea({ groupBy, dataStates ,filters}) {
  const classes = useStyles()
  const [yScale, innerWidth, yAxisTickFormat, innerHeight] = createScaleY(dataStates[0])

  // const [average, setAverage] = useState('0')

  // useEffect(() => {
  //   if (dataStates[0].length) {
  //     setAverage((dataStates[0].reduce((acc, current) => acc + current.tradeTime, 0) / dataStates[0].length).toFixed(3))
  //   }
  // }, [dataStates[0]])

  return (
    <Grid container className={classes.vizContainer} style={{ width: '80vw' , marginTop : 50}}>
     
      {dataStates[0].length ? <MemoLineChart groupBy={groupBy} dataStates={dataStates} filters={filters} /> : null}
    </Grid>
  )
}

export default VizArea
