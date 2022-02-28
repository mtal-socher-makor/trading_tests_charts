import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../styles/mainStyles'
import { Grid, Typography, TextField, Button, FormControl, FormControlLabel, Toolbar, AppBar } from '@material-ui/core'
import MultipleSelect from './MultipleSelect'
import { currentWorker } from '../App'
import { GreenSwitch } from '../styles/GreenSwitch'
import { RedSwitch } from '../styles/RedSwitch'
import { useSelector, useDispatch } from 'react-redux'
import * as tradesAction from '../Redux/Trades/TradesSlice'
import * as groupingAndFiltersAction from '../Redux/GroupingAndFilters/GroupingAndFiltersSlice'
import { ContactSupportOutlined } from '@material-ui/icons'

let type = 'get_data'

const ButtonBar = (props) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.groupingAndFilters?.filters)
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  const timesMode = useSelector((state) => state.groupingAndFilters?.timesMode)
  const products = useSelector((state) => state.trades?.products)

  //const [showFilters, setShowFilters] = useState(false);
  const [numberOfThreads, setNumOfThreads] = useState(0)
  const [power, setPower] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    let data = {}
    const filteredFilters = {}
    if (power) {
      Object.entries(filters).forEach(([filter, arr]) => {
        if (arr.length) {
          filteredFilters[filter] = arr
        }
      })
      dispatch(tradesAction.intializeStates())
      dispatch(groupingAndFiltersAction.initializeGrouping())
    } else {
      data = {
        type: 'stopInterval',
      }
      currentWorker.postMessage(data)
    }

    data = {
      mode: mode ? 'stress' : 'regular',
      type,

      power: power,
    }

    if (Object.values(filteredFilters).length !== 0) {
      console.log('here')
      data.filters = filteredFilters
    }
    if (mode && timesMode) {
      data.mode = mode
      data.timesMode = timesMode
      data.products = products
    } else if (mode) {
      dispatch(groupingAndFiltersAction.setGroupBy('thread'))
      data.threads = numberOfThreads
    } else if (timesMode) {
      data.mode = mode
      data.timesMode = timesMode
    } else {
      dispatch(groupingAndFiltersAction.initializeGrouping())
    }
    console.log('DATA', data)
    currentWorker.postMessage(data)
  }, [power])

  const createTrade = () => {
    setPower((prev) => !prev)
  }
  return (
    <AppBar
      style={{
        backgroundColor: 'transparent',
        borderRadius: '0px 0px 30px 30px',
      }}
    >
      <Toolbar>
        <Grid container id='kakaka' alignItems='center' justifyContent='space-between'>
          <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography>Server test graph</Typography>
              </Grid>
              <Grid item xs={3}>
                <MultipleSelect disabled={power} options={['a server', 'dfgfg']} label='servers' values={filters.servers} />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  disabled={power}
                  control={
                    <GreenSwitch
                      checked={mode}
                      onChange={(e) => {
                        dispatch(groupingAndFiltersAction.setMode())
                      }}
                      name='checkedA'
                    />
                  }
                  label='Stress'
                />
              </Grid>

              {mode && (
                <Grid item xs={3}>
                  <FormControl className={classes.TextFieldInput} variant='outlined' size='small' fullWidth disabled={power}>
                    <TextField
                      style={{ color: '#848E9C' }}
                      className={classes.input}
                      onChange={(e) => {
                        setNumOfThreads(e.target.value)
                      }}
                      size='small'
                      variant='outlined'
                      label='Threads'
                      type='number'
                    />
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={2}>
                <FormControlLabel
                  disabled={power}
                  control={
                    <RedSwitch
                      checked={timesMode}
                      onChange={(e) => {
                        dispatch(groupingAndFiltersAction.setTimesMode())
                      }}
                    />
                  }
                  label='Client Times'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid container justifyContent='flex-end' alignItems='center' spacing={2}>
              {!(mode && timesMode) && (
                <>
                  <Grid item xs={3}>
                    <MultipleSelect disabled={power} options={['FOK', 'MKT', 'RFQ']} label='types' values={filters.types} />
                  </Grid>
                  <Grid item xs={3}>
                    <MultipleSelect disabled={power} options={['Buy', 'Sell']} label='sides' values={filters.sides} />
                  </Grid>
                  <Grid item xs={3}>
                    <MultipleSelect disabled={power} options={products} label='products' values={filters.products} />
                  </Grid>
                </>
              )}
              <Grid item xs={2} direction='row'>
                <Button
                  fullWidth
                  onClick={createTrade}
                  style={{
                    backgroundColor: 'lightblue',
                    flex: 1,
                    textTransform: 'none',
                  }}
                >
                  {!power ? 'Start' : 'Stop'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default ButtonBar
