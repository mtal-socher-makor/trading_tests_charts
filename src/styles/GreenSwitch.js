import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const PurpleSwitch = withStyles({
  switchBase: {
    color: '#fff',
    '&$checked': {
      color: '#76ff03',
    },
    '&$checked + $track': {
      backgroundColor:'#91ff35',
    },
    "&$disabled":{
      color: "#ADD8E6"
    }
  },
  checked: {},
  track: {},
})(Switch);