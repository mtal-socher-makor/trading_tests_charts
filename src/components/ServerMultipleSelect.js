import React, { useEffect, useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import clsx from 'clsx'
import { Checkbox, ListItemText } from '@material-ui/core'
import { useStyles } from '../styles/mainStyles'
import * as groupingAndFiltersAction from '../Redux/GroupingAndFilters/GroupingAndFiltersSlice'
import { useDispatch, useSelector } from 'react-redux'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const getStyles = (option, options, theme) => {
  return {
    fontWeight: options.indexOf(option) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

const ServerMultipleSelect = ({ label, options, values, setFilters, isObjectOptions, disabled, serverMap }) => {
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.groupingAndFilters?.mode)
  const timesMode = useSelector((state) => state.groupingAndFilters?.timesMode)
  let serverNames = Object.keys(values).map((value) => serverMap[value])

  const handleChange = (e, child) => {
    const {
      target: { name, value },
    } = e
    let server = options.find((server) => server.ip === child.props.value)
    dispatch(groupingAndFiltersAction.setGlobalFilters({ label, server }))

    // On autofill we get a stringified value.
  }
  return (
    <FormControl disabled={disabled} fullWidth className={classes.focusField} style={{ flex: 1 }} variant='outlined' size='small'>
      <InputLabel style={{ textTransform: 'capitalize', color: '#848E9C' }}>{label}</InputLabel>
      <Select
        id='demo-multiple-option'
        multiple={!mode && timesMode ? false : true}
        value={values}
        className={classes.filterInput}
        onChange={(e, child) => handleChange(e, child)}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          return selected.map(s => s.name).join(', ')
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
        {options.map((option) => {
          return (
            <MenuItem key={option.ip} value={option.ip} id={option.ip}>
              <Checkbox
                className={classes.rootCheckbox}
                disableRipple
                color='default'
                checkedIcon={<span className={clsx(classes.notCheckedIcon, classes.checkedIcon)} />}
                icon={<span className={classes.notCheckedIcon} />}
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                checked={values.map(s => s.ip).indexOf(option.ip) > -1}
              />
              <ListItemText primary={option.name} />
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default ServerMultipleSelect
