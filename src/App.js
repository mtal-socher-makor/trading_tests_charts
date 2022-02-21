import ButtonBar from "./componentsB/ButtonBar";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import * as webSocketService from "./services/websocket";
import React, { useState, useEffect, useRef } from "react";
import DataCircle from "./componentsB/d3/DataCircle";
import productsData from "./products.json";
import Graph from "./componentsB/Graph"
import VizArea from "./componentsB/VizArea";
import GroupBy from "./componentsB/GroupBy";
const types = ["MKT", "FOK", "RFQ"];
const sides = ["SELL", "BUY"];
const productIDs = productsData.products.map((product) => product.product_id);



function App() {
  const classes = useStyles();
  const [stateTrades, setStateTrades] = useState([]);
  const [products, setProducts] = useState([]);
  const [groupedData, setGroupedData] = useState([])
  const [groupBy, setGroupBy] = useState("")
  let ws = webSocketService.connectWS();

  useEffect(() => {
    if (!products.length) {
      webSocketService.sendEvent({ type: "products" })
    }
    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data)

      if (parsedData.type === "products") {
        console.log("IN PRODUCTS")
        setProducts(parsedData.data)
        console.log(products, "APP PRODUCTS")
      }
      if (parsedData.type === "trade") {
        let data = JSON.parse(event.data)
        console.log(data, "DATA")
        const newData = { ...parsedData.data, id: Math.random() * 100000 }
        setStateTrades((prev) => [...prev, newData])
      }

    }
  }, [])
  // useEffect(() => {
  //   if (groupBy == 'type') {
  //     let filteredMkt = stateTrades.filter((trade) => trade.type == "MKT")
  //     let grouped=[]
  //     setStateTrades([])
  //   }
  // }, [groupBy])
  return (
    <div className='App'>
      {/* <Charts /> */}
      <Grid container direction="column" className={classes.App2}>
        <Grid item >
          <Typography className={classes.title}>Test the Server</Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonBar products={products} />
        </Grid>

        {/* { stateTrades.length && <DataCircle  d={ stateTrades[stateTrades -1]} /> } */}
        <Grid
          item
          xs={10}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <GroupBy setGroupBy={setGroupBy} />
          {<VizArea groupBy={groupBy} data={groupBy ? groupedData : stateTrades} />}
          {/* <Graph stateTrades={stateTrades} setStateTrades={setStateTrades}/> */}
        </Grid>
      </Grid>
    </div>
  )
}

export default App

const useStyles = makeStyles((theme) => ({
  App2: {
    width: "85vw",
    margin: "5vh auto 0 auto",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "var(--main)",
    fontWeight: 600,
  },
}));
