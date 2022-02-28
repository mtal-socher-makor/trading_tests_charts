import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const GreenSwitch = withStyles({
  switchBase: {
    color: '#fff',
    '&$checked': {
      color: '#76ff03',
    },
    '&$checked + $track': {
      backgroundColor:'#91ff35',
    },
  },
  checked: {},
  track: {},
})(Switch);