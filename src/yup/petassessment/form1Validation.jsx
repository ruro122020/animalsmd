import React from 'react'
import * as yup from 'yup'

const form1Validation = yup.object().shape({
  type: yup.string().required("*required"),
  name: yup.string().required("*required"),
  age: yup.number().typeError("Age must be a valid number").integer("Age must be an integer").required('*required').min(1, 'Age must be at least 1'),
  weight: yup.number().typeError("Weight must be a valid number").integer("Weight must be an integer").required('*required').min(1, 'Weight must be at least 1'),
})

export default form1Validation