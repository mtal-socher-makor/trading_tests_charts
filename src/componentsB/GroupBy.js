import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import { useStyles } from '../styles/mainStyles'
import { filter } from 'd3'

export default function GroupBy({ filters, groupByThread, setGroupBy, groupBySetters, groupBy, setFilters }) {
  const classes = useStyles()
  const [setGroupByType, setGroupBySide, setGroupByLocation, setGroupByThread,setAllBtn] = groupBySetters
  const [groupByType, groupBySide, groupByLocation ,allBtn] = groupBy
  const handleGroup = (btnName) => {
    setGroupBy(btnName)
  }
  const handleThreads = () => {
    setGroupByType(false)
    setGroupByLocation(false)
    setGroupBySide(false)
    setAllBtn(false)
    setFilters((prev) => {
      if (prev.threads.length) {
        return { ...prev, threads: [] }
      } else {
        return { ...prev, threads: ['multi'] }
      }
    })
  }
  return (
    <Grid container direction='row' spacing={4} className={classes.groupWrapper}>
      {!groupByThread && (
        <>
          {!filters.types.length && (
            <Grid item className={classes.groupItem}>
              <Typography
                variant='caption'
                className={classes.groupBtn}
                style={{ color: groupByType ? '#FFD700' : '#848E9C' }}
                onClick={() => {
                  setGroupByType(true)
                  setGroupByLocation(false)
                  setGroupBySide(false)
                  setAllBtn(false)
                }}
              >
                Type
              </Typography>
            </Grid>
          )}
          {!filters.sides.length && (
            <Grid item className={classes.groupItem}>
              <Typography
                variant='caption'
                style={{ color: groupBySide ? '#FFD700' : '#848E9C' }}
                className={classes.groupBtn}
                onClick={() => {
                  setGroupByType(false)
                  setGroupByLocation(false)
                  setGroupBySide(true)
                  setAllBtn(false)
                }}
              >
                Side
              </Typography>
            </Grid>
          )}
          <Grid item className={classes.groupItem}>
            <Typography
              variant='caption'
              style={{ color: groupByLocation ? '#FFD700' : '#848E9C' }}
              className={classes.groupBtn}
              onClick={() => {
                setGroupByType(false)
                setGroupByLocation(true)
                setGroupBySide(false)
                setAllBtn(false)
              }}
            >
              Location
            </Typography>
          </Grid>
          <Grid item className={classes.groupItem}>
            <Typography
              variant='caption'
              style={{ color: allBtn ? '#FFD700' : '#848E9C' }}
              className={classes.groupBtnSpecial}
              onClick={() => {
                setGroupByType(false)
                setGroupByLocation(false)
                setGroupBySide(false)
                setAllBtn(true)
              }}
            >
              All
            </Typography>
          </Grid>
        </>
      )}
      {groupByThread && (
        <>
          <Grid item className={classes.groupItem}>
            <Typography variant='caption' className={classes.groupBtn} style={{ color: groupByThread ? '#FFD700' : '#848E9C' }} onClick={handleThreads}>
              {filters.threads.length ? 'Single' : 'Multi'}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  )
}
