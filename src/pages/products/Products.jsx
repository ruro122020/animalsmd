import React, { useEffect, useState } from 'react'
import { getData } from '../../api'
import ProductCard from '../../components/ProductCard'
import Grid from '@mui/material/Grid'
//implement the grid system to products. display products in center of page
const Products = () => {
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      const productsArr = await getData('/api/products')
      if (productsArr) {
        setProducts(productsArr)
        setIsLoading(false)
      } else {
        console.log('Error', productsArr)
      }
    }
    getProducts()
  }, [])

  if (isLoading) return <p>Loading...</p>


  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Products</h1>
      </div>

      {/* refer to this grid setup to center grid items with the same width and height no matter the content in it without setting width and height. */}
      <Grid container columnGap={2} rowGap={2} justifyContent='center' sx={{}}>
        {products.map(product => <Grid item xs={4} sx={{ display: 'flex' }}>
          <ProductCard product={product} />
        </Grid>)}
      </Grid>
    </div>
  )
}

export default Products
