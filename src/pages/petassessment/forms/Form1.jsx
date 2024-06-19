import React, { useState, useEffect, useRef } from 'react'
import { getData } from '../../../api'
import { usePetAssessment } from '../../../context/PetAssessmentContext'
import CustomButton from '../../../components/form/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { useOutletContext } from "react-router-dom";
import CustomFormFields from '../../../components/form/CustomFormFields'
import CustomFormik from '../../../formik/CustomFormik'
import form1Config from '../formConfigs/form1Config'

gsap.registerPlugin(useGSAP);

const Form1 = () => {
  const [species, setSpecies] = useState([])
  const { setPetInfo } = usePetAssessment()
  const navigate = useNavigate()
  const [setBoxTransition] = useOutletContext()
  const form = useRef()
  const { initialValues, formSchema, fields } = form1Config

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

  //Fetches species list 
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

  //update options property from one of the objects in fields array
  const updatedFields = fields.map(field => {
    if (field.type === 'select') {
      return { ...field, options: species }
    }
    return field
  })
  const handleSubmit = (values, resetForm) => {
    setBoxTransition('form1')
    setPetInfo(values)
    resetForm()
    navigate('/pet-assessment/form2')
  }

  const formik = CustomFormik(initialValues, formSchema, handleSubmit)
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      ref={form}
    >
      <div style={{ textAlign: "center" }}>
        {updatedFields.map(field => <CustomFormFields field={field} formik={formik} />)}
      </div>
      <div>
        <CustomButton type='Submit'>Next</CustomButton>
      </div>
    </form>
  )
}

export default Form1
