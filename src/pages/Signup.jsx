import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Grid } from '@mui/material'
import CustomInputText from '../components/form/CustomInputText'
import * as yup from 'yup'
import CustomButton from '../components/form/CustomButton'
import { useAuth } from '../context/AuthContext'
import { postData } from '../api'
import { useNavigate } from 'react-router-dom'
import CustomLink from '../components/form/CustomLink'
import CustomFormFields from '../components/form/CustomFormFields'

const Signup = () => {
  const { updateUser, login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const formSchema = yup.object().shape({
    name: yup.string().matches(/^[a-z ]+$/i, 'Only alphabetic characters allowed').required("*required").min(3),
    username: yup.string().matches(/^[a-z ]+$/i, 'Only alphabetic characters allowed').required('*required'),
    email: yup.string().email("Invalid email").required('*required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('*required')
  })
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      //post values to api
      const responseUser = await postData('signup', values)
      if (responseUser) {
        login()
        updateUser(responseUser)
        resetForm()
        navigate('/')
        setError(false)
      } else {
        console.log('Something went wrong in signup.jsx submit function')
        setError(true)
      }
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
        {error && <div style={{ color: 'red', paddingBottom: '4px' }}>User Already Exist</div>}
        {fields.map(field =>
          <div key={field.name}>
            <CustomFormFields field={field} formik={formik} />
          </div>
        )}
        <CustomButton type_name='submit'>Submit</CustomButton>
      </form>
      <p>
        Already have an account?
        <CustomLink route='/login'>Login</CustomLink>

      </p>
    </Grid>
  )
}

export default Signup
