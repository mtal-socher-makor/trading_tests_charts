import React from 'react'
import { useStyles } from '../styles/mainStyles'
import { Grid, Typography } from '@material-ui/core'
import LineChart from './d3/LineChart'
// import createScaleY from "../helperFunctions.js/createScaleY"
import { useSelector, useDispatch } from 'react-redux'
import Card from './Card'

function VizArea() {
  const classes = useStyles()
  // const [yScale, innerWidth, yAxisTickFormat, innerHeight] = createScaleY(dataStates[0])
  const stateTrades = useSelector((state) => state.trades?.dataStates?.stateTrades)
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  const hoveredTrade = useSelector((state) => state.trades?.dataStates.hoveredTrade)
  console.log("LAAA",hoveredTrade)

  return (
    <Grid container  className={classes.vizContainer} style={{ width: '75vw', marginTop: 50, height: 600, position: "relative" }}>
      <Grid item xs={12}>
        {mode && <Typography style={{ color: '#FFD700', height: 'fitContent' }}>*Each point in stress mode represents an average of five trades</Typography>}
      </Grid>
      <Grid item>{stateTrades.length ? <LineChart /> : null}</Grid>
    
    </Grid>
  )
}

export default VizArea
