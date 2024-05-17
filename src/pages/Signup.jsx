import React from 'react'
import { useFormik } from 'formik'
import { Grid, Button } from '@mui/material'
import CustomInput from '../components/CustomInput'
import { useState } from 'react'
import * as yup from 'yup'

const Signup = () => {
  const formSchema = yup.object().shape({
    name: yup.string().matches(/^[a-z ]+$/i, 'Only alphabetic characters allowed').required("Must enter a name").min(3),
    username: yup.string().matches(/^[a-z ]+$/i, 'Only alphabetic characters allowed').required('Must enter username'),
    email: yup.string().email("Invalid email").required('Must enter email'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      //post values to api
      console.log('values', values)
      resetForm()
      //redirect user to Pet Assessment or product page
    }
  })

  const fields = [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
      value: formik.values.name
    },
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      value: formik.values.username
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: formik.values.email
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: formik.values.password
    }
  ]

  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        {fields.map(({ label, name, type, value }) =>
          <div key={name} style={{ paddingBottom: '12px' }}>
            <CustomInput
              label={label}
              name={name}
              type={type}
              onChange={formik.handleChange}
              value={value}
            />
            {formik.touched['name'] && formik.errors['name'] && (
              <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors['name']}</div>
            )}
          </div>

        )}
        <div style={{ paddingTop: '12px' }}>
          <Button variant="outlined" type='submit'>Submit</Button>
        </div>
      </form>
    </Grid>
  )
}

export default Signup
