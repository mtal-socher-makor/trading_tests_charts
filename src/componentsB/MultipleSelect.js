import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import { Checkbox, ListItemText } from '@material-ui/core';
import { useStyles } from '../styles/mainStyles';
import * as groupingAndFiltersAction from '../Redux/GroupingAndFilters/GroupingAndFiltersSlice';
import {useDispatch,useSelector} from 'react-redux'



const MultipleSelect = ({ label, options, values, setFilters, isObjectOptions, disabled }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  const timesMode = useSelector((state) => state.groupingAndFilters?.timesMode)
  const handleChange = (e, child) => {
    const {
      target: { value },
    } = e;
    if (isObjectOptions) {
      dispatch(groupingAndFiltersAction.setGlobalFilters({ label, value: child.props.value }));
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
        multiple={(!mode  && timesMode)? false:true}
        value={values}
        className={classes.filterInput}
        onChange={(e, child) => handleChange(e, child)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          return selected.join(', ')
        }}
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
                checked={values.indexOf(option.product_name) > -1}
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