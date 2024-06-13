import React, { useEffect, useState, useRef } from 'react'
import { usePetAssessment } from '../../../context/PetAssessmentContext'
import { getData } from '../../../api'
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CustomButton from '../../../components/form/CustomButton'
import CustomFormFields from '../../../components/form/CustomFormFields';
import CustomFormik from '../../../formik/CustomFormik';
import form2Config from '../formConfigs/form2Config';
import { useAuth } from '../../../context/AuthContext'
import { postData } from '../../../api';
const Form2 = () => {
  const { petInfo, setPetInfo } = usePetAssessment()
  const [symptoms, setSymptoms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const form = useRef()
  const { initialValues, formSchema, field } = form2Config
  const updatedFields = { ...field, options: symptoms }

  //animation for this page is in useGSAP
  //refer to gsap docs for more info on dependencies https://gsap.com/resources/React/
  useGSAP(() => {
    if (form && form.current && !isLoading) {
      gsap.from(form.current, {
        duration: 1,
        opacity: 0,
        y: -40,
        stagger: 0.1,
        ease: "back.in"
      })
    }
  }, { dependencies: [form, isLoading] }) //these dependencies are needed for when form and isLoading state changes

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
  //petInfo SYMPTOMS ARE NOT UPDATING IN TIME TO SEND TO BACK END. LEFT OFF TRYING TO FIGURE OUT BEST
  //WAY TO SOLVE THIS ISSUE
  useEffect(() => {
    const postPetInfo = async () => {
      if (isLoggedIn) {
        //POST PETINFO TO DATABASE
        const res = await postData('/api/user/pets', petInfo)
        if (res) {
          //redirect user to dashboard
          // navigate('/results')
          console.log('it worked')
        }
      }
    }

    postPetInfo()

  }, [])

  const handleSubmit = async (values, resetForm) => {
    setPetInfo({ ...petInfo, symptoms: values.symptoms })
  }
  const formik = CustomFormik(initialValues, formSchema, handleSubmit)
  console.log('petInfo', petInfo)
  if (isLoading) return <p>Loading...</p>

  return (
    <form onSubmit={formik.handleSubmit} ref={form} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <FormLabel component="legend" sx={{ textAlign: 'center' }}>SYMPTOMS</FormLabel>
      <FormControl sx={{ paddingTop: '15px', paddingLeft: '20%' }}>
        <FormGroup>
          <CustomFormFields field={updatedFields} formik={formik} />
        </FormGroup>
      </FormControl >
      <div>
        <CustomButton>Get Results</CustomButton>
      </div>
    </form >

  )
}

export default Form2
