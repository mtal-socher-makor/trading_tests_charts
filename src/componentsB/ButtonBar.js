import React, { useState, useEffect, useRef } from 'react'
import {useStyles, FilledButton }from "../styles/mainStyles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
 
  Divider
} from '@material-ui/core'

function ButtonBar() {

    const classes = useStyles();

  return (
   <Grid container direction="row" className={classes.buttonRow}>
       <Grid item>
           <FilledButton>
                Full Test Suite
           </FilledButton>
       </Grid>
       <Grid item>
           <FilledButton>
               Stress 
           </FilledButton>
       </Grid>
       <Grid item>
           <FilledButton>
                Single Product Test  
           </FilledButton>
           
       </Grid>
   </Grid>
  )
}

export default ButtonBar