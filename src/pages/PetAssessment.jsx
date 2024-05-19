import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Grid } from '@mui/material'
import CustomInput from '../components/CustomInput'
import * as yup from 'yup'
import CustomButton from '../components/CustomButton'
import { useAuth } from '../context/AuthContext'
import { getData, postData } from '../api'
import { useNavigate } from 'react-router-dom'
import CustomLink from '../components/CustomLink'
import CustomSelect from '../components/CustomSelect'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PetAssessment = () => {
  const [symptoms, setSymptoms] = useState([])

  const formSchema = yup.object().shape({
  })
  const formik = useFormik({
    initialValues: {
      type: '',
      age: '',
      weight: '',
      symptoms: []
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      //fetch symptoms based on type of animal
      //Backend route needs to be created first
    }
  })

  const type = ['Dog', 'Cat']
  const age = ['less than 1 year', '1 - 3 years old', '4 - 8 years old', '8 years old or more']



  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <h1>Pet Assessment</h1>
      <form>
        <CustomSelect
          label='Type'
          selectName='type'
          options={type}
          handleChange={formik.handleChange}
          value={formik.values.type}
        />
        <CustomSelect
          label='Age'
          selectName='age'
          options={age}
          handleChange={formik.handleChange}
          value={formik.values.age}
        />
        <CustomInput label='Weight lb' name='weight' type='text' onChange={formik.handleChange} value={formik.values.weight} />
        <div>
          List of symptoms
        </div>
      </form>
    </Grid>
  )
}

export default PetAssessment
