import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export default function GroupBy({ value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value)
   
  }

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Gender</FormLabel>
      <RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChange}>
        <FormControlLabel value='TYPE' control={<Radio />} label='TYPE' />
        <FormControlLabel value='SIDE' control={<Radio />} label='SIDE' />
        <FormControlLabel value='LOCATION' control={<Radio />} label='LOCATION' />
      </RadioGroup>
    </FormControl>
  )
}
