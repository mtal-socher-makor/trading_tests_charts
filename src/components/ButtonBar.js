import React, { useState, useEffect } from "react";
import { useStyles } from "../styles/mainStyles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import MultipleSelect from "./MultipleSelect";
import { GreenSwitch } from "../styles/GreenSwitch";
import { useSelector, useDispatch } from "react-redux";
import * as tradesAction from "../Redux/Trades/TradesSlice";
import * as groupingAndFiltersAction from "../Redux/GroupingAndFilters/GroupingAndFiltersSlice";
import ServerMultipleSelect from "./ServerMultipleSelect";
import { filter } from "d3";
let type = "get_data";

const ButtonBar = (props) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.groupingAndFilters?.filters);
  const mode = useSelector((state) => state.groupingAndFilters?.mode);
  // const servers = useSelector((state) => state.groupingAndFilters?.filters?.servers)
  const [socketWorkers, setSocketWorkers] = useState([]);
  const [qty, setQty] = useState();
  const products = useSelector((state) => state.trades?.products);
  const selectedServers = useSelector(
    (state) => state.groupingAndFilters?.filters?.servers
  );
  const servers = JSON.parse(process.env.REACT_APP_SERVERS);
  const serverMap = {};
  servers.forEach((server) => {
    serverMap[server.ip] = server.name;
  });

  //const [showFilters, setShowFilters] = useState(false);
  const [numberOfThreads, setNumOfThreads] = useState(0);
  const [power, setPower] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    let data = {};
    const filteredFilters = {};
    if (power) {
      let workers = [];
      Object.entries(filters).forEach(([filter, arr]) => {
        if (arr.length) {
          filteredFilters[filter] = arr;
        }
      });
      dispatch(tradesAction.intializeStates());
      dispatch(groupingAndFiltersAction.initializeGrouping());

      const workingServers = selectedServers.length ? selectedServers : servers;
      for (const server of workingServers) {
        const worker = new Worker("index.js");
        data = {
          mode: mode ? "stress" : "regular",
          type,
          server,
          power: power,
        };

        if (Object.values(filteredFilters).length !== 0) {
          delete filteredFilters.threads;
          data.filters = filteredFilters;
        }
        if (mode) {
          data.products = products;
          dispatch(groupingAndFiltersAction.setGroupBy("thread"));
          data.threads = numberOfThreads;
        } else {
          dispatch(groupingAndFiltersAction.initializeGrouping());
        }
        if (
          filters.products.length === 1 &&
          ((qty !== null && qty !== undefined) || qty < 0)
        ) {
          data.filters = { ...data.filters, qty: qty };
        }

        worker.postMessage(JSON.stringify(data));

        worker.onmessage = (msg) => {
          const trade = JSON.parse(msg.data);
          dispatch(tradesAction.setStateTrades(trade.data));
        };
        workers.push(worker);
      }
      setSocketWorkers(workers);
    } else {
      if (socketWorkers.length) {
        socketWorkers.forEach((worker) => {
          data = {
            mode: mode ? "stress" : "regular",
            type,
            power: power,
          };
          worker.postMessage(JSON.stringify(data));
          worker.terminate();
        });
      }
    }
  }, [power]);

  const createTrade = () => {
    setPower((prev) => !prev);
  };

  const setLocalQty = (e) => {
    let product = products.find((p) => p.product_name === filters.products[0]);
    if (Number(e.target.value) < product.min_quantity ) {
      setQty();
    } else if (Number(e.target.value) > product.max_quantity) {
      e.target.value = product.max_quantity;
      setQty(product.max_quantity);
    } else {
      console.log(e.target.value, "QTYYYY");
      setQty(Number(e.target.value));
    }
  };

  return (
    <AppBar
      style={{
        backgroundColor:'rgb(41, 41, 41)',
        borderRadius: "0px 0px 30px 30px",
      }}
    >
      <Toolbar>
        <Grid
          style={{ flex: 1 }}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={7}>
            <Grid container spacing={2} alignItems="center">
              <Grid style={{ textAlign: "center" }} item xs={2}>
                <Typography>Server test graph</Typography>
              </Grid>
              <Grid item xs={2}>
                <ServerMultipleSelect
                  disabled={power}
                  options={servers}
                  label="servers"
                  serverMap={serverMap}
                  values={filters.servers}
                />
              </Grid>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={5}>
                    <FormControlLabel
                      disabled={power}
                      control={
                        <GreenSwitch
                          checked={mode}
                          onChange={(e) => {
                            dispatch(groupingAndFiltersAction.setMode());
                          }}
                          name="checkedA"
                        />
                      }
                      label="Stress"
                    />
                  </Grid>
                  {mode && (
                    <Grid item xs={6}>
                      <FormControl
                        className={classes.TextFieldInput}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={power}
                      >
                        <TextField
                          style={{ color: "#848E9C" }}
                          onChange={(e) => {
                            setNumOfThreads(e.target.value);
                          }}
                          size="small"
                          variant="outlined"
                          label="Threads"
                          type="number"
                        />
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={2}>
                <MultipleSelect
                  disabled={power}
                  options={["FOK", "MKT", "RFQ"]}
                  label="types"
                  values={filters.types}
                />
              </Grid>
              <Grid item xs={2}>
                <MultipleSelect
                  disabled={power}
                  options={["Buy", "Sell"]}
                  label="sides"
                  values={filters.sides}
                />
              </Grid>
              {filters.products.length === 1 ? (
                <Grid item xs={2}>
                  <FormControl
                    className={classes.TextFieldInput}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    <TextField
                      type="number"
                      style={{ color: "#848E9C" }}
                      size="small"
                      variant="outlined"
                      label="Qty"
                      value={qty}
                      inputProps={{
                        min: Number(
                          products.find(
                            (p) => p.product_name === filters.products[0]
                          ).min_quantity
                        ),
                        max: Number(
                          products.find(
                            (p) => p.product_name === filters.products[0]
                          ).max_quantity
                        ),
                        // maxLength: products.find((p) => p.product_name === filters.products[0]).max_quantity,
                        step: "0.1",
                      }}
                      onChange={setLocalQty}
                    />
                  </FormControl>
                </Grid>
              ) : null}
              <Grid item xs={2}>
                <MultipleSelect
                  disabled={power}
                  options={products}
                  label="products"
                  values={filters.products}
                  isObjectOptions={true}
                />
              </Grid>

              <Grid item xs={2}>
                <Button
                  fullWidth
                  onClick={createTrade}
                  // disabled={!selectedServers.length}
                  style={{
                    backgroundColor: "lightblue",
                    flex: 1,
                    textTransform: "none",
                  }}
                >
                  {!power ? "Start" : "Stop"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ButtonBar;
