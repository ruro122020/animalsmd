const CustomButton = ({ isDisabled, type, onClick, children }) => {
  if (type) {
    return (
      <div style={{ paddingTop: '12px' }}>
        <button
          type={type}>
          {children}
        </button>
      </div>
    )
  }
  if (onClick) {
    return (
      <div style={{ paddingTop: '12px' }}>
        <button
          disabled={isDisabled}
          onClick={onClick}>{children}</button>
      </div>
    )
  }
}

export default CustomButton;

