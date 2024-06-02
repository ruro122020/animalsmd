import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
/**
 * When using this component, name must be a string with all 
 * lowercase
 * 
 */
const CustomSelect = ({ label, name, options, onChange, value }) => {

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={value}
        onChange={onChange}
        name={name}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default CustomSelect
