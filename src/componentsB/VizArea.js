import React, { useState, useEffect } from 'react'
import { useStyles } from '../styles/mainStyles'
import { Grid } from '@material-ui/core'
import { MemoLineChart } from './d3/LineChart'
import { useSelector } from 'react-redux'

function VizArea() {
  const classes = useStyles()
  const dataStates = useSelector((state) => state.trades?.dataStates)
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  const [average, setAverage] = useState('0')

  useEffect(() => {
    if (dataStates.stateTrades.length) {
      setAverage((dataStates.stateTrades.reduce((acc, current) => acc + current.tradeTime, 0) / dataStates.stateTrades.length).toFixed(3))
    }
  }, [dataStates.stateTrades])

  return (
    <Grid container className={classes.vizContainer} style={{ width: '80vw', marginTop: 50 }}>
      {dataStates.stateTrades.length ? <MemoLineChart /> : null}
      {mode && <p style={{ color: '#FFD700' }}> * the data shown is average data </p>}
    </Grid>
  )
}

export default VizArea
