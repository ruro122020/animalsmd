import React, { useState, useEffect, useRef } from 'react'
import CustomInput from '../../components/CustomInput'
import * as yup from 'yup'
import { getData, postData } from '../../api'
import CustomSelect from '../../components/CustomSelect'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import { useFormik } from 'formik'
import CustomButton from '../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'

gsap.registerPlugin(useGSAP);

const Form1 = () => {
  const [species, setSpecies] = useState([])
  const { updatePetInfo, petInfo } = usePetAssessment()
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()
  /**Example code below */
  const container = useRef()
  const myAnimation = (element) => {
    gsap.to(element, {
      duration: 0.5,
      opacity: 0,
      y: -100,
      stagger: 0.1,
      ease: "back.in"
    })
  }
  const elementRef = useGSAP(myAnimation, [clicked])

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
    type: yup.string().required("Type is required"),
    name: yup.string().required("Name is required"),
    age: yup.number().typeError("Age must be a valid number").integer("Age must be an integer").required('Age is required').min(1, 'Age must be at least 1'),
    weight: yup.number().typeError("Weight must be a valid number").integer("Weight must be an integer").required('Weight is required').min(1, 'Weight must be at least 1'),
    //symptoms array is being validated in form 2
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      age: '',
      weight: '',
      symptoms: []
    },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setClicked(!clicked)
      updatePetInfo(values)
      // resetForm()
      // navigate('/pet-assessment/form2')
    }
  })
  const fields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      value: formik.values.name
    },
    {
      label: 'Age',
      name: 'age',
      type: 'text',
      value: formik.values.age
    },
    {
      label: 'Weight',
      name: 'weight',
      type: 'text',
      value: formik.values.weight
    }
  ]
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      ref={elementRef}
    >
      <div style={{ textAlign: "center" }}>
        {fields.map(({ label, name, type, value }) =>
          <div key={name}>
            {formik.touched[name] && formik.errors[name] && (
              <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors[name]}</div>
            )}
            <CustomInput
              label={label}
              name={name}
              type={type}
              onChange={formik.handleChange}
              value={value} />

          </div>)}
        <div>
          {formik.touched.type && formik.errors.type && (
            <div style={{ color: 'red', paddingTop: '7px' }}>{formik.errors.type}</div>
          )}
          <CustomSelect
            label='Type'
            selectName='type'
            options={species}
            handleChange={formik.handleChange}
            value={formik.values.type}
          />

        </div>
      </div>
      <div>
        <CustomButton>Next</CustomButton>
      </div>
    </form>
  )
}

export default Form1
