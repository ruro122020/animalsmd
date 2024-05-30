import { Button } from '@mui/material'


const CustomButton = ({ type_name, children }) => {
  return (
    <div style={{ paddingTop: '12px' }}>
      <Button variant="outlined" type='Submit'>{children}</Button>
    </div>
  )
}

export default CustomButton

