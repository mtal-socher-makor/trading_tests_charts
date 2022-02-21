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
} from "@material-ui/core";
import { openWebSocket } from "../styles/utils/utilsFunction";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IOSSwitch } from "../styles/utils/IosRadio";
import * as webSocketService from "../services/websocket";
import { PinDropSharp } from "@material-ui/icons";
import MultipleSelect from "./MultipleSelect";

let type = "get_data";

const ButtonBar = (props) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [filters, setFilters] = useState({
    servers: [],
    types: [],
    sides: [],
    products: [],
  });
  const [power, setPower] = useState(false);
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
    }
    // if (Object.values(filteredFilters).every((arr) => !arr.length)) {
    //   data = { type, power: !power };
    // } else {
    data = { type, filters: filteredFilters, power: !power };
    // }
    webSocketService.sendEvent(JSON.stringify(data));
    console.log(data);
    setPower((prev) => !prev);
  };

  return (
    <Grid
      style={{ marginTop: 20, width: "30vw", border: "1px solid black" }}
      container
      spacing={5}
      direction="row"
    >
      <Grid style={{ flex: 1 }} container item>
        <MultipleSelect
          options={["a server", "dfgfg"]}
          label="servers"
          setFilters={setFilters}
          values={filters.servers}
        />
      </Grid>
      <Grid style={{ flex: 1 }} container item>
        <FormControl style={{ flex: 1 }} variant="outlined" size="small">
          <InputLabel>Mode</InputLabel>
          <Select
            id="demo-multiple-option"
            value={filters.mode}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, mode: e.target.value }))
            }
            // renderValue={(selected) => console.log("SELECTED", selected)}
            // MenuProps={MenuProps}
          >
            {["Regular", "Stress"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
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
          label="Filter By"
          style={
            {
              // border: "1px solid black",
              // position: "absolute",
              // left: 0,
              // transform: "translateX(-100%)",
            }
          }
        />
      </Grid>
      <Grid
        item
        container
        direction="row"
        style={{ position: "relative" }}
      >
        <Grid
          container
          spacing={3}
          direction="row" 
          justifyContent="center"
          style={{ width: "30vw", display: showFilters ? "flex" : "none" }}
        >
          <Grid container item xs={6}>
            <MultipleSelect
              options={["FOK", "MKT", "RFQ"]}
              label="types"
              setFilters={setFilters}
              values={filters.types}
            />
          </Grid>
          <Grid container item xs={6}>
            <MultipleSelect
              options={["Buy", "Sell"]}
              label="sides"
              setFilters={setFilters}
              values={filters.sides}
            />
          </Grid>
          <Grid container item xs={12}>
            <MultipleSelect
              options={props.products}
              label="products"
              setFilters={setFilters}
              values={filters.products}
              isObjectOptions
            />
          </Grid>
          <Grid item container xs={6} direction="row" alignItems="center">
            <Button
              onClick={createTrade}
              style={{ backgroundColor: "lightblue", flex: 1 }}
            >
              {!power ? "Start" : "Stop"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ButtonBar;
