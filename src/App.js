import ButtonBar from './componentsB/ButtonBar'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import * as webSocketService from './services/websocket'
import React, { useState, useEffect, useRef } from 'react'
import DataCircle from './componentsB/d3/DataCircle'
import productsData from './products.json'
import Graph from './componentsB/Graph'
import VizArea from './componentsB/VizArea'
import GroupBy from './componentsB/GroupBy'
import createDataArrays from "./helperFunctions.js/createDataArrays";
import Legend from "./componentsB/d3/Legend";



const types = ['MKT', 'FOK', 'RFQ']
const sides = ['SELL', 'BUY']
const productIDs = productsData.products.map((product) => product.product_id)


function App() {
  const classes = useStyles()

  const [stateTrades, setStateTrades] = useState([])
  const [stateTradesPartly, setStateTradesPartly] = useState([])
  const [products, setProducts] = useState([])
  const [groupByType, setGroupByType] = useState(false)
  const [typeTrades, setTypeTrades] = useState({})
  const [groupBySide, setGroupBySide] = useState(false)
  const [sideTrades, setSideTrades] = useState({})
  const [groupByLocation, setGroupByLocation] = useState(false)
  const [locationTrades, setLocationTrades] = useState({})

  let dataStates = [stateTrades, stateTradesPartly, typeTrades, sideTrades, locationTrades]
  let dataSetters = [setStateTrades, setStateTradesPartly, setTypeTrades, setSideTrades, setLocationTrades]
  let groupBy = [groupByType, groupBySide, groupByLocation]
  let groupBySetters = [setGroupByType, setGroupBySide, setGroupByLocation]
  let ws = webSocketService.connectWS()
  const [arrays, arrayNames, colorScale] = createDataArrays(dataStates, groupBy)
  console.log('typeTrades', typeTrades)
  console.log('group', groupByType)

  useEffect(() => {
    if (!products.length) {
      webSocketService.sendEvent({ type: 'products' })
    }
    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data)
      if (parsedData.type === 'products') {
        console.log('IN PRODUCTS')
        setProducts(parsedData.data)
        console.log(products, 'APP PRODUCTS')
      }
      if (parsedData.type === 'trade') {
        let data = JSON.parse(event.data).data
        console.log('data from app', data)
        setStateTrades((prev) => [...prev, data])
      }
    }
  }, [])

  useEffect(() => {
    if (groupByType && stateTrades.length) {
      let lastType = stateTrades[stateTrades.length - 1].type
      setTypeTrades((prev) => {
        return { ...prev, [lastType]: prev[lastType] ? [...prev?.[lastType], stateTrades[stateTrades.length - 1]] : [stateTrades[stateTrades.length - 1]] }
      })
      console.log('typeTrades', typeTrades)
    }
  }, [stateTrades, groupByType])

  useEffect(() => {
    if (groupBySide && stateTrades.length) {
      let lastSide = stateTrades[stateTrades.length - 1].side
      setSideTrades((prev) => {
        return { ...prev, [lastSide]: prev[lastSide] ? [...prev?.[lastSide], stateTrades[stateTrades.length - 1]] : [stateTrades[stateTrades.length - 1]] }
      })
    }
  }, [stateTrades, groupBySide])

  useEffect(() => {
    if (groupByLocation && stateTrades.length) {
      let lastLocation = stateTrades[stateTrades.length - 1].location
      setLocationTrades((prev) => {
        return { ...prev, [lastLocation]: prev[lastLocation] ? [...prev?.[lastLocation], stateTrades[stateTrades.length - 1]] : [stateTrades[stateTrades.length - 1]] }
      })
    }
  }, [stateTrades, groupByLocation])

  useEffect(() => {
    if (!groupByType && !groupBySide && !groupByLocation && stateTrades.length) {
      let last = stateTrades[stateTrades.length - 1]
      setStateTradesPartly((prev) => [...prev, last])
    }
  }, [stateTrades, groupByType, groupBySide, groupByLocation])



  return (
    <div className='App'>
      {/* <Charts /> */}
      <Grid container direction='column' className={classes.App2}>
        <Grid item>
          <Typography className={classes.title}>Test the Server</Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonBar products={products} dataSetters={dataSetters} />
        </Grid>

        {/* { stateTrades.length && <DataCircle  d={ stateTrades[stateTrades -1]} /> } */}
        <Grid container direction='column' className={classes.presentationArea}>
          <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }} style={{ position: 'relative' }}>
            <GroupBy groupBySetters={groupBySetters} />
          </Grid>
          <Grid item>{<VizArea dataStates={dataStates} groupBy={groupBy} />}</Grid>
          <Grid item style={{}}><Legend arrayNames={arrayNames} colorScale={colorScale}/></Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default App

const useStyles = makeStyles((theme) => ({
  App2: {
    width: '85vw',
    margin: '5vh auto 0 auto',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 600,
  },
}))
