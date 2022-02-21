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
} from "@material-ui/core";
import { openWebSocket } from "../styles/utils/utilsFunction";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IOSSwitch } from "../styles/utils/IosRadio";
import * as webSocketService from '../services/websocket'

let data = {
      type: 'get_data',
      filters: {
        type: 'MKT',
      },
    }

function ButtonBar() {
  const [showFilters, setShowFilters] = useState(false);
  const [power , setPower] = useState(false)
  const classes = useStyles();
  const handleShowFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const createTrade = () => {
    setPower(!power)
    console.log(power)
    webSocketService.sendEvent(JSON.stringify(data));
    console.log(data)
   
  }

  return (
    <Grid style={{marginTop: 20, width: "30vw", border: '1px solid black' }} container spacing={5} direction="row">
      <Grid style={{ flex: 1 }} container item>
        <FormControl
          style={{ flex: 1 }}
          className={classes.buttonRow}
          variant="outlined"
        >
          <InputLabel>Servers</InputLabel>
          <Select inputProps={{variant: 'dense'}}/>
        </FormControl>
      </Grid>
      <Grid style={{ flex: 1 }} container item>
        <FormControl style={{ flex: 1 }} variant="outlined">
          <InputLabel>Mode</InputLabel>
          <Select />
        </FormControl>
      </Grid>
      <Grid item container xs={4} direction="row" alignItems='center'>
        <Button onClick={createTrade} style={{backgroundColor : 'lightblue'}}>
          {!power? 'Start' : 'Stop'}</Button>
      </Grid>
      <Grid item container direction='row'  style={{position: 'relative'}}>
        <Grid item >
          <FormControlLabel 
            control={
              <Checkbox
                style={{ color: "black" }}
                icon={<FilterListIcon />}
                checkedIcon={<FilterListIcon />}
                value={showFilters}
                onChange={handleShowFilters}
              />
            } 
            label="Filter By" style={{position: 'absolute' ,left: 0, transform: 'translateX(-100%)'}}
          />
          <Grid
            container
            spacing={3}
            style={{ width: "30vw", display: showFilters ? "flex" : "none" }}
          >
            <Grid style={{ flex: 1 }} container item>
              <FormControl
                style={{ flex: 1 }}
                className={classes.buttonRow}
                variant="outlined"
              >
                <InputLabel>Side</InputLabel>
                <Select />
              </FormControl>
            </Grid>
            <Grid style={{ flex: 1 }} container item>
              <FormControl
                style={{ flex: 1 }}
                className={classes.buttonRow}
                variant="outlined"
              >
                <InputLabel>Type</InputLabel>
                <Select />
              </FormControl>
            </Grid>
            <Grid style={{ flex: 1 }} container item>
              <FormControl
                style={{ flex: 1 }}
                className={classes.buttonRow}
                variant="outlined"
              >
                <InputLabel>Coins</InputLabel>
                <Select />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ButtonBar;
