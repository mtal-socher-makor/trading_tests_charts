import ButtonBar from "./componentsB/ButtonBar";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import * as webSocketService from "./services/websocket";
import React, { useState, useEffect, useRef } from "react";
import DataCircle from "./componentsB/d3/DataCircle";
import productsData from "./products.json";
import Graph from "./componentsB/Graph";
import VizArea from "./componentsB/VizArea";
import GroupBy from "./componentsB/GroupBy";
const types = ["MKT", "FOK", "RFQ"];
const sides = ["SELL", "BUY"];
const productIDs = productsData.products.map((product) => product.product_id);

function App() {
  const classes = useStyles();
  // const [stateTrades, setStateTrades] = useState({
  //   all: [],
  //   side: { buy: [], sell: [] },
  //   type: { mkt: [], rfq: [], fok: [] },
  //   location: {},
  // });
  const [stateTrades, setStateTrades] = useState([])
  const [products, setProducts] = useState([]);
  //const [groupBy, setGroupBy] = useState("");
  const [groupByType, setGroupByType] = useState(true);
  const [typeTrades, setTypeTrades] = useState({});
  const [groupBySide, setGroupBySide] = useState(false);
  const [sideTrades, setSideTrades] = useState({});
  const [groupByLocation, setGroupByLocation] = useState(false);
  const [locationTrades, setLocationTrades] = useState({});

  let ws = webSocketService.connectWS();

  useEffect(() => {
    if (!products.length) {
      webSocketService.sendEvent({ type: "products" });
    }
    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.type === "products") {
        console.log("IN PRODUCTS");
        setProducts(parsedData.data);
        console.log(products, "APP PRODUCTS");
      }
      if (parsedData.type === "trade") {
        let data = JSON.parse(event.data).data;
       console.log("data from app", data);
       setStateTrades(prev => [...prev, data]);
        
      }
    };
  }, []);

  useEffect(() => {
    if(groupByType && stateTrades.length){
      let lastType = stateTrades[stateTrades.length -1].type 
      setTypeTrades(prev => {
        return ({...prev, [lastType]: prev[lastType] ? [ ...prev?.[lastType], stateTrades[stateTrades.length -1]]
                                                    : [ stateTrades[stateTrades.length -1]]
        })
      })
      console.log("typeTrades",typeTrades )
    }
  }, [stateTrades,groupByType])

  useEffect(() => {
    if(groupBySide && stateTrades.length){
      let lastSide = stateTrades[stateTrades.length -1].side
      setSideTrades(prev => {
        return ({...prev, [lastSide]: prev[lastSide] ? [ ...prev?.[lastSide], stateTrades[stateTrades.length -1]]
                                                    : [ stateTrades[stateTrades.length -1]]
        })
      })
    }
  }, [stateTrades,groupBySide])

  useEffect(() => {
    if(groupByLocation && stateTrades.length){
      let lastLocation = stateTrades[stateTrades.length -1].location
      setLocationTrades(prev => {
        return ({...prev, [lastLocation]: prev[lastLocation] ? [ ...prev?.[lastLocation], stateTrades[stateTrades.length -1]]
                                                    : [ stateTrades[stateTrades.length -1]]
        })
      })
    }
  }, [stateTrades,groupByLocation])
  

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
          <GroupBy groupByType={groupByType} groupBySide={groupBySide} groupByLocation={groupByLocation} />
          {<VizArea groupByType={groupByType} groupBySide={groupBySide} groupByLocation={groupByLocation} data={stateTrades} />}
          
          {/* <Graph stateTrades={stateTrades} setStateTrades={setStateTrades}/> */}
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


        // if(data.type==='MKT'){
            //   setStateTrades((prevState) => ({
            //     all: temp,
            //     side: {},
            //     type: {mkt:[ ...prevState.type.mkt, data],rfq:[...prevState.type.rfq],fok:[...prevState.type.fok]},
            //     location: {},
            //   }))
            // }
            // else{
            //   if(data.type==='RFQ')
            //   {
            //     setStateTrades((prevState) => ({
            //       all: temp,
            //       side: {},
            //       type: {mkt:[ ...prevState.type.mkt],rfq:[...prevState.type.rfq,data],fok:[...prevState.type.fok]},
            //       location: {},
            //     }))
            //   }
            //   else{
            //     if(data.type==='FOK')
            //     {
            //       setStateTrades((prevState) => ({
            //         all: temp,
            //         side: {},
            //         type: {mkt:[ ...prevState.type.mkt],rfq:[...prevState.type.rfq],fok:[...prevState.type.fok,data]},
            //         location: {}
            //       }))
            //     }
            //     }
            //   }

            //let temp = [...stateTrades.all, data];
        //let tempSpecific = [];

       
        // switch (groupBy) {
        //   case "type":
        //     setStateTrades(prev => ({
        //       all: [...prev.all, data],
        //       // type: {...prev.type, [data.type]: [...prev.type[data.type], data]},
        //       // side: {},
        //       // location: {}
        //     }))
        //     break;
        //   case "side":
        //     setStateTrades(prev => ({
        //       all: [...prev.all, data],
        //       // side: {...prev.side, [data.side]: [...prev.side[data.side], data]},
        //       // type: {},
        //       // location: {}
        //     }))
        //     break;
        //   case "location":
        //     setStateTrades(prev => ({
        //       all: [...prev.all, data],
        //       // location: {...prev.location, [data.location]: [...prev.location[data.location], data]},
        //       // type: {},
        //       // side: {}
        //     }))
        //     break;
        //   default:
        //     //update the all only in the stateTradesobject
            
        //     setStateTrades(prev => ({
        //       all: [...prev.all, data],
        //       location: {},
        //       type: {},
        //       side: {}
        //     }))
        //     console.log("stateTrades", stateTrades);
        //     break;
        // }