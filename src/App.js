import ButtonBar from "./componentsB/ButtonBar";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import * as webSocketService from "./services/websocket";
import React, { useState, useEffect, useRef } from "react";
import DataCircle from "./componentsB/d3/DataCircle";
import productsData from "./products.json";
import Graph from "./componentsB/Graph";
import VizArea from "./componentsB/VizArea";
import GroupBy from "./componentsB/GroupBy";
import Legend from "./componentsB/d3/Legend";
import createDataArrays from "./helperFunctions.js/createDataArrays";
import createScaleY from "./helperFunctions.js/createScaleY";
import AxisLeftText from "./componentsB/d3/barchart/AxisLeftText";
export const currentWorker = new Worker("index.js");

function App() {
  const classes = useStyles();
  // const [stateTrades, setStateTrades] = useState({
  //   all: [],
  //   side: { buy: [], sell: [] },
  //   type: { mkt: [], rfq: [], fok: [] },
  //   location: {},
  // });
  const [stateTrades, setStateTrades] = useState([]);
  const [stateTradesPartly, setStateTradesPartly] = useState([]);
  const [mode, setMode] = useState(false);
  const [products, setProducts] = useState([]);
  //const [groupBy, setGroupBy] = useState("");
  const [groupByType, setGroupByType] = useState(false);
  const [typeTrades, setTypeTrades] = useState({});
  const [groupBySide, setGroupBySide] = useState(false);
  const [sideTrades, setSideTrades] = useState({});
  const [allBtn, setAllBtn] = useState(true);

  const [groupByLocation, setGroupByLocation] = useState(false);
  const [groupByThread, setGroupByThread] = useState(false);
  const [locationTrades, setLocationTrades] = useState({});
  const [threadTrades, setThreadTrades] = useState({});
  const [filters, setFilters] = useState({
    servers: [],
    types: [],
    sides: [],
    products: [],
    threads: ["multi"],
  });
  let dataStates = [
    stateTrades,
    stateTradesPartly,
    typeTrades,
    sideTrades,
    locationTrades,
    threadTrades,
  ];
  let dataSetters = [
    setStateTrades,
    setStateTradesPartly,
    setTypeTrades,
    setSideTrades,
    setLocationTrades,
    setThreadTrades,
  ];
  const groupBy = [
    groupByType,
    groupBySide,
    groupByLocation,
    groupByThread,
    allBtn,
  ];
  const [arrays, arrayNames, colorScale] = createDataArrays(
    dataStates,
    groupBy,
    filters
  );
  const [yScale, innerWidth, yAxisTickFormat, innerHeight] = createScaleY(
    dataStates[0]
  );
  let groupBySetters = [
    setGroupByType,
    setGroupBySide,
    setGroupByLocation,
    setGroupByThread,
    setAllBtn,
  ];
  // let ws = webSocketService.connectWS();
  // console.log("typeTrades", typeTrades);
  // console.log("group", groupByType);

  // const powerWorker = workerizedWorker()
  // workerizedWorker.expensive();
  currentWorker.postMessage({ type: "trial" });
  useEffect(() => {
    currentWorker.postMessage({ type: "products" });
    currentWorker.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      if (parsedData.type === "products") {
        setProducts(parsedData.data);
      }
      if (parsedData.type === "trade") {
        if (parsedData.thread) {
        }
        let data = parsedData.data;
        setStateTrades((prev) => [...prev, data]);
      }
    };
  }, []);

  useEffect(() => {
    if (groupByType && stateTrades.length) {
      let lastType = stateTrades[stateTrades.length - 1].type;
      setTypeTrades((prev) => {
        return {
          ...prev,
          [lastType]: prev[lastType]
            ? [...prev?.[lastType], stateTrades[stateTrades.length - 1]]
            : [stateTrades[stateTrades.length - 1]],
        };
      });
    }
  }, [stateTrades, groupByType]);

  useEffect(() => {
    if (groupBySide && stateTrades.length) {
      let lastSide = stateTrades[stateTrades.length - 1].side;
      setSideTrades((prev) => {
        return {
          ...prev,
          [lastSide]: prev[lastSide]
            ? [...prev?.[lastSide], stateTrades[stateTrades.length - 1]]
            : [stateTrades[stateTrades.length - 1]],
        };
      });
    }
  }, [stateTrades, groupBySide]);

  useEffect(() => {
    if (groupByLocation && stateTrades.length) {
      let lastLocation = stateTrades[stateTrades.length - 1].location;
      setLocationTrades((prev) => {
        return {
          ...prev,
          [lastLocation]: prev[lastLocation]
            ? [...prev?.[lastLocation], stateTrades[stateTrades.length - 1]]
            : [stateTrades[stateTrades.length - 1]],
        };
      });
    }
  }, [stateTrades, groupByLocation]);

  useEffect(() => {
    if (groupByThread && stateTrades.length) {
      let lastThread = stateTrades[stateTrades.length - 1].thread;
      let key = lastThread?.toString();

      setThreadTrades((prev) => {
        return {
          ...prev,
          [key]: prev[key]
            ? [...prev?.[key], stateTrades[stateTrades.length - 1]]
            : [stateTrades[stateTrades.length - 1]],
        };
      });
    }
  }, [stateTrades, groupByThread]);

  useEffect(() => {
    if (
      !groupByType &&
      !groupBySide &&
      !groupByLocation &&
      stateTrades.length &&
      !mode
    ) {
      let last = stateTrades[stateTrades.length - 1];
      setStateTradesPartly((prev) => [...prev, last]);
    }
  }, [stateTrades, groupByType, groupBySide, groupByLocation]);

  return (
    <>
      {/* <Charts /> */}
      <Grid container direction="column" className={classes.App2}>
        <Grid item xs={12}>
          <ButtonBar
            groupBy={groupBy}
            groupBySetters={groupBySetters}
            changeMode={setMode}
            mode={mode}
            products={products}
            dataSetters={dataSetters}
            filters={filters}
            setFilters={setFilters}
          />
        </Grid>
        {/* { stateTrades.length && <DataCircle  d={ stateTrades[stateTrades -1]} /> } */}
        <Grid
          container
          className={classes.presentationArea}
          style={{ marginTop: 64, height: "70vh" }}
        >
          <Grid
            item
            xs={10}
            style={{ display: "flex", justifyContent: "center" }}
            style={{ position: "relative" }}
          >
            <GroupBy
              filters={filters}
              setFilters={setFilters}
              groupByThread={groupByThread}
              groupBySetters={groupBySetters}
              groupBy={groupBy}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2} style={{height: "100%"}}>
              <Grid
                item
                className="vizPlusLegend"
                style={{ paddingTop: "10rem" }}
              >
                {!groupByThread && (
                  <Legend arrayNames={arrayNames} colorScale={colorScale} />
                )}
              </Grid>
              <Grid item>
                <Grid container  style={{ display: "flex", width: "inherit" }}>
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    
                    <svg width={60} height={innerHeight}>
                      <g>

                      <text
                        className="axis-label"
                        x={0}
                        y={0}
                        textAnchor="middle"
                        stroke="#fff"
                        fill="#fff"
                        transform={`translate(25, ${
                          innerHeight / 2 + 40 
                        }) rotate(-90)`}
                        style={{ fontSize: 30 }}
                        >
                        Time (seconds)
                      </text>

                      {yScale.ticks().map((tickValue) => (
                        <AxisLeftText
                        tickValue={tickValue}
                        yScale={yScale}
                        innerWidth={innerWidth}
                        stateTrades={stateTrades}
                        innerHeight={innerHeight}
                        />
                        ))}
                        </g>
                    </svg>
                  </Grid>
                  <Grid item >
                    {
                      <VizArea
                        dataStates={dataStates}
                        groupBy={groupBy}
                        filters={filters}
                      />
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
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
