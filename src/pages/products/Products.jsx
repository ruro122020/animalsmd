import React, { useEffect, useRef, useState } from 'react'
import { getData } from '../../api'
import ProductCard from '../../components/ProductCard'
import Hero from './Hero'



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
      <header >
        <Hero />
      </header>
      <main style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', paddingLeft: '20px', paddingRight: '20px', paddingTop: '30px' }}>

        {/**SEARCH INPUT */}
        <div sx={{ width: '15%', textAlign: 'center' }} >
          <label>Search</label>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/**SORT BY ALPHEBET INPUT */}
          <div>
            <fieldset>
              <legend>Sort</legend>
              <div>
                <input
                  type="radio"
                  name="sort"
                  id="A-Z"
                  value="A-Z"
                  onClick={(e) => setSortBy(e.target.value)}
                />
                <label for="A-Z">A-Z</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="price-low-high"
                  name="sort"
                  value="price-low-high"
                  onClick={(e) => setSortBy(e.target.value)}
                />
                <label for="price-low-high">Price - Low to High</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="price-high-low"
                  name="sort"
                  value="price-high-low"
                  onClick={(e) => setSortBy(e.target.value)}
                />
                <label for="price-high-low">Price - High to Low</label>
              </div>

            </fieldset>
          </div>
        </div>

        {/*Thid Grid holds the products items*/}
        <div>
          {filterProducts.map(product => {
            return (
              <div
                key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          })}
        </div>

      </main>
    </div >
  )
}

export default Products
