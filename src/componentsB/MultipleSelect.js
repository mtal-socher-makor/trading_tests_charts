import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import { Checkbox, ListItemText } from '@material-ui/core';
import { useStyles } from '../styles/mainStyles';
import * as groupingAndFiltersAction from '../Redux/GroupingAndFilters/GroupingAndFiltersSlice';
import {useDispatch} from 'react-redux'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (option, options, theme) => {
  return {
    fontWeight: options.indexOf(option) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
};

const MultipleSelect = ({ label, options, values, setFilters, isObjectOptions, disabled }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e, child) => {
    const {
      target: { name, value },
    } = e;
    if (isObjectOptions) {
      dispatch(groupingAndFiltersAction.setGlobalFilters({ label, value: child.props.name }));
    } else {
      dispatch(groupingAndFiltersAction.setGlobalFilters({ label, value }));

      // On autofill we get a stringified value.
    }
  };

  return (
    <FormControl disabled={disabled} fullWidth className={classes.focusField} style={{ flex: 1 }} variant="outlined" size="small">
      <InputLabel style={{ textTransform: 'capitalize', color: '#848E9C' }}>{label}</InputLabel>
      <Select
        id="demo-multiple-option"
        multiple
        value={values}
        className={classes.filterInput}
        onChange={(e, child) => handleChange(e, child)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={{
          classes: {
            paper: classes.selectPaper,
            icon: classes.icon,
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {options.map((option) =>
          isObjectOptions ? (
            <MenuItem key={option.product_id} value={option.product_name} name={option.product_id}>
              <Checkbox
                className={classes.rootCheckbox}
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.notCheckedIcon, classes.checkedIcon)} />}
                icon={<span className={classes.notCheckedIcon} />}
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                checked={values.indexOf(option.product_id) > -1}
              />
              <ListItemText primary={option.product_name} />
            </MenuItem>
          ) : (
            <MenuItem key={option} value={option} id={option}>
              <Checkbox
                className={classes.rootCheckbox}
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.notCheckedIcon, classes.checkedIcon)} />}
                icon={<span className={classes.notCheckedIcon} />}
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                checked={values.indexOf(option) > -1}
              />
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
