import React from 'react'
import { Button, Grid, Typography, Box } from '@mui/material'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
const color = '#033f63' //light green
const font = {
  fontFamily: "Poetsen One",
  fontWeight: 400,
  fontStyle: 'normal'
}

const Home = () => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Hero />
      {/* <HowItWorks /> */}
    </Grid>
  )
}

export default Home
