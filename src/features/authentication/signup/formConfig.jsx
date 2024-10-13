import * as yup from 'yup'

const formConfig = {
  initialValues: {
    name: '',
    username: '',
    email: '',
    password: ''
  },
  formSchema: yup.object().shape({
    name: yup.string().matches(/^[a-z ]+$/i, 'Only alphabetic characters allowed').required("*required").min(3),
    username: yup.string().required('*required'),
    email: yup.string().email("Invalid email").required('*required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('*required')
  }),
  fields: [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Username',
      name: 'username',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
    }
  ]

}

export default formConfig