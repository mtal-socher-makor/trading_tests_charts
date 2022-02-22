import React, { useState, useEffect, useRef } from "react";
import { useStyles, FilledButton } from "../styles/mainStyles";
// import data from "../model_data.json";
import { Grid, Typography } from "@material-ui/core";
import BarChart, { MemoBarChart } from "./d3/BarChart";
import FilterBar from "./FilterBar";
import LineChart from "./d3/LineChart";
import DataCircle from "./d3/DataCircle";
// import * as webSocketService from '../services/websocket'

function VizArea({ data, type }) {
  //  if((type === "B" || type === "C")){
  //    console.log("here")
  //   data=data.map((d)=>{return d.data})
  //   console.log("data",data)
  //  }

  const classes = useStyles();
  const [average, setAverage] = useState("0");

  useEffect(() => {
    //average = data.length ? (data.reduce((acc, current) => (acc + current)) / data.length) : "-"
    if (data.length) {
      setAverage(
        (
          data.reduce((acc, current) => acc + current.tradeTime, 0) /
          data.length
        ).toFixed(3)
      );
    }
  }, [data]);

  return (
    <Grid className={classes.vizWrapper}>
      {/* {((type === "B" || type === "C") && data.length) ? 
           <DataCircle  d={ data[data.length -1]} /> 
            : null} */}
      {/* {((type === "B" || type === "C") && data.length) ? 
           <Grid  className={classes.avgDiv} >
             {<Typography className={classes.avgText} >Average Time: {average}</Typography>}
           </Grid> 
    : null} */}
      <Grid container className={classes.vizContainer}>
        {/* <FilterBar data={data.data} /> */}
        {/* {(type === A && !data.length) && <Typography variant="h1" className={classes.loading}>Loading...</Typography>} */}

        {(type === "B" || type === "C") && !data.length ? (
          <Typography variant="h1" className={classes.loading}>
            Loading...
          </Typography>
        ) : null}
        {(type === "A" || type === "B") && data.length ? (
          <>
            <MemoBarChart type={type} data={data} />
          </>
        ) : null}
        {type === "C" && data.length ? <LineChart data={data} /> : null}
      </Grid>
    </Grid>
  );
}

export default VizArea;
