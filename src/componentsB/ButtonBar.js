import React, { useState, useEffect, useRef } from 'react'
import { useStyles, FilledButton } from '../styles/mainStyles'
import { Grid, Box, Typography, TextField, Select, Button, IconButton, Chip, Divider, FormControl, InputLabel, Checkbox, FormControlLabel, MenuItem, Collapse } from '@material-ui/core'
import { openWebSocket } from '../styles/utils/utilsFunction'
import FilterListIcon from '@material-ui/icons/FilterList'
import { IOSSwitch } from '../styles/utils/IosRadio'
import * as webSocketService from '../services/websocket'
import { PinDropSharp } from '@material-ui/icons'
import MultipleSelect from './MultipleSelect'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { currentWorker } from '../App'
let type = 'get_data'

const ButtonBar = (props) => {
  const changeMode = props.changeMode
  const setGroupByThread = props.setGroupByThread
  const [showFilters, setShowFilters] = useState(false)
  const [filtersChanged, setFiltersChanged] = useState(false)
  const [filters, setFilters] = useState({
    servers: [],
    types: [],
    sides: [],
    products: [],
  })
  console.log('props', props)
  const [numberOfThreads, setNumOfThreads] = useState(0);

  const [power, setPower] = useState(false)
  const [setStateTrades, setStateTradesPartly, setTypeTrades, setSideTrades, setLocationTrades, setThreadTrades] = props.dataSetters
  const classes = useStyles()
  useEffect(() => {}, [power])
  const handleShowFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const createTrade = () => {
    let data = {};
    console.log(power);
    const filteredFilters = {};
    if (!power) {
      Object.entries(filters).forEach(([filter, arr]) => {
        if (arr.length) {
          filteredFilters[filter] = arr;
        }
      });
      setStateTrades([]);
      setStateTradesPartly([]);
      setTypeTrades({});
      setSideTrades({});
      setLocationTrades({});
      setThreadTrades({})

    }

    data = {
      mode: props.mode.toLowerCase(),
      type,

      power: !power,
    };

    if (Object.values(filteredFilters).length !== 0) {
      data.filters = filteredFilters;
    }
    if (props.mode === "Stress") {
      setGroupByThread(true)

      data.threads = numberOfThreads;
    }
   else {
    setGroupByThread(false)
  }

    // }
    // webSocketService.sendEvent(JSON.stringify(data));
    // console.log(data);
    currentWorker.postMessage(data)
    setPower((prev) => !prev)
  }

  return (
    <Grid
      style={{
        marginTop: 20,
        width: "30vw",
        boxShadow:
          "1px 2px 5px 2px rgba(176, 178, 180,0.05),1px 7px 30px 2px rgba(176, 178, 180,0.05)",
        border: "1px solid rgba(176, 178, 180,0.2)",
        borderRadius: "10px",
      }}
      container
      spacing={3}
      justifyContent="center"
    >
      <Grid item xs={3}>
        <MultipleSelect
          disabled={power}
          options={["a server", "dfgfg"]}
          label="servers"
          setFilters={setFilters}
          values={filters.servers}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl
          disabled={power}
          className={classes.focusField}
          variant="outlined"
          size="small"
          fullWidth
        >
          <InputLabel style={{ color: "#848E9C" }}>Mode</InputLabel>
          <Select
            className={classes.filterInput}
            id="demo-multiple-option"
            value={filters.mode}
            input={<OutlinedInput label='option' />}
            onChange={(e) => props.changeMode(e.target.value)}
            // renderValue={(selected) => console.log("SELECTED", selected)}
            // MenuProps={MenuProps}
            MenuProps={{
              classes: {
                paper: classes.selectPaper,
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
          >
            {["Regular", "Stress"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {props.mode === "Stress" && (
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

      <Grid item xs={3}>
        <FormControlLabel
          disabled={power}
          control={
            <Checkbox
              style={{ color: "black" }}
              icon={
                <FilterListIcon
                  style={{
                    color: "#848E9C",
                  }}
                />
              }
              checkedIcon={
                <FilterListIcon
                  style={{
                    color: "#848E9C",
                  }}
                />
              }
              value={showFilters}
              onChange={handleShowFilters}
            />
          }
          label="Filter By"
          style={{
            color: "#848E9C",
          }}
        />
      </Grid>

      <Grid item>
        <Collapse in={showFilters}>
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            style={{
              position: "relative",
              width: "30vw",
              display: showFilters ? "flex" : "none",
            }}
          >
            <Grid item xs={6}>
              <MultipleSelect
                disabled={power}
                options={["FOK", "MKT", "RFQ"]}
                label="types"
                setFilters={setFilters}
                values={filters.types}
              />
            </Grid>
            <Grid item xs={6}>
              <MultipleSelect
                disabled={power}
                options={["Buy", "Sell"]}
                label="sides"
                setFilters={setFilters}
                values={filters.sides}
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleSelect
                disabled={power}
                options={props.products}
                label="products"
                setFilters={setFilters}
                values={filters.products}
                isObjectOptions
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Grid item xs={6} direction="row">
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
  );
};

export default ButtonBar;
