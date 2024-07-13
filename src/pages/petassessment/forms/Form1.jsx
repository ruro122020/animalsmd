import React, { useState, useEffect, useRef } from 'react'
import { getData } from '../../../api'
import { usePetAssessment } from '../../../context/PetAssessmentContext'
import CustomButton from '../../../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
import CustomFormFields from '../../../components/form/CustomFormFields'
import CustomFormik from '../../../formik/CustomFormik'
import form1Config from '../formConfigs/form1Config'
import CircularProgress from '@mui/material/CircularProgress'
import { useOutletContext } from 'react-router-dom'
const Form1 = () => {
  const [species, setSpecies] = useState([])
  const { setPetInfo } = usePetAssessment()
  const navigate = useNavigate()
  const { initialValues, formSchema, fields } = form1Config
  const [isLoading, setIsLoading] = useOutletContext()

  //Fetches species list 
  useEffect(() => {
    const getSpecies = async () => {
      const species = await getData('/api/species')
      if (species) {
        const speciesList = species.map(obj => {
          //capitalize the first letter of each species name
          const splitTypeName = obj.type_name.split(' ')
          const reformatWord = splitTypeName.map(word => {
            const capLetter = word.slice(0, 1).toUpperCase()
            const restOfWord = word.slice(1)
            return capLetter + restOfWord
          })
          //return the species name with first letter being capitalized 
          return reformatWord.join(' ')
        })
        setSpecies(speciesList)
      } else {
        console.log('species is false, please check api file')
      }
    }
    getSpecies()
  }, [])

  //update options property from one of the objects in fields array
  const updatedFields = fields.map(field => {
    if (field.type === 'select') {
      return { ...field, options: species }
    }
    return field
  })
  const handleSubmit = (values, resetForm) => {
    setPetInfo(values)
    resetForm()
    setIsLoading(true)
    navigate('/pet-assessment/form2')
  }

  const formik = CustomFormik(initialValues, formSchema, handleSubmit)
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <div style={{ textAlign: "center" }}>
        {updatedFields.map(field => <CustomFormFields key={field.id} field={field} formik={formik} />)}
      </div>
      <div>
        {/**THIS BUTTON IS SETUP TO DISPLAY THE LOADING WHEEL BUT THE LOADING FEATURE IS NOT WORKING RIGHT NOW */}
        <CustomButton type='Submit'>
          <span style={{ paddingRight: isLoading && '10px' }}>Next</span>
          {isLoading && <CircularProgress thickness={5} size='1rem' />}
        </CustomButton>
      </div>
    </form>
  )
}

export default Form1
