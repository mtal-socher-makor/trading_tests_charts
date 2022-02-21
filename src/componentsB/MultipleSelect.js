import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Checkbox, ListItemText, Typography } from "@material-ui/core";

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
    fontWeight:
      options.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const MultipleSelect = ({
  label,
  options,
  values,
  setFilters,
  isObjectOptions,
}) => {
  //   console.log("options", options);
  const theme = useTheme();
  //   const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e, child) => {
    const {
      target: { name, value },
    } = e;

    console.log("INSIDE THE HANDLER CHANGEf", child, e.target);
    if (isObjectOptions) {
      setFilters(
        (prev) => ({
          ...prev,
          [label]:
            typeof child.props.name === "string"
              ? child.props.name.split(",")
              : child.props.name,
        })
        // On autofill we get a stringified value.
      );
    } else {
      setFilters(
        (prev) => ({
          ...prev,
          [label]: typeof value === "string" ? value.split(",") : value,
        })
        // On autofill we get a stringified value.
      );
    }
  };

  return (
    <FormControl style={{ flex: 1 }} variant="outlined" size='small'>
      <InputLabel style={{ textTransform: "capitalize" }}>{label}</InputLabel>
      <Select
        id="demo-multiple-option"
        multiple
        value={values}
        onChange={(e, child) => handleChange(e, child)}
        input={<OutlinedInput label="option" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) =>
          isObjectOptions ? (
            <MenuItem
              key={option.product_id}
              value={option.product_name}
              name={option.product_id}
            >
              <Checkbox checked={values.indexOf(option.product_id) > -1} />
              <ListItemText primary={option.product_name} />
            </MenuItem>
          ) : (
            <MenuItem key={option} value={option} id={option}>
              <Checkbox checked={values.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
