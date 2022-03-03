import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import { StyledTextField } from '../Styles/mainStyles'

function SelectInputUnit({

  name,
  label,
  value,
  onChange,
  optionsArray,
  optionLabelField,
  valueField,
  error = null
}) {
  //optionsArray prop expects an array of objects; in each object: value and label properties:
  // [{value: "...", label: "..."}, {same}, {same}...]
  const classes = useStyles();
  //const [inputValue, setInputValue] = useState("");

  return (
        <StyledTextField
          select
         label={label}
         className={classes.arrowIcon}
          name={name}
          value={value}
          onChange={onChange}
          style={{ width: "100%" }}
          variant="outlined"
          InputLabelProps={{
            shrink: false,
          }}
          {...(error && {error: true, helperText:error})}
        >
          {optionsArray.map((option, index) => (
            <MenuItem
              key={`${option[valueField]}${index}`}
              value={option[valueField]}
            >
              {option[optionLabelField]}
            </MenuItem>
          ))}
        </StyledTextField>
  );
}

export default SelectInputUnit;

const useStyles = makeStyles((theme) => ({
  arrowIcon: {
    "& .MuiSvgIcon-root": {
      color: "#1C67FF",
      //   backgroundColor: "#FFF",
    },
    "& .MuiSelect-nativeInput": {
      //   backgroundColor: "#FFF",
    },
  },
}));