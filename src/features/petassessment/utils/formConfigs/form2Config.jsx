import * as yup from 'yup'

const form2Config = {
  initialValues: {
    symptoms: []
  },
  formSchema: yup.object().shape({
    symptoms: yup.array().min(2, 'At least 2 symptoms must be selected')
  })
}

export default form2Config;