import * as yup from 'yup'


const form1Config = {
  initialValues: {
    name: 'Randy',
    type: 'dog',
    age: 12,
    weight: 3,
  },
  formSchema: yup.object().shape({
    type: yup
      .string()
      .required("*required"),
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
    {
      label: 'Type',
      options: [],
      name: 'type',
      type: 'select',
    }
  ]
}

export default form1Config