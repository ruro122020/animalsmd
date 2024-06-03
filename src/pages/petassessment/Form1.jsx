import React, { useState, useEffect, useRef } from 'react'
import { getData } from '../../api'
import { usePetAssessment } from '../../context/PetAssessmentContext'
import CustomButton from '../../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { useOutletContext } from "react-router-dom";
import CustomFormFields from '../../components/form/CustomFormFields'
import CustomFormik from '../../formik/CustomFormik'
import form1Validation from '../../yup/petassessment/form1Validation'

gsap.registerPlugin(useGSAP);

const Form1 = () => {
  const [species, setSpecies] = useState([])
  const { updatePetInfo } = usePetAssessment()
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

  const initialValues = {
    name: '',
    type: '',
    age: '',
    weight: '',
  }

  const handleSubmit = (values, resetForm) => {
    setBoxTransition(true)
    updatePetInfo(values)
    resetForm()
    navigate('/pet-assessment/form2')
  }

  const formik = CustomFormik(initialValues, form1Validation, handleSubmit)


  const fields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      value: formik.values.name,
    },
    {
      label: 'Age',
      name: 'age',
      type: 'text',
      value: formik.values.age,
    },
    {
      label: 'Weight',
      name: 'weight',
      type: 'text',
      value: formik.values.weight

    },
    {
      label: 'Type',
      options: species,
      name: 'type',
      type: 'select',
      value: formik.values.type,
    }

  ]
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      ref={form}
    >
      <div style={{ textAlign: "center" }}>
        {fields.map(field => <CustomFormFields field={field} formik={formik} />)}
      </div>
      <div>
        <CustomButton>Next</CustomButton>
      </div>
    </form>
  )
}

export default Form1
