import { Button } from '@mui/material'


const CustomButton = ({ isDisabled, type, onClick, children }) => {
  if (type) {
    return (
      <div style={{ paddingTop: '12px' }}>
        <Button
          disabled={isDisabled}
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
          disabled={isDisabled}
          onClick={onClick}>{children}</Button>
      </div>
    )
  }
}

export default CustomButton;

