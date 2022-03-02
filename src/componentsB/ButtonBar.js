import React, { useState, useEffect, useRef } from 'react'
import { useStyles } from '../styles/mainStyles'
import { Grid, Typography, TextField, Button, FormControl, FormControlLabel, Toolbar, AppBar } from '@material-ui/core'
import MultipleSelect from './MultipleSelect'
// import { currentWorker } from "../App";
import { GreenSwitch } from '../styles/GreenSwitch'
import { RedSwitch } from '../styles/RedSwitch'
import { useSelector, useDispatch } from 'react-redux'
import * as tradesAction from '../Redux/Trades/TradesSlice'
import * as groupingAndFiltersAction from '../Redux/GroupingAndFilters/GroupingAndFiltersSlice'
import { ContactSupportOutlined } from '@material-ui/icons'
import ServerMultipleSelect from './ServerMultipleSelect'
let type = 'get_data'

const ButtonBar = (props) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.groupingAndFilters?.filters)
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  // const servers = useSelector((state) => state.groupingAndFilters?.filters?.servers)
  const [socketWorkers, setSocketWorkers] = useState([])
  const products = useSelector((state) => state.trades?.products)
  const servers = JSON.parse(process.env.REACT_APP_SERVERS)
  const serverMap = {}
  servers.forEach((server) => {
    serverMap[server.ip] = server.name
  })

  //const [showFilters, setShowFilters] = useState(false);
  const [numberOfThreads, setNumOfThreads] = useState(0)
  const [power, setPower] = useState(false)

  const classes = useStyles()
  useEffect(() => {
    let data = {}
    const filteredFilters = {}
    if (power) {
      let workers = []
      Object.entries(filters).forEach(([filter, arr]) => {
        if (arr.length) {
          filteredFilters[filter] = arr
        }
      })
      dispatch(tradesAction.intializeStates())
      dispatch(groupingAndFiltersAction.initializeGrouping())

      for (const server of servers) {
        const worker = new Worker('index.js')
        data = {
          mode: mode ? 'stress' : 'regular',
          type,
          server,
          power: power,
        }

        if (Object.values(filteredFilters).length !== 0) {
          delete filteredFilters.threads
          data.filters = filteredFilters
        }
        if (mode) {
          data.mode = mode
          data.products = products
          dispatch(groupingAndFiltersAction.setGroupBy('thread'))
          data.threads = numberOfThreads
        } else {
          dispatch(groupingAndFiltersAction.initializeGrouping())
        }

        worker.postMessage(JSON.stringify(data))

        worker.onmessage = (msg) => {
          console.log(JSON.parse(msg.data))
          const trade = JSON.parse(msg.data)
          dispatch(tradesAction.setStateTrades(trade))
        }
        workers.push(worker)
      }
      setSocketWorkers(workers)
    } else {
      if (socketWorkers.length) {
        socketWorkers.forEach((worker) => {
          data = {
            mode: mode ? 'stress' : 'regular',
            type,
            power: power,
          }
          worker.postMessage(JSON.stringify(data))
          worker.terminate()
        })
      }
    }
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
        <Grid style={{ flex: 1 }} container id='kakaka' alignItems='center' justifyContent='space-between'>
          <Grid item xs={7}>
            <Grid container spacing={2} alignItems='center'>
              <Grid style={{ textAlign: 'center' }} item xs={2}>
                <Typography>Server test graph</Typography>
              </Grid>
              <Grid item xs={2}>
                <ServerMultipleSelect disabled={power} options={servers} label='servers' serverMap={serverMap} values={filters.servers} />
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    {/* <FormControlLabel
                      disabled={power}
                      control={
                        <RedSwitch
                          checked={timesMode}
                          onChange={(e) => {
                            dispatch(groupingAndFiltersAction.setTimesMode())
                          }}
                        />
                      }
                      label='All around time'
                    /> */}
                  </Grid>
                </Grid>
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
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid container justifyContent='flex-end' alignItems='center' spacing={2}>
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
