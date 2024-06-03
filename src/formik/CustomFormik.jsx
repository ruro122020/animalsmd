import React from 'react'
import { useFormik } from 'formik'

const CustomFormik = (initialValues, validationSchema, onSubmit) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, resetForm)
    }
  })
  return formik
}

export default CustomFormik
