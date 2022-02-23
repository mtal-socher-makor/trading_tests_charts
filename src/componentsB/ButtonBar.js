import React, { useState, useEffect, useRef } from "react";
import { useStyles, FilledButton } from "../styles/mainStyles";
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
} from "@material-ui/core";
import { openWebSocket } from "../styles/utils/utilsFunction";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IOSSwitch } from "../styles/utils/IosRadio";
import * as webSocketService from "../services/websocket";
import { PinDropSharp } from "@material-ui/icons";
import MultipleSelect from "./MultipleSelect";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { currentWorker } from "../App";
let type = "get_data";

const ButtonBar = (props) => {
  const [showFilters, setShowFilters] = useState(false)
  const [filtersChanged, setFiltersChanged] = useState(false)
  const [filters, setFilters] = useState({
    servers: [],
    types: [],
    sides: [],
    products: [],
  })
  console.log("props",props)
  const [power, setPower] = useState(false)
  const [setStateTrades, setStateTradesPartly, setTypeTrades, setSideTrades, setLocationTrades] = props.dataSetters
  const classes = useStyles()
  useEffect(() => {}, [power])
  const handleShowFilters = () => {
    setShowFilters((prev) => !prev)
  }

  const createTrade = () => {
    let data = {}
    console.log(power)
    const filteredFilters = {}
    if (!power) {
      Object.entries(filters).forEach(([filter, arr]) => {
        if (arr.length) {
          filteredFilters[filter] = arr
        }
      })
      setStateTrades([])
      setStateTradesPartly([])
      setTypeTrades({})
      setSideTrades({})
      setLocationTrades({})
    }
    
     
   
    // if (Object.values(filteredFilters).every((arr) => !arr.length)) {
    //   data = { type, power: !power };
    // } else {
    data = { mode: props.mode, type, filters: filteredFilters, power: !power };
    if (props.mode === "stress") data.threads = 1; /////CHANGE
    // }
    // webSocketService.sendEvent(JSON.stringify(data));
    // console.log(data);
    currentWorker.postMessage(data);
    setPower((prev) => !prev);
  };

  return (
    <Grid
      style={{
        marginTop: 20,
        width: '30vw',
        boxShadow: '1px 2px 5px 2px rgba(176, 178, 180,0.05),1px 7px 30px 2px rgba(176, 178, 180,0.05)',
        border: '1px solid rgba(176, 178, 180,0.2)',
        borderRadius: '10px',
      }}
      container
      spacing={3}
      justifyContent='center'
    >
      <Grid item xs={4}>
        <MultipleSelect options={['a server', 'dfgfg']} label='servers' setFilters={setFilters} values={filters.servers} />
      </Grid>
      <Grid item xs={4}>
        <FormControl className={classes.focusField} variant='outlined' size='small' fullWidth>
          <InputLabel style={{ color: '#848E9C' }}>Mode</InputLabel>
          <Select
            className={classes.filterInput}
            id='demo-multiple-option'
            value={filters.mode}
            input={<OutlinedInput label="option" />}
            onChange={(e) => props.changeMode(e.target.value)}
            // renderValue={(selected) => console.log("SELECTED", selected)}
            // MenuProps={MenuProps}
            MenuProps={{
              classes: {
                paper: classes.selectPaper,
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
          >
            {['Regular', 'Stress'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: 'black' }}
              icon={
                <FilterListIcon
                  style={{
                    color: '#848E9C',
                  }}
                />
              }
              checkedIcon={
                <FilterListIcon
                  style={{
                    color: '#848E9C',
                  }}
                />
              }
              value={showFilters}
              onChange={handleShowFilters}
            />
          }
          label='Filter By'
          style={{
            color: '#848E9C',
          }}
        />
      </Grid>

      <Grid item>
        <Collapse in={showFilters}>
          <Grid
            container
            spacing={3}
            direction='row'
            justifyContent='center'
            style={{
              position: 'relative',
              width: '30vw',
              display: showFilters ? 'flex' : 'none',
            }}
          >
            <Grid item xs={6}>
              <MultipleSelect options={['FOK', 'MKT', 'RFQ']} label='types' setFilters={setFilters} values={filters.types} />
            </Grid>
            <Grid item xs={6}>
              <MultipleSelect options={['Buy', 'Sell']} label='sides' setFilters={setFilters} values={filters.sides} />
            </Grid>
            <Grid item xs={12}>
              <MultipleSelect options={props.products} label='products' setFilters={setFilters} values={filters.products} isObjectOptions />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Grid item xs={6} direction='row' >
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
  )
}

export default ButtonBar
