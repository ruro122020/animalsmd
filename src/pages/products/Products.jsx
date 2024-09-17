import React, { useEffect, useState } from 'react'
import { getData } from '../../api'
import ProductCard from '../../components/ProductCard'
import Grid from '@mui/material/Grid'
import Hero from './Hero'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActions, Container } from '@mui/material'
import productPicture from '../../assets/products-media/productPicture.jpg'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { CardHeader, CardActionArea } from '@mui/material';
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
        <Grid
          container
          spacing={4}
          sx={{ padding: '100px 50px 0px 50px' }}
        >
          {products.map(product => {
            return (
              <Grid
                item
                xs={12} sm={6} md={4} lg={3}
                sx={{ display: 'flex' }}
              >
                <Card
                  className="THIS IS THE ONE!!!"
                  sx={{
                    display: 'flex',
                    flexGrow: '1',
                    boxShadow: '0px 0px 6px 1px lightgray',

                  }}>
                  <CardActionArea>
                    <div>
                      <CardHeader title={product.name.toUpperCase()} titleTypographyProps={{ fontSize: '14px', textAlign: 'center' }} />
                    </div>
                    <div>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={productPicture}
                        title="Product Image"
                      />
                    </div>
                    <CardContent>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Typography variant="p" sx={{ color: 'text.secondary', fontSize: '20px' }}>
                          ${product.price}
                        </Typography>
                        <div>
                          <Button>Button</Button>
                          {/* {product.prescription ? <Box size="small">Need Prescription</Box> : <Button size="small">Buy</Button>} */}
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </main>
    </div>
  )
}

export default Products
