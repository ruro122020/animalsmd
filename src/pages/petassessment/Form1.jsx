import React, { useState, useEffect } from 'react'
import CustomInput from '../../components/CustomInput'
import * as yup from 'yup'
import CustomLink from '../../components/CustomLink'
import { getData, postData } from '../../api'
import CustomSelect from '../../components/CustomSelect'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { useFormik } from 'formik'

const Form1 = () => {
  const age = ['less than 1 year', '1 - 3 years old', '4 - 8 years old', '8 years old or more']
  const [species, setSpecies] = useState([])
  const { updatePetInfo, petInfo } = usePetAssessment()

  useEffect(() => {
    const getSpecies = async () => {
      const species = await getData('/api/species')
      if (species) {
        const speciesList = species.map(obj => obj.type_name)
        setSpecies(speciesList)
      } else {
        console.log('species is false, please check api file')
      }
    }
    getSpecies()
  }, [])

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
  })
  return (
    <form >
      <CustomSelect
        label='Type'
        selectName='type'
        options={species}
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
      <div style={{ padding: '12px' }}>
        <CustomLink route='/pet-assessment/form2' onClickProp={() => {
          updatePetInfo(formik.values)
        }}>Next</CustomLink>
      </div>
    </form>
  )
}

export default Form1
