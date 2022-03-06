import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useStyles } from '../styles/mainStyles'

function Card() {
  const hoveredTrade = useSelector((state) => state.trades?.dataStates.hoveredTrade)
  const errorTradeID = useSelector((state) => state.groupingAndFilters.error)
  console.log('CARD', hoveredTrade)
  const classes = useStyles()

  return (
    <Grid className={classes.cardWrapper}>
      <Typography className={classes.cardTitle}>{hoveredTrade?.product_name}</Typography>

      <Typography className={classes.cardInfo}>status:{hoveredTrade?.status}</Typography>
      <Divider variant='middle' />
      <Typography className={classes.cardInfo}>location:{hoveredTrade?.location}</Typography>
      <Divider variant='middle' />
      <Typography className={classes.cardInfo}>time:{hoveredTrade?.tradeTime}</Typography>
      <Divider variant='middle' />

      {hoveredTrade.status === 400 && (
        <>
          <Typography className={classes.cardInfo}>type: {hoveredTrade?.type}</Typography>
          <Divider variant='middle' />
          <Typography className={classes.cardInfo}>side:{hoveredTrade?.side}</Typography>
          <Divider variant='middle' />
          <Typography className={classes.cardInfo}>quantity:{hoveredTrade?.quantity}</Typography>
          <Divider variant='middle' />
          
        </>
      )}
      {Object.entries(hoveredTrade.response).map(([key, value]) => (
        <>
          <Typography variant='caption' className={classes.cardInfo}>
            {key} - {value.toString()}{' '}
          </Typography>
          <Divider variant='middle' />
        </>
      ))}
    </Grid>
  )
}

export default Card
