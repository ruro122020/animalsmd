import React from 'react'
import CustomError from './CustomError'
import CustomInput from './CustomInputText'
import CustomSelect from './CustomSelect'
import CustomCheckboxGroup from './CustomCheckboxGroup'

//Note: Make sure that field prop has the correct properties for the custom fields
//CustonInput Props: label, name, , value
//CustomSelect Props: label, , value, name, options
//CustomCheckboxGroup Props: options, name, labelPlacement 

const CustomFormFields = ({ field, formik }) => {
  const hasError = formik.touched[field.name] && formik.errors[field.name]

  if (field.type === 'text' || field.type === 'email' || field.type === 'password') {
    const { label, name } = field
    //return input type text
    return <CustomInput
      label={<span>
        {label} <CustomError error={hasError} message={formik.errors[field.name]} />
      </span>}
      name={name}
      onChange={formik.handleChange}
      value={formik.values[name]} />
  }

  if (field.type === 'select') {
    //return input type select
    const { label, value, name, options } = field
    return <CustomSelect
      label={<span>
        {label} <CustomError error={hasError} message={formik.errors[field.name]} />
      </span>}
      onChange={formik.handleChange}
      value={formik.values[name]}
      options={options}
      name={name}
    />
  }

  if (field.type === 'checkbox') {
    //return input type checkbox
    const { options, name, labelPlacement } = field
    return <>
      {hasError && <div style={{ paddingLeft: '8%' }}><CustomError error={hasError} message={formik.errors[field.name]} /></div>}
      <CustomCheckboxGroup
        options={options}
        name={name}
        labelPlacement={labelPlacement}
        onChange={formik.handleChange} />
    </>
  }



}

export default CustomFormFields
