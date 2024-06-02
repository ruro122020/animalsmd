import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Grid } from '@mui/material'
import CustomButton from '../components/form/CustomButton'
import CustomLink from '../components/form/CustomLink'
import CustomInputText from '../components/form/CustomInputText'
import { postData } from '../api'
import CustomFormFields from '../components/form/CustomFormFields'
const Login = () => {
  const [error, setError] = useState(false)
  const { login, updateUser } = useAuth()
  let navigate = useNavigate()

  const formSchema = yup.object().shape({
    username: yup.string().required('*required'),
    password: yup.string().required('*required')
  })
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const responseUser = await postData('/api/login', values)
      if (responseUser) {
        login()
        // updateUser(responseUser)
        resetForm()
        setError(false)
        navigate('/')
      } else {
        console.log('Something went wrong in login.jsx submit function')
        setError(true)
      }
    }
  })

  const fields = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      value: formik.values.name
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
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {error && <div style={{ color: 'red', paddingBottom: '4px' }}>Invalid Credentials</div>}
        {fields.map((field) =>
          <div key={field.name} style={{ paddingBottom: '12px' }}>
            <CustomFormFields field={field} formik={formik} />
          </div>

        )}
        <CustomButton>Submit</CustomButton>
      </form>
      <p>
        Don't have an account?
        <CustomLink route='/signup'>Signup</CustomLink>
      </p>
    </Grid>
  )
}

export default Login