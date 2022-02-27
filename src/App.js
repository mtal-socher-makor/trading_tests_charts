import ButtonBar from './componentsB/ButtonBar';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import * as webSocketService from './services/websocket';
import React, { useState, useEffect, useRef } from 'react';
import DataCircle from './componentsB/d3/DataCircle';
import productsData from './products.json';
import Graph from './componentsB/Graph';
import VizArea from './componentsB/VizArea';
import GroupBy from './componentsB/GroupBy';
import Legend from './componentsB/d3/Legend';

import createScaleY from './helperFunctions/createScaleY';
import AxisLeft from './componentsB/d3/barchart/AxisLeft';
import * as tradesAction from './Redux/Trades/TradesSlice';
import { useSelector, useDispatch } from 'react-redux';
export const currentWorker = new Worker('index.js');

function App() {
  const classes = useStyles();
  const groupBy = useSelector((state) => state.groupingAndFilters?.grouping);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  currentWorker.postMessage({ type: 'trial' });
  useEffect(() => {
    currentWorker.postMessage({ type: 'products' });
    currentWorker.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      if (parsedData.type === 'products') {
        setProducts(parsedData.data);
      }
      if (parsedData.type === 'trade') {
        if (parsedData.thread) {
        }
        dispatch(tradesAction.setStateTrades(parsedData.data));
      }
    };
  }, []);

 console.log("i am rendered")

  return (
    <div className="App">
      <Grid container direction="column" className={classes.App2}>
        <Grid item xs={12}>
          <ButtonBar products={products} />
        </Grid>
        <Grid container className={classes.presentationArea} style={{ marginTop: 64 }}>
          <Grid item xs={10} style={{ display: 'flex', justifyContent: 'center' }} style={{ position: 'relative' }}>
            <GroupBy />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item className="vizPlusLegend" style={{ paddingTop: '10rem' }}>
                {!groupBy.thread && <Legend />}
              </Grid>
              <Grid item>{<VizArea />}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

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
}));
