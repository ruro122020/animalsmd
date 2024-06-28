import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../../api'

const SingleProductPage = () => {
  const productId = useParams().id

  useEffect(() => {

  }, [])

  return (
    <div>
      Product details
    </div>
  )
}

export default SingleProductPage
