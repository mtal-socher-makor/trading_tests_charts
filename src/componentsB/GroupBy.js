import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import { useStyles } from '../styles/mainStyles';
import { filter } from 'd3';
import * as groupingAndFiltersAction from '../Redux/GroupingAndFilters/GroupingAndFiltersSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function GroupBy({ filters, groupByThread, setGroupBy, groupBySetters, groupBy, setFilters }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const grouping = useSelector((state) => state.groupingAndFilters?.grouping);
  const filters = useSelector((state) => state.groupingAndFilters?.filters);

  // const [setGroupByType, setGroupBySide, setGroupByLocation, setGroupByThread,setAllBtn] = groupBySetters
  const [groupByType, groupBySide, groupByLocation, allBtn] = groupBy;
  const handleGroup = (btnName) => {
    setGroupBy(btnName);
  };
  const handleThreads = () => {
    dispatch(groupingAndFiltersAction.setGroupBy('thread'));
    dispatch(groupingAndFiltersAction.setFilters('threads'));
  };
  return (
    <Grid container direction="row" spacing={4} className={classes.groupWrapper}>
      {!grouping.thread && (
        <>
          {!filters.types.length && (
            <Grid item className={classes.groupItem}>
              <Typography
                variant="caption"
                className={classes.groupBtn}
                style={{ color: grouping.type ? '#FFD700' : '#848E9C' }}
                onClick={() => {
                  dispatch(groupingAndFiltersAction.setGroupBy('type'));
                }}
              >
                Type
              </Typography>
            </Grid>
          )}
          {!filters.sides.length && (
            <Grid item className={classes.groupItem}>
              <Typography
                variant="caption"
                style={{ color: grouping.side ? '#FFD700' : '#848E9C' }}
                className={classes.groupBtn}
                onClick={() => {
                  dispatch(groupingAndFiltersAction.setGroupBy('side'));
                }}
              >
                Side
              </Typography>
            </Grid>
          )}
          <Grid item className={classes.groupItem}>
            <Typography
              variant="caption"
              style={{ color: grouping.location ? '#FFD700' : '#848E9C' }}
              className={classes.groupBtn}
              onClick={() => {
                dispatch(groupingAndFiltersAction.setGroupBy('location'));
              }}
            >
              Location
            </Typography>
          </Grid>
          <Grid item className={classes.groupItem}>
            <Typography
              variant="caption"
              style={{ color: grouping.allBtn ? '#FFD700' : '#848E9C' }}
              className={classes.groupBtnSpecial}
              onClick={() => {
                dispatch(groupingAndFiltersAction.setGroupBy('allBtn'));
              }}
            >
              All
            </Typography>
          </Grid>
        </>
      )}
      {grouping.thread && (
        <>
          <Grid item className={classes.groupItem}>
            <Typography variant="caption" className={classes.groupBtn} style={{ color: grouping.thread ? '#FFD700' : '#848E9C' }} onClick={handleThreads}>
              {filter.threads.length ? 'Single' : 'Multi'}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}
