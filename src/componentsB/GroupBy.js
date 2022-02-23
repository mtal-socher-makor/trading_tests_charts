import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay'
import { useStyles } from '../styles/mainStyles'

export default function GroupBy({ groupByThread, groupBySetters }) {
  const classes = useStyles()
  const [setGroupByType, setGroupBySide, setGroupByLocation] = groupBySetters

  return (
    <Grid container direction='row' spacing={4} className={classes.groupWrapper}>
      {!groupByThread && (
        <>
          <Grid item className={classes.groupItem}>
            <Typography
              variant='caption'
              className={classes.groupBtn}
              onClick={() => {
                setGroupByType(true)
                setGroupByLocation(false)
                setGroupBySide(false)
              }}
            >
              Type
            </Typography>
          </Grid>
          <Grid item className={classes.groupItem}>
            <Typography
              variant='caption'
              className={classes.groupBtn}
              onClick={() => {
                setGroupByType(false)
                setGroupByLocation(false)
                setGroupBySide(true)
              }}
            >
              Side
            </Typography>
          </Grid>
          <Grid item className={classes.groupItem}>
            <Typography
              variant='caption'
              className={classes.groupBtn}
              onClick={() => {
                setGroupByType(false)
                setGroupByLocation(true)
                setGroupBySide(false)
              }}
            >
              Location
            </Typography>
          </Grid>
          <Grid item className={classes.groupItem}>
            <Typography
              variant='caption'
              className={classes.groupBtnSpecial}
              onClick={() => {
                setGroupByType(false)
                setGroupByLocation(false)
                setGroupBySide(false)
              }}
            >
              ALL
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  )
}
