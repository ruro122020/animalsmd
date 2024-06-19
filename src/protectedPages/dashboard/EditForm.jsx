import React, { useEffect, useState } from 'react'
import editFormConfig from './editFormConfig'
import CustomFormik from '../../formik/CustomFormik'
import CustomFormFields from '../../components/form/CustomFormFields'
import { getData } from '../../api'
import CustomButton from '../../components/form/CustomButton'

const EditForm = ({ pet, setShowEditForm, setPet }) => {
  console.log('pet in editform', pet)
  const { formSchema, fields } = editFormConfig
  const initialValues = {
    name: pet.name,
    age: pet.age,
    weight: pet.weight,
  }

  const handleSubmit = (values, resetForm) => {
    //need to create route to update pets in database

    //update pet in frontend
    setPet({ ...pet, name: values.name, age: values.age, weight: values.weight })
    resetForm()
    setShowEditForm(false)
  }
  const formik = CustomFormik(initialValues, formSchema, handleSubmit)

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        {fields.map(field => <CustomFormFields field={field} formik={formik} />)}
      </div>
      <CustomButton type='Submit'>Submit</CustomButton>
      <CustomButton onClick={() => setShowEditForm(false)}>Cancel</CustomButton>
    </form>
  )
}

export default EditForm;