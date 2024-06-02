import React from 'react'
import CustomError from './CustomError'
import CustomInput from './CustomInputText'
import CustomSelect from './CustomSelect'
//Note: Make sure that field prop has the correct properties for the custom fields
//CustonInput: label, name, , value
//CustomSelect Props: label, , value, name, options

const CustomFormFields = ({ field, formik }) => {

  const hasError = formik.touched[field.name] && formik.errors[field.name]

  if (field.type === 'text' || field.type === 'email' || field.type === 'password') {
    const { label, name, value } = field
    //return input type text
    return <>
      <CustomInput
        label={<span>
          {label} <CustomError error={hasError} message={formik.errors[field.name]} />
        </span>}
        name={name}
        onChange={formik.handleChange}
        value={value} />
    </>
  }

  if (field.type === 'select') {
    //return input type select
    const { label, value, name, options } = field
    return <>
      <CustomSelect
        label={<span>
          {label} <CustomError error={hasError} message={formik.errors[field.name]} />
        </span>}
        onChange={formik.handleChange}
        value={value}
        options={options}
        name={name}
      />

    </>
  }

  if (field.type === 'checkbox') {
    //return input type checkbox

  }



}

export default CustomFormFields
