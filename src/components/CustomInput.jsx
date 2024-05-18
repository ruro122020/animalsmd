import TextField from '@mui/material/TextField';
const CustomInput = ({ label, name, type, onChange, value, children }) => {
  return (

    <TextField
      label={label}
      variant="filled"
      name={name}
      type={type}
      onChange={onChange}
      value={value}
    />

  )
}

export default CustomInput
