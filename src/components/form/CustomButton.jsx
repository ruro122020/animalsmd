import { Button } from '@mui/material'


const CustomButton = ({ type, onClick, children }) => {
  if (type) {
    return (
      <div style={{ paddingTop: '12px' }}>
        <Button
          variant="outlined"
          type={type}>{children}</Button>
      </div>
    )
  }
  if (onClick) {
    return (
      <div style={{ paddingTop: '12px' }}>
        <Button
          variant="outlined"
          onClick={onClick}>{children}</Button>
      </div>
    )
  }
}

export default CustomButton;

