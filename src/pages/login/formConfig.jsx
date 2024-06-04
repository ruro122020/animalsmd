
import * as yup from 'yup';

const formConfig = {

  initialValue: {
    username: '',
    password: ''
  },

  fields: [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
    }
  ],

  formSchema: yup.object().shape({
    username: yup.string().required('*required'),
    password: yup.string().required('*required')
  })
}

export default formConfig