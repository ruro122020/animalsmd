import React, { useEffect, useState, useRef } from 'react'
import { usePetAssessment } from '../../../context/PetAssessmentContext'
import { getData } from '../../../api'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import CustomButton from '../../../components/form/CustomButton'
import CustomFormFields from '../../../components/form/CustomFormFields';
import CustomFormik from '../../../formik/CustomFormik';
import form2Config from '../formConfigs/form2Config';
import { useAuth } from '../../../context/AuthContext'
import { postData } from '../../../api';
import { Box, CircularProgress, Alert } from '@mui/material';

const Form2 = () => {
  const { petInfo, setPetInfo } = usePetAssessment()
  const [symptoms, setSymptoms] = useState([])
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { initialValues, formSchema, field } = form2Config
  const updatedFields = { ...field, options: symptoms }
  const [isLoading, setIsLoading] = useOutletContext()
  const [petExist, setPetExist] = useState(false)

  useEffect(() => {
    const getSymptoms = async () => {
      if (petInfo.type) {
        const symptomsData = await getData(`/api/species/${petInfo.type}`)
        if (symptomsData) {
          setSymptoms(symptomsData.symptoms)
          setIsLoading(false)
        } else {
          console.log('Fetched Data returned false')
        }
      } else {
        navigate('/pet-assessment')
      }
    }
    getSymptoms()
  }, [])

  //when form 2 component gets rendered, symptoms have not been selected yet. 
  //Once the user clicks on 'get results' the petInfo and their symptoms need to be posted.
  //since the component needs to be rerendered for petInfo to have the symptoms, 
  //a useEffect is being used here so that petInfo will have the symptoms when it's being posted
  useEffect(() => {
    const postPetInfo = async () => {
      //POST PETINFO TO DATABASE
      const res = await postData('/api/user/pets', petInfo)
      if (res) {
        if (res === 409) {
          setPetExist(true)
        } else {
          setPetInfo(res)
          navigate('/pet-assessment/results')
          setIsLoading(true)
        }
      } else if (!isLoggedIn) {
        navigate('/login')
      }

    }
    if (petInfo.symptoms) {
      postPetInfo()
    }

  }, [petInfo.symptoms])

  const handleSubmit = async (values, resetForm) => {
    setPetInfo({ ...petInfo, symptoms: values.symptoms })
    resetForm()
  }
  const formik = CustomFormik(initialValues, formSchema, handleSubmit)

  if (isLoading) return <p>loading</p>
  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ paddingBottom: '12px' }}>
        {petExist && <div>

          <Alert severity="error">
            Pet already exist.
            Click <Link to='/user/dashboard'>here</Link> to view a list of your pets.
          </Alert>
        </div>}
      </div>
      <FormLabel component="legend" sx={{ textAlign: 'center' }}>SYMPTOMS</FormLabel>
      <FormControl sx={{ paddingTop: '15px', paddingLeft: '20%' }}>
        <FormGroup>
          <CustomFormFields field={updatedFields} formik={formik} />
        </FormGroup>
      </FormControl>
      <div>
        {!petExist && <CustomButton type='Submit'>
          <span style={{ paddingRight: petInfo.symptoms && '10px' }}>Get Results</span>
          {petInfo.symptoms && <CircularProgress thickness={5} size='1rem' />}
        </CustomButton>}

      </div>
    </form >

  )
}

export default Form2
