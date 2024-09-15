import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { Button } from 'flowbite-react'
import bird from '../../assets/home-media/bird.jpg'
import cat from '../../assets/home-media/cat.jpg'
import lizard from '../../assets/home-media/lizard.jpg'


const color = '#FFFFFF' //light green
const font = {
  fontFamily: "Poetsen One",
}

const Hero = () => {
  return (
    <div>Hero</div>
  )
}

export default Hero

{/**OLD VERSION */ }
{/* <Grid item xs={12}
sx={{
  background: '#735CDD',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // height: '400px'
}}>
<Typography variant='h1' sx={{
  color: color,
  fontFamily: "Poetsen One"
}}>AnimalsMD</Typography>
<Typography
  style={{
    color: color,
    fontSize: '24px',
    paddingBottom: '12px',
    width: '73%',
    textAlign: 'center'
  }}>
  Your trusted resource for understanding and treating your pet’s health issues
</Typography>
<div>
  <Button color='light' onClick={() => navigate('/pet-assessment')} sx={{ color: color, border: `2px solid ${color}` }} >Get Started</Button>
</div>

<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Box component="img" sx={{ width: '25%', height: 'auto', objectFit: 'cover', paddingRight: '5px', borderRadius: '15px' }} src={cat} />
  <Box component="img" sx={{ width: '23%', height: 'auto', objectFit: 'cover', paddingRight: '5px', borderRadius: '15px' }} src={bird} />
  <Box component="img" sx={{ width: '25%', height: 'auto', objectFit: 'cover', borderRadius: '15px' }} src={lizard} />
</Box>
</Grid> */}