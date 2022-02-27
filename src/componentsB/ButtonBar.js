import React, { useState, useEffect, useRef } from "react";
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
import { currentWorker } from "../App";
import { PurpleSwitch } from "../styles/GreenSwitch";
import { useSelector, useDispatch } from "react-redux";
import * as tradesAction from "../Redux/Trades/TradesSlice";
import * as groupingAndFiltersAction from "../Redux/GroupingAndFilters/GroupingAndFiltersSlice";
import { dispatch } from "d3";

let type = "get_data";

const ButtonBar = (props) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.groupingAndFilters?.filters);
  const mode = useSelector((state) => state.groupingAndFilters?.mode);
  const products = useSelector((state) => state.trades?.products);

  //const [showFilters, setShowFilters] = useState(false);
  const [numberOfThreads, setNumOfThreads] = useState(0);
  const [power, setPower] = useState(false);
  const classes = useStyles();

  useEffect(() => {}, [power]);

  const createTrade = () => {
    let data = {};
    const filteredFilters = {};
    if (!power) {
      Object.entries(filters).forEach(([filter, arr]) => {
        if (arr.length) {
          filteredFilters[filter] = arr;
        }
      });
      dispatch(tradesAction.intializeStates());
      dispatch(groupingAndFiltersAction.initializeGrouping());
    }

    data = {
      mode: mode ? "stress" : "regular",
      type,

      power: !power,
    };

    if (Object.values(filteredFilters).length !== 0) {
      data.filters = filteredFilters;
    }
    if (mode) {
      dispatch(groupingAndFiltersAction.setGroupBy("thread"));
      data.threads = numberOfThreads;
    } else {
      dispatch(groupingAndFiltersAction.initializeGrouping());
    }

    currentWorker.postMessage(data);
    setPower((prev) => !prev);
  };
  return (
    <AppBar
      style={{
        backgroundColor: "transparent",
        borderRadius: "0px 0px 30px 30px",
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={5}>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography>Server test graph</Typography>
              </Grid>
              <Grid item xs={3}>
                <MultipleSelect
                  disabled={power}
                  options={["a server", "dfgfg"]}
                  label="servers"
                  values={filters.servers}
                />
              </Grid>
              <Grid item xs={2} style={{ marginLeft: 15 }}>
                <FormControlLabel
                  control={
                    <PurpleSwitch
                      checked={mode}
                      onChange={(e) => {
                        dispatch(groupingAndFiltersAction.setMode());
                      }}
                      name="checkedA"
                    />
                  }
                  label="Stress"
                  disabled={power}
                />
              </Grid>
              {mode && (
                <Grid item xs={3}>
                  <FormControl
                    className={classes.TextFieldInput}
                    variant="outlined"
                    size="small"
                    fullWidth
                    disabled={power}
                  >
                    <TextField
                      style={{ color: "#848E9C" }}
                      className={classes.input}
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
          <Grid item xs={5}>
            <Grid
              container
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={3}>
                <MultipleSelect
                  disabled={power}
                  options={["FOK", "MKT", "RFQ"]}
                  label="types"
                  values={filters.types}
                />
              </Grid>
              <Grid item xs={3}>
                <MultipleSelect
                  disabled={power}
                  options={["Buy", "Sell"]}
                  label="sides"
                  values={filters.sides}
                />
              </Grid>
              <Grid item xs={3}>
                <MultipleSelect
                  disabled={power}
                  options={products}
                  label="products"
                  values={filters.products}
                />
              </Grid>
              <Grid item xs={2} direction="row">
                <Button
                  fullWidth
                  onClick={createTrade}
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
