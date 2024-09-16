import React from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'
import bird from '../../assets/home-media/bird.jpg'
import cat from '../../assets/home-media/cat.jpg'
import lizard from '../../assets/home-media/lizard.jpg'


const color = '#B3C2F2'
const font = {
  fontFamily: "Poetsen One",
}

const Hero = () => {
  return (
    <Grid item xs={12}
      sx={{
        background: '#000000',
        padding: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // height: '400px'
      }}>
      <Typography variant='h1' sx={{
        color: color,

      }}>Discover Your Pet's Diagnosis</Typography>
      <Typography
        style={{
          color: color,
          fontSize: '24px',

          width: '73%',
          textAlign: 'center'
        }}>
        Your trusted resource for understanding and treating your pet’s health issues.
      </Typography>
      <Typography
        style={{
          color: color,
          fontSize: '24px',
          paddingBottom: '12px',
          width: '73%',
          textAlign: 'center'
        }}>
        Take our quick and easy assessment to uncover insights into your pet's behavior.
      </Typography>
      <div style={{ display: 'flex' }}>
        <Button>Get Started</Button>
        <Button>Learn More</Button>
      </div>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component="img" sx={{ width: '25%', height: 'auto', objectFit: 'cover', paddingRight: '5px', borderRadius: '15px' }} src={cat} />
        <Box component="img" sx={{ width: '23%', height: 'auto', objectFit: 'cover', paddingRight: '5px', borderRadius: '15px' }} src={bird} />
        <Box component="img" sx={{ width: '25%', height: 'auto', objectFit: 'cover', borderRadius: '15px' }} src={lizard} />
      </Box> */}
    </Grid>
  )
}

export default Hero
