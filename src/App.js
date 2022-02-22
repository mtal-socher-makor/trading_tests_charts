import ButtonBar from './componentsB/ButtonBar'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import * as webSocketService from './services/websocket'
import React, { useState, useEffect, useRef } from 'react'
import DataCircle from './componentsB/d3/DataCircle'
import productsData from './products.json'
import Graph from './componentsB/Graph'
import VizArea from './componentsB/VizArea'
import GroupBy from './componentsB/GroupBy'
const types = ['MKT', 'FOK', 'RFQ']
const sides = ['SELL', 'BUY']
const productIDs = productsData.products.map((product) => product.product_id)
let dummyData = [
  {
    type: 'MKT',
    side: 'BUY',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.682',
    id: 69527.61133277306,
  },
  {
    type: 'MKT',
    side: 'SELL',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.652',
    id: 97609.21879812758,
  },
  {
    type: 'FOK',
    side: 'BUY',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.520',
    id: 99548.74174524637,
  },
  {
    type: 'FOK',
    side: 'SELL',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.478',
    id: 48925.79887408548,
  },
  {
    type: 'RFQ',
    side: 'BUY',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.490',
    id: 73241.2960801257,
  },
  {
    type: 'RFQ',
    side: 'SELL',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.416',
    id: 54589.54933579119,
  },
  {
    type: 'MKT',
    side: 'BUY',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.690',
    id: 3445.055711470135,
  },
  {
    type: 'MKT',
    side: 'SELL',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.680',
    id: 8978.802970175393,
  },
  {
    type: 'FOK',
    side: 'BUY',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.557',
    id: 93893.6582976933,
  },
  {
    type: 'FOK',
    side: 'SELL',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.428',
    id: 86188.55746581737,
  },
  {
    type: 'RFQ',
    side: 'BUY',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '3.309',
    id: 20324.171753075727,
  },
]

let dummyData2 = [
  {
    type: 'MKT',
    side: 'BUY',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '1.682',
    id: 69527.61133277306,
  },
  {
    type: 'MKT',
    side: 'SELL',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.200',
    id: 97609.21879812758,
  },
  {
    type: 'FOK',
    side: 'BUY',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.520',
    id: 99548.74174524637,
  },
  {
    type: 'FOK',
    side: 'SELL',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.360',
    id: 48925.79887408548,
  },
  {
    type: 'RFQ',
    side: 'BUY',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '1.490',
    id: 73241.2960801257,
  },
  {
    type: 'RFQ',
    side: 'SELL',
    product_id: '1',
    product_name: 'BTC-EUR',
    quantity: 0.001,
    tradeTime: '0.100',
    id: 54589.54933579119,
  },
  {
    type: 'MKT',
    side: 'BUY',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.450',
    id: 3445.055711470135,
  },
  {
    type: 'MKT',
    side: 'SELL',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.360',
    id: 8978.802970175393,
  },
  {
    type: 'FOK',
    side: 'BUY',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.700',
    id: 93893.6582976933,
  },
  {
    type: 'FOK',
    side: 'SELL',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '0.100',
    id: 86188.55746581737,
  },
  {
    type: 'RFQ',
    side: 'BUY',
    product_id: '2',
    product_name: 'BTC-USD',
    quantity: 0.0001,
    tradeTime: '3.309',
    id: 20324.171753075727,
  },
]

function App() {
  const classes = useStyles()
  // const [stateTrades, setStateTrades] = useState({
  //   all: [],
  //   side: { buy: [], sell: [] },
  //   type: { mkt: [], rfq: [], fok: [] },
  //   location: {},
  // });
  const [stateTrades, setStateTrades] = useState([])
  const [stateTradesPartly, setStateTradesPartly] = useState([])
  const [products, setProducts] = useState([])
  //const [groupBy, setGroupBy] = useState("");
  const [groupByType, setGroupByType] = useState(false)
  const [typeTrades, setTypeTrades] = useState({})
  const [groupBySide, setGroupBySide] = useState(false)
  const [sideTrades, setSideTrades] = useState({})
  const [groupByLocation, setGroupByLocation] = useState(false)
  const [locationTrades, setLocationTrades] = useState({})
  let dataStates = [stateTrades, stateTradesPartly, typeTrades, sideTrades, locationTrades]
  let groupBy = [groupByType, groupBySide, groupByLocation]
  let groupBySetters = [setGroupByType, setGroupBySide, setGroupByLocation]
  let ws = webSocketService.connectWS()
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
          <ButtonBar products={products} />
        </Grid>

        {/* { stateTrades.length && <DataCircle  d={ stateTrades[stateTrades -1]} /> } */}
        <Grid container direction='column' className={classes.presentationArea}>
          <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }} style={{ position: 'relative' }}>
            <GroupBy groupBySetters={groupBySetters} />
          </Grid>
          <Grid item>{<VizArea dataStates={dataStates} groupBy={groupBy} data={dummyData} data2={dummyData2} />}</Grid>
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
    color: "white",
    fontWeight: 600,
  },
}))
