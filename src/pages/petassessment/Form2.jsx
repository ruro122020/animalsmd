import React, { useEffect, useState } from 'react'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { getData } from '../../api'
import CustomCheckbox from '../../components/CustomCheckbox'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import { Grid } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik'
import * as yup from 'yup'
import CustomButton from '../../components/CustomButton';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
const Form2 = () => {
  const { petInfo } = usePetAssessment()
  const [symptoms, setSymptoms] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getSymptoms = async () => {
      if (petInfo.type) {
        const symptomsData = await getData(`/api/species/${petInfo.type}`)
        if (symptomsData) {
          setSymptoms(symptomsData.symptoms)
        } else {
          console.log('Fetched Data returned false')
        }
      } else {
        navigate('/pet-assessment')
      }
    }
    getSymptoms()
  }, [])

  const formSchema = yup.object().shape({
    symptoms: yup.array().min(1, 'At least one checkbox must be selected'),

  })

  const formik = useFormik({
    initialValues: {
      symptoms: []
    },
    // validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log('values', values)
      // updatePetInfo(values)
      // resetForm()
    },

  })

  const handleSymptomsChange = (event) => {
    //get values from event
    //update formik symptoms array with values

  }


  return (
    <form onSubmit={formik.handleSubmit} >
      <FormControl sx={{}} component="" variant="" >
        <FormLabel component="legend">SYMPTOMS</FormLabel>
        <FormGroup>
          {symptoms.map(symptom =>
            <FormControlLabel
              control={<Checkbox color='secondary' />}
              label={symptom}
              labelPlacement='start'
              onChange={formik.handleChange}
              name={symptom}
              value={formik.values.symptoms.includes(symptom)}
            />
          )}
        </FormGroup>
      </FormControl >
      <CustomButton>Submit</CustomButton>
    </form>
  )
}

export default Form2
