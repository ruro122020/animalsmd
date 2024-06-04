import React, { useState } from 'react'
import { Grid } from '@mui/material'
import CustomButton from '../../components/form/CustomButton'
import { useAuth } from '../../context/AuthContext'
import { postData } from '../../api'
import { useNavigate } from 'react-router-dom'
import CustomLink from '../../components/form/CustomLink'
import CustomFormFields from '../../components/form/CustomFormFields'
import CustomFormik from '../../formik/CustomFormik'
import formConfig from './formConfig'

const Signup = () => {
  const { updateUser, login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const { initialValues, formSchema, fields } = formConfig

  const handleSubmit = async (values, resetForm) => {
    const responseUser = await postData('/api/signup', values)
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

  const formik = CustomFormik(initialValues, formSchema, handleSubmit)

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
