import ButtonBar from "./componentsB/ButtonBar";
import VizArea from "./componentsB/VizArea";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import * as webSocketService from "./services/websocket";
import React, { useState, useEffect, useRef } from "react";
import DataCircle from "./componentsB/d3/DataCircle";
import productsData from "./products.json";

const types = ["MKT", "FOK", "RFQ"];
const sides = ["SELL", "BUY"];
const productIDs = productsData.products.map((product) => product.product_id);

const returnObj = () => {
  return {
    type: "trade",
    data: {
      type: types[Math.floor(Math.random() * 3)],
      side: sides[Math.floor(Math.random() * 2)],
      product_id: productIDs[Math.floor(Math.random() * 29)],
      quantity: 2.5,
      tradeTime: Math.random(),
      id: Math.random() * 100000,
    },
  };
};

function App() {
  const classes = useStyles();
  const [stateTrades, setStateTrades] = useState([]);

  let ws = webSocketService.connectWS()

  // Dummy Data
  // useEffect(() => {
  //   const tradeInterval = setInterval(() => {
  //     const newObj = returnObj();
  //     const tradeObj = { ...newObj.data };
  //     setStateTrades((prev) => [...prev, tradeObj]);
  //     //console.log("trades",stateTrades)
  //   }, 1000);
  //   //return clearInterval(tradeInterval);
  // }, []);

  useEffect(() => {
    let data = {
      type: 'get_data',
      data: {
        type: 'MKT',
      },
    }

    // webSocketService.sendEvent(data)
    ws.onmessage = (event) => {
      data = JSON.parse(event.data)
      console.log(data)
      const newData = {...data.data,id:Math.random() * 100000}
      setStateTrades((prev) => [...prev, newData])
      // setLabels((prev) => [...prev, data.name])
    }
  }, [])

  return (
    <div className="App">
      {/* <Charts /> */}
      <Grid container direction="column" className={classes.App2}>
        <Grid item >
          <Typography className={classes.title}>Test the Server</Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonBar />
        </Grid>

        {/* { stateTrades.length && <DataCircle  d={ stateTrades[stateTrades -1]} /> } */}
        <Grid
          item
          xs={10}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <VizArea type="C" data={stateTrades} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

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
