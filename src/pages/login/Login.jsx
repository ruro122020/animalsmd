import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import CustomButton from '../../components/form/CustomButton'
import CustomLink from '../../components/form/CustomLink'
import { postData } from '../../api'
import CustomFormFields from '../../components/form/CustomFormFields'
import CustomFormik from '../../formik/CustomFormik'
import formConfig from './formConfig'

const Login = () => {
  const [error, setError] = useState(false)
  const { login, updateUser, logout } = useAuth()
  let navigate = useNavigate()
  const { initialValue, formSchema, fields } = formConfig

  const handleSubmit = async (values, resetForm) => {
    const responseUser = await postData('/api/login', values)
    if (responseUser) {
      login()
      updateUser(responseUser)
      resetForm()
      setError(false)
      //-1 means to redirect users to the previous page
      navigate(-1)
      navigate('/user/dashboard')
    } else {
      logout()
      console.log('Something went wrong in login.jsx submit function')
      setError(true)
    }
  }

  const formik = CustomFormik(initialValue, formSchema, handleSubmit)

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {error && <div style={{ color: 'red', paddingBottom: '4px' }}>Invalid Credentials</div>}
        {fields.map((field) =>
          <div key={field.name} style={{ paddingBottom: '12px' }}>
            <CustomFormFields field={field} formik={formik} />
          </div>

        )}
        <CustomButton type='Submit'>Submit</CustomButton>
      </form>
      <p>
        Don't have an account?
        <CustomLink route='/signup'>Signup</CustomLink>
      </p>
    </div>
  )
}

export default Login