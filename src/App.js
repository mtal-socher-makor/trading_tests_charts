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

// const returnObj = () => {
//   return {
//     type: "trade",
//     data: {
//       type: types[Math.floor(Math.random() * 3)],
//       side: sides[Math.floor(Math.random() * 2)],
//       product_id: productIDs[Math.floor(Math.random() * 29)],
//       quantity: 2.5,
//       tradeTime: Math.random(),
//       id: Math.random() * 100000,
//     },
//   };
// };

const dummyData = [
  {
    type: "MKT",
    side: "BUY",
    product_id: "1",
    product_name: "BTC-EUR",
    quantity: 0.001,
    tradeTime: "0.682",
    id: 69527.61133277306,
  },
  {
    type: "MKT",
    side: "SELL",
    product_id: "1",
    product_name: "BTC-EUR",
    quantity: 0.001,
    tradeTime: "0.652",
    id: 97609.21879812758,
  },
  {
    type: "FOK",
    side: "BUY",
    product_id: "1",
    product_name: "BTC-EUR",
    quantity: 0.001,
    tradeTime: "0.520",
    id: 99548.74174524637,
  },
  {
    type: "FOK",
    side: "SELL",
    product_id: "1",
    product_name: "BTC-EUR",
    quantity: 0.001,
    tradeTime: "0.478",
    id: 48925.79887408548,
  },
  {
    type: "RFQ",
    side: "BUY",
    product_id: "1",
    product_name: "BTC-EUR",
    quantity: 0.001,
    tradeTime: "0.490",
    id: 73241.2960801257,
  },
  {
    type: "RFQ",
    side: "SELL",
    product_id: "1",
    product_name: "BTC-EUR",
    quantity: 0.001,
    tradeTime: "0.416",
    id: 54589.54933579119,
  },
  {
    type: "MKT",
    side: "BUY",
    product_id: "2",
    product_name: "BTC-USD",
    quantity: 0.0001,
    tradeTime: "0.690",
    id: 3445.055711470135,
  },
  {
    type: "MKT",
    side: "SELL",
    product_id: "2",
    product_name: "BTC-USD",
    quantity: 0.0001,
    tradeTime: "0.680",
    id: 8978.802970175393,
  },
  {
    type: "FOK",
    side: "BUY",
    product_id: "2",
    product_name: "BTC-USD",
    quantity: 0.0001,
    tradeTime: "0.557",
    id: 93893.6582976933,
  },
  {
    type: "FOK",
    side: "SELL",
    product_id: "2",
    product_name: "BTC-USD",
    quantity: 0.0001,
    tradeTime: "0.428",
    id: 86188.55746581737,
  },
  {
    type: "RFQ",
    side: "BUY",
    product_id: "2",
    product_name: "BTC-USD",
    quantity: 0.0001,
    tradeTime: "3.309",
    id: 20324.171753075727,
  },
];

function App() {
  const classes = useStyles();
  const [stateTrades, setStateTrades] = useState([]);
  const [products, setProducts] = useState([]);

  let ws = webSocketService.connectWS();

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
    webSocketService.sendEvent({ type: "products" });
    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "products") {
        console.log("IN PRODUCTS");
        setProducts(
          parsedData.data.map((coin) => {
            return {
              product_name: coin.product_name,
              product_id: coin.product_id,
            };
          })
        );
        console.log(products, "APP PRODUCTS");
      }
      if (parsedData.type === "trade") {
        let data = JSON.parse(event.data);
        console.log(data, "DATA");
        setStateTrades((prev) => [...prev, data]);
        // setStateTrades(dummyData)
      }

      // setLabels((prev) => [...prev, data.name])
    };
  }, []);

  return (
    <div className="App">
      {/* <Charts /> */}
      <Grid container direction="column" className={classes.App2}>
        <Grid item>
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
          <VizArea type="C" data={dummyData} />
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
    color: "white",
    fontWeight: 600,
  },
}));
