import React from 'react'
import { FormControl, FormGroup, Grid, FormControlLabel, Checkbox } from '@mui/material'

/**
 * options: is an array of string to iterate through and render FormControlLabel component for each option
 * name: is the string name of whatever initialValue property. For instance, if there is a property
 * called symptoms in the initialValues the name needs to be 'symptoms' for formik to handle the change
 * 
 * Note: When using this component, make sure the wrap it with a FormControl and FormGroup to keep the inputs states in 'control'
 * <FormControl>
 *  <FormGroup>
 *    <CustomFormFields/> ---> CustomCheckboxGroup is being called in CustomFormFields component
 *  </FormGroup>
 * </FormControl>
 * 
 * This Approach was needed because TextField component from material ui can NOT be used as a checkbox
 */
const CustomCheckboxGroup = ({ options, name, labelPlacement, onChange }) => {
  return (
    <Grid container>
      {options.map(option =>
        <Grid xs={12} md={6}>
          <FormControlLabel
            control={<Checkbox color='secondary' />}
            label={option}
            labelPlacement={labelPlacement}
            onChange={onChange}
            name={name}
            value={option}
          />
        </Grid>
      )}
    </Grid>

  )
}

export default CustomCheckboxGroup
