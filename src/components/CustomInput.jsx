import TextField from '@mui/material/TextField';
// import { FormControl, InputLabel, FilledInput, InputAdornment, IconButton, VisibilityOff, Visibility } from '@mui/material';
const CustomInput = ({ label, name, type, onChange, value, children }) => {
  // const { } = field
  return (
    <div>
      <TextField
        label={label}
        variant="filled"
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />



    </div>
  )
}

export default CustomInput
