import React from 'react'
import Checkbox from '@mui/material/Checkbox';



const CustomCheckbox = ({ checked, onChange, name }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      inputProps={{ 'aria-label': 'controlled' }}
      color='secondary'
      name={name}
    />
  )
}

export default CustomCheckbox
