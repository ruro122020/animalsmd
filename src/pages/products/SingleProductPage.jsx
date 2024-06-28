import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../../api'

/**IMPORTANT NOTE: THIS PAGE IS CURRENTLY NOT IN USE ANYWHERE. CAN DELETE IF IT IS NO LONGER NEEDED */

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
