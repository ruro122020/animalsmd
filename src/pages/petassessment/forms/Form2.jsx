import React, { useEffect, useState, useRef } from 'react'
import { usePetAssessment } from '../../../context/PetAssessmentContext'
import { getData } from '../../../api'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import form2Config from '../formConfigs/form2Config';
import { useAuth } from '../../../context/AuthContext'
import { postData } from '../../../api';
import { useFormik } from 'formik'

const Form2 = () => {
  const { petInfo, setPetInfo } = usePetAssessment()
  const [symptoms, setSymptoms] = useState([])
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { initialValues, formSchema, field } = form2Config
  const updatedFields = { ...field, options: symptoms }
  const [isLoading, setIsLoading] = useOutletContext()
  const [petExist, setPetExist] = useState(false)
  const [selected, setSelected] = useState([])
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

  const handleChange = (e) => {
    console.log('e.target', e.target)
    if (e.target.checked) {
      setSelected(prevState => [...prevState, e.target.value])
    } else {
      setSelected(selected.filter(symptom => symptom !== e.target.value))
    }
  }

  const formik = useFormik({
    initialValues: form2Config.initialValues,
    validationSchema: form2Config.formSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('here')
    }
  })
  if (isLoading) return <p>loading</p>
  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

      <fieldset>
        <legend>Choose your pet's symptoms</legend>
        {formik.touched.symptoms && formik.errors.symptoms &&
          <div>{formik.errors.symptoms}</div>
        }
        {symptoms.map(symptom =>
          <div key={symptom}>
            <input type="checkbox" id={symptom} name={'symptom'} value={symptom} checked={selected.includes(symptom)} onChange={handleChange} />
            <label htmlFor={symptom}>{symptom}</label>
          </div>
        )}

      </fieldset>
      <div>
        <button type='submit'>Get Results</button>
      </div>
    </form >

  )
}

export default Form2
