import React, { useEffect, useState } from 'react'
import { getData } from '../../api'
import ProductCard from '../../components/ProductCard'
import Grid from '@mui/material/Grid'
import Hero from './Hero'
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

//implement the grid system to products. display products in center of page
const Products = () => {
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')
  const [sortBy, setSortBy] = useState('')
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


  const filterProducts = products.filter(product => {
    return search === '' ? product : product.name.toLowerCase().includes(search.toLowerCase())
  })
    .sort((productA, productB) => {
      if (sortBy === 'A-Z') {
        const nameA = productA.name.toUpperCase();
        const nameB = productB.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else if (sortBy === 'price-low-high') {
        return productA.price - productB.price
      } else if (sortBy === 'price-high-low') {
        return productB.price - productA.price
      }
    })

  return (
    <div style={{ backgroundColor: '#fcfbf5' }}>
      <header>
        <Hero />
      </header>
      <main style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', paddingLeft: '20px', paddingRight: '20px' }}>



        {/**SEARCH INPUT */}
        <Box sx={{ borderRight: '1px solid grey', width: '15%', textAlign: 'center' }} >
          <TextField
            size="small"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />

          {/**SORT BY ALPHEBET INPUT */}
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Sort</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <FormControlLabel onClick={(e) => setSortBy(e.target.value)} value="A-Z" control={<Radio />} label="A-Z" />
              <FormControlLabel onClick={(e) => setSortBy(e.target.value)} value="price-low-high" control={<Radio />} label="Price - Low to High" />
              <FormControlLabel onClick={(e) => setSortBy(e.target.value)} value="price-high-low" control={<Radio />} label="Price - High to Low" />
            </RadioGroup>
          </FormControl>
        </Box>



        {/*Thid Grid holds the products items*/}

        <Grid
          container
          spacing={4}
          sx={{ padding: '0px 0px 0px 20px', width: '100%' }}
        >
          {filterProducts.map(product => {
            return (
              <Grid
                key={product.id}
                item
                xs={12} sm={6} md={4} lg={3} xl={2}
                sx={{ display: 'flex' }}
              >
                <ProductCard product={product} />
              </Grid>
            )
          })}
        </Grid>

      </main>
    </div >
  )
}

export default Products
