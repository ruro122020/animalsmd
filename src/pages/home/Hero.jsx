import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import bird from '../../assets/home-media/bird.jpg'
import cat from '../../assets/home-media/cat.jpg'
import lizard from '../../assets/home-media/lizard.jpg'


const color = '#92DCE5' //light green
const font = {
  fontFamily: "Poetsen One",
}

const Hero = () => {
  return (
    <Grid item xs={12}
      sx={{
        background: '#033f63',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // height: '400px'
      }}>
      <Typography variant='h1' sx={{
        color: color,
        fontFamily: "Poetsen One"
      }}>AnimalMD</Typography>
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

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component="img" sx={{ width: '25%', height: 'auto', objectFit: 'cover', paddingRight: '5px', borderRadius: '15px' }} src={cat} />
        <Box component="img" sx={{ width: '23%', height: 'auto', objectFit: 'cover', paddingRight: '5px', borderRadius: '15px' }} src={bird} />
        <Box component="img" sx={{ width: '25%', height: 'auto', objectFit: 'cover', borderRadius: '15px' }} src={lizard} />
      </Box>
    </Grid>
  )
}

export default Hero
