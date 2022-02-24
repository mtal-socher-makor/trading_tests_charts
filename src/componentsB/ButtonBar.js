import React, { useState, useEffect, useRef } from 'react';
import { useStyles } from '../styles/mainStyles';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Select,
  Button,
  IconButton,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Collapse,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { openWebSocket } from '../styles/utils/utilsFunction';
import FilterListIcon from '@material-ui/icons/FilterList';
import { IOSSwitch } from '../styles/utils/IosRadio';
import * as webSocketService from '../services/websocket';
import { PinDropSharp } from '@material-ui/icons';
import MultipleSelect from './MultipleSelect';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { currentWorker } from '../App';
import Switch from '@material-ui/core/Switch';
import { PurpleSwitch } from '../styles/GreenSwitch';

let type = 'get_data';

const ButtonBar = (props) => {
  const changeMode = props.changeMode;
  const [showFilters, setShowFilters] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [setGroupByType, setGroupBySide, setGroupByLocation, setGroupByThread] = props.groupBySetters;
  const filters = props.filters;
  const setFilters = props.setFilters;
  console.log('props', props);
  const [numberOfThreads, setNumOfThreads] = useState(0);
  const [power, setPower] = useState(false);
  const [setStateTrades, setStateTradesPartly, setTypeTrades, setSideTrades, setLocationTrades, setThreadTrades] = props.dataSetters;
  const classes = useStyles();
  useEffect(() => {}, [power]);
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
      setThreadTrades({});
      setGroupByType(false);
      setGroupBySide(false);
      setGroupByLocation(false);
    }

    data = {
      mode: props.mode ? 'stress' : 'regular',
      type,

      power: !power,
    };

    if (Object.values(filteredFilters).length !== 0) {
      data.filters = filteredFilters;
    }
    if (props.mode) {
      setGroupByThread(true);

      data.threads = numberOfThreads;
    } else {
      setGroupByThread(false);
    }

    // }
    // webSocketService.sendEvent(JSON.stringify(data));
    // console.log(data);
    currentWorker.postMessage(data);
    setPower((prev) => !prev);
  };
  return (
    <AppBar style={{ backgroundColor: 'transparent' , borderRadius: '0px 0px 30px 30px'}}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={5}>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography>Server test graph</Typography>
              </Grid>
              <Grid item xs={3}>
                <MultipleSelect disabled={power} options={['a server', 'dfgfg']} label="servers" setFilters={setFilters} values={filters.servers} />
              </Grid>
              <Grid item xs={2} style={{ marginLeft: 15 }}>
                <FormControlLabel
                  control={
                    <PurpleSwitch
                      checked={props.mode}
                      onChange={(e) => {
                        props.changeMode((prev) => !prev);
                      }}
                      name="checkedA"
                    />
                  }
                  label="Stress"
                />
              </Grid>
              {props.mode && (
                <Grid item xs={3}>
                  <FormControl className={classes.TextFieldInput} variant="outlined" size="small" fullWidth disabled={power}>
                    <TextField
                      style={{ color: '#848E9C' }}
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
            <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
              <Grid item xs={3}>
                <MultipleSelect disabled={power} options={['FOK', 'MKT', 'RFQ']} label="types" setFilters={setFilters} values={filters.types} />
              </Grid>
              <Grid item xs={3}>
                <MultipleSelect disabled={power} options={['Buy', 'Sell']} label="sides" setFilters={setFilters} values={filters.sides} />
              </Grid>
              <Grid item xs={3}>
                <MultipleSelect disabled={power} options={props.products} label="products" setFilters={setFilters} values={filters.products} isObjectOptions />
              </Grid>
              <Grid item xs={2} direction="row">
                <Button
                  fullWidth
                  onClick={createTrade}
                  style={{
                    backgroundColor: 'lightblue',
                    flex: 1,
                    textTransform: 'none',
                  }}
                >
                  {!power ? 'Start' : 'Stop'}
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
