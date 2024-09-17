import React, { useEffect, useState } from 'react'
import { getData } from '../../api'
import ProductCard from '../../components/ProductCard'
import Grid from '@mui/material/Grid'
import Hero from './Hero'
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
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
      <header>
        <Hero />
      </header>
      <main>
        <Box sx={{ borderRight: '1px solid lightgrey', }} >

        </Box>

        {/*Thid Grid holds the products items*/}
        <Grid
          container
          spacing={4}
          sx={{ padding: '50px 50px 0px 50px' }}
        >
          {products.map(product => {
            return (
              <Grid
                key={product.id}
                item
                xs={12} sm={6} md={4} lg={3}
                sx={{ display: 'flex' }}
              >
                <ProductCard product={product} />
              </Grid>
            )
          })}
        </Grid>
      </main>
    </div>
  )
}

export default Products
