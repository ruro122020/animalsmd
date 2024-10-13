import * as yup from 'yup'

const editFormConfig = {
  //initial values are not here because they need to be set in the edit form. 
  //the edit form needs the pet values to be displayed in its own field
  formSchema: yup.object().shape({
    name: yup
      .string()
      .required("*required"),
    age: yup
      .number()
      .typeError("Age must be a valid number")
      .integer("Age must be an integer")
      .required('*required')
      .min(1, 'Age must be at least 1'),
    weight: yup
      .number()
      .typeError("Weight must be a valid number")
      .integer("Weight must be an integer")
      .required('*required')
      .min(1, 'Weight must be at least 1'),
    symptoms: yup
      .array()
      .min(2, 'At least 2 symptoms must be selected')
  }),
  fields: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Age',
      name: 'age',
      type: 'text',
    },
    {
      label: 'Weight',
      name: 'weight',
      type: 'text',
    },
  ]
}

export default editFormConfig;