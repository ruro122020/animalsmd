import React from 'react'

const CustomError = ({ error, message }) => {
  return error && <span style={{ color: 'red', fontSize: '12px', marginBottom: '100px' }}>{message}</span>
}

export default CustomError
