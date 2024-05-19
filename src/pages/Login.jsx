import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Grid } from '@mui/material'
import CustomButton from '../components/CustomButton'
import CustomLink from '../components/CustomLink'
import CustomInput from '../components/CustomInput'
import { postData } from '../api'
const Login = () => {
  const [error, setError] = useState(false)
  const { login, updateUser } = useAuth()
  let navigate = useNavigate()

  const formSchema = yup.object().shape({
    username: yup.string().required('Must enter username'),
    password: yup.string().required('Must enter password')
  })
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const responseUser = await postData('login', values)
      if (responseUser) {
        login()
        updateUser(responseUser)
        resetForm()
        navigate('/')
        setError(false)
      } else {
        console.log('Something went wrong in login.jsx submit function')
        setError(true)
      }
    }
  })

  const fields = [
    {
      label: 'username',
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
        {fields.map(({ label, name, type, value }) =>
          <div key={name} style={{ paddingBottom: '12px' }}>
            <CustomInput
              label={label}
              name={name}
              type={type}
              onChange={formik.handleChange}
              value={value}
            />
            {formik.touched[name] && formik.errors[name] && (
              <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors[name]}</div>
            )}
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