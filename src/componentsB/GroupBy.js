import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import { useStyles } from "../styles/mainStyles";
import { filter } from "d3";
import * as groupingAndFiltersAction from "../Redux/GroupingAndFilters/GroupingAndFiltersSlice";
import * as tradesAction from "../Redux/Trades/TradesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function GroupBy() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const groupBy = useSelector((state) => state.groupingAndFilters?.grouping);
  const mode = useSelector((state) => state.groupingAndFilters?.mode);
  const stateTrades = useSelector(
    (state) => state.trades?.dataStates?.stateTrades
  );
  const types = useSelector(
    (state) => state.groupingAndFilters?.filters?.types
  );
  const sides = useSelector(
    (state) => state.groupingAndFilters?.filters?.sides
  );
  const threads = useSelector(
    (state) => state.groupingAndFilters?.filters?.threads
  );

  const handleThreads = () => {
    dispatch(groupingAndFiltersAction.setGroupBy("thread"));
    dispatch(groupingAndFiltersAction.setFilters("threads"));
  };

  const hendleGroupChange = (groupName) => {
    dispatch(groupingAndFiltersAction.setGroupBy(groupName));
  };
  useEffect(() => {
    if (stateTrades.length) {
      if (groupBy.side) {
        dispatch(tradesAction.sortBy("side"));
      } else if (groupBy.type) {
        dispatch(tradesAction.sortBy("type"));
      } else if (groupBy.location) {
        dispatch(tradesAction.sortBy("location"));
      } else if (groupBy.thread) {
        dispatch(tradesAction.sortBy("thread"));
      } else if (!groupBy.side && !groupBy.type && !groupBy.location && !mode) {
        dispatch(tradesAction.setStateTradesPartly());
      }
    }
  }, [groupBy, stateTrades]);
  console.log("here!!");
  return (
    <Grid
      container
      direction="row"
      spacing={4}
      className={classes.groupWrapper}
    >
      {!groupBy.thread && (
        <>
          {!types.length && (
            <Grid item className={classes.groupItem}>
              <Typography
                variant="caption"
                className={classes.groupBtn}
                style={{ color: groupBy.type ? "#FFD700" : "#848E9C" }}
                onClick={() => {
                  hendleGroupChange("type");
                }}
              >
                Type
              </Typography>
            </Grid>
          )}
          {!sides.length && (
            <Grid item className={classes.groupItem}>
              <Typography
                variant="caption"
                style={{ color: groupBy.side ? "#FFD700" : "#848E9C" }}
                className={classes.groupBtn}
                onClick={() => {
                  hendleGroupChange("side");
                }}
              >
                Side
              </Typography>
            </Grid>
          )}
          <Grid item className={classes.groupItem}>
            <Typography
              variant="caption"
              style={{ color: groupBy.location ? "#FFD700" : "#848E9C" }}
              className={classes.groupBtn}
              onClick={() => {
                hendleGroupChange("location");
              }}
            >
              Location
            </Typography>
          </Grid>
          <Grid item className={classes.groupItem}>
            <Typography
              variant="caption"
              style={{ color: groupBy.allBtn ? "#FFD700" : "#848E9C" }}
              className={classes.groupBtnSpecial}
              onClick={() => {
                dispatch(groupingAndFiltersAction.setGroupBy("allBtn"));
              }}
            >
              All
            </Typography>
          </Grid>
        </>
      )}
      {groupBy.thread && (
        <>
          <Grid item className={classes.groupItem}>
            <Typography
              variant="caption"
              className={classes.groupBtn}
              style={{ color: groupBy.thread ? "#FFD700" : "#848E9C" }}
              onClick={handleThreads}
            >
              {threads.length ? "Single" : "Multi"}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}
