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
  Box,
  AppBar,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import MultipleSelect from "./MultipleSelect";
import { GreenSwitch } from "../styles/GreenSwitch";
import { useSelector, useDispatch } from "react-redux";
import * as tradesAction from "../Redux/Trades/TradesSlice";
import ServerMultipleSelect from "./ServerMultipleSelect";
import { setErrorId } from "../Redux/GroupingAndFilters/GroupingAndFiltersSlice";
let type = "get_data";

const useStyle = makeStyles(() => ({
  root: {},
  errorTypo: {
    color: "rgba(255,255,255,.4)",
    // padding: ".4rem 1rem",
    borderRadius: 4,
    "&:hover": { color: "rgb(90,90,90)" },
  },
}));
const ErrorLogger = (props) => {
  const [isOpen, setOpen] = useState(true);
  const dispatch = useDispatch();
  const stateTrades = useSelector(
    (state) => state.trades?.dataStates?.stateTrades
  );
  const classes = useStyle();
  useEffect(() => {}, [stateTrades]);
  const errorHandler = (e) => {
    console.log("Inside the error handler", e);
    if (e.type === "mouseenter") {
      dispatch(setErrorId(e.target.id));
    } else {
      dispatch(setErrorId(""));
    }
  };
  return (
    <Box style={{ width: "100%", position: "relative", height: "100%" }}>
      <Button
        style={{
          position: "absolute",
          borderTop: "5px solid rgb(60,60,60)",
          borderLeft: "5px solid rgb(60,60,60)",
          borderBottom: "5px solid rgb(60,60,60)",
          borderRadius: "50% 0 0 50%",
          backgroundColor: "rgb(41, 41, 41)",
          height: "4rem",
          width: "10px",
          padding: 0,
          top: "50%",
          right: "100%",
          transform: "translate(0,-50%)",
          color: "white",
        }}
        onClick={()=>setOpen(!isOpen)}
      />
      <Collapse in={isOpen} unmountOnExit>
        <Box
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            overflowY: "scroll",
            marginTop: "40px",
          }}
        >
          {stateTrades.map((trade) => {
            console.log(trade.status);
            return (
              <>
                {trade.status === 400 && (
                  <Typography
                    id={trade.id}
                    onMouseEnter={errorHandler}
                    onMouseLeave={errorHandler}
                    component={"div"}
                    className={classes.errorTypo}
                  >
                    {trade.message}
                  </Typography>
                )}
              </>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ErrorLogger;
