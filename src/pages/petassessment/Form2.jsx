import React, { useEffect, useState } from 'react'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { getData } from '../../api'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import { Grid } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik'
import * as yup from 'yup'
import CustomButton from '../../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
/*
IMPORTANT NOTE: 
  Formik doesn't have an internal way of handling updating nested arrays in inital values. In this case, for symptoms array.
  Therefore, a work around has been implemented. A custom handleChange was created to be passed to the FormControlLabel components. 
  In the handleSymptomsChange, any of the symptoms selected will be added to the sypmtoms array in formik.values manuelly
*/
const Form2 = () => {
  const { petInfo, updatePetInfo } = usePetAssessment()
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
    symptoms: yup.array().min(2, 'At least 2 checkboxes must be selected'),

  })

  const formik = useFormik({
    initialValues: {
      symptoms: []
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      updatePetInfo({ ...petInfo, symptoms: values.symptoms })
      //POST PETINFO TO DATABASE
      resetForm()
    },

  })

  const handleSymptomsChange = (event) => {
    //get checked and name from event
    const { checked, name } = event.target
    const currentSymptoms = formik.values.symptoms
    //update symptoms array in formik with values if symptom is checked
    if (checked) {
      formik.setFieldValue("symptoms", [...currentSymptoms, name])
    } else {
      formik.setFieldValue('symptoms', currentSymptoms.filter(symptom => symptom !== name))
    }
    //mark symptoms as touched
    formik.setTouched({
      ...formik.touched,
      symptoms: true
    })
  }

  return (

    <form onSubmit={formik.handleSubmit}>
      <FormLabel component="legend" sx={{ textAlign: 'center' }}>SYMPTOMS</FormLabel>
      <FormControl style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
        <FormGroup >
          <Grid container spacing={-30} >
            {symptoms.map(symptom =>
              <Grid xs={12} md={4}>
                <FormControlLabel
                  control={<Checkbox color='secondary' />}
                  label={symptom}
                  labelPlacement='end'
                  onChange={handleSymptomsChange}
                  name={symptom}
                  value={formik.values.symptoms.includes(symptom)}
                />
              </Grid>
            )}
          </Grid>
        </FormGroup>
      </FormControl >
      {formik.touched.symptoms && formik.errors.symptoms && (
        <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.symptoms}</div>
      )}
      <div style={{ textAlign: 'center' }}>
        <CustomButton>Submit</CustomButton>
      </div>
    </form>

  )
}

export default Form2
