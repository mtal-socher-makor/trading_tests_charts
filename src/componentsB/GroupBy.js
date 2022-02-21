import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from "../styles/mainStyles"

export default function GroupBy({setGroupBy }) {

  const classes = useStyles();

 
  const handleGroup =(btnName)=>{
    setGroupBy(btnName)
  }
  return (
   <Grid container spacing={4} className={classes.groupWrapper}>
     <Grid item>
       <Typography variant='caption' className={classes.groupBtn} onClick={() => handleGroup("type")}>Type </Typography>
     </Grid>
     <Grid item>
       <Typography variant='caption' className={classes.groupBtn}>Side </Typography>
     </Grid>
     <Grid item>
       <Typography variant='caption' className={classes.groupBtn}>Location</Typography>
     </Grid>
   </Grid>
  )
}
