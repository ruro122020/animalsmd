import React, { useState, useEffect, useRef } from 'react'
import CustomInput from '../../../components/CustomInput'
import * as yup from 'yup'
import { getData, postData } from '../../../api'
import CustomSelect from '../../../components/CustomSelect'
import { usePetAssessment } from '../../../context/PetAssessmentContext'
import { useFormik } from 'formik'
import CustomButton from '../../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { useOutletContext } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Form1 = () => {
  const [species, setSpecies] = useState([])
  const { updatePetInfo, petInfo } = usePetAssessment()
  const navigate = useNavigate()
  const [setBoxTransition] = useOutletContext()
  const form = useRef()

  //this creates the animation
  //ref form is used to attach animation to form element
  useGSAP(() => {
    gsap.from(form.current, {
      duration: 1,
      opacity: 0,
      y: -100,
      stagger: 0.1,
      ease: "back.in"
    })
  })


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
    type: yup.string().required("*required"),
    name: yup.string().required("*required"),
    age: yup.number().typeError("Age must be a valid number").integer("Age must be an integer").required('*required').min(1, 'Age must be at least 1'),
    weight: yup.number().typeError("Weight must be a valid number").integer("Weight must be an integer").required('*required').min(1, 'Weight must be at least 1'),
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
      setBoxTransition(true)
      updatePetInfo(values)
      resetForm()
      navigate('/pet-assessment/form2')
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
      ref={form}
    >
      <div style={{ textAlign: "center" }}>
        {fields.map(({ label, name, type, value }) => {
          const hasError = formik.touched[name] && formik.errors[name]
          const errorMessage = <span style={{ color: 'red', fontSize: '12px', marginBottom: '100px' }}>{formik.errors[name]}</span>

          return <div key={name}>
            <CustomInput
              label={<span>{label} {hasError && errorMessage}</span>}
              name={name}
              type={type}
              onChange={formik.handleChange}
              value={value} />

          </div>
        })
        }
        <div>
          <CustomSelect
            label={
              <span >
                Type
                {formik.touched.type && formik.errors.type && (
                  <span style={{ color: 'red', fontSize: '12px' }}> {formik.errors.type}</span>
                )}
              </span>
            }
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
