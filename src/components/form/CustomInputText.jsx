import TextField from '@mui/material/TextField';
const CustomInput = ({ label, name, onChange, value, children }) => {
  return (
    <TextField
      sx={{ m: 1, minWidth: 120 }}
      label={label}
      variant="filled"
      name={name}
      type='text'
      onChange={onChange}
      value={value}
    />

  )
}

export default CustomInput
