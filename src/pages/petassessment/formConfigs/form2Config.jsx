import * as yup from 'yup'

const form2Config = {
  initialValues: {
    symptoms: []
  },
  formSchema: yup.object().shape({
    symptoms: yup.array().min(2, 'At least 2 symptoms must be selected')
  }),

  //field props in CustomFormFields only requires an object to be passed because the 
  //CustomCheckboxGroup component is iterating through options and creating
  //a checkbox for each option 
  field: {
    options: [],
    name: 'symptoms',
    labelPlacement: 'end',
    type: 'checkbox'
  }
}

export default form2Config;