import React, { useRef, useEffect } from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const color = '#B3C2F2'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <Grid
      item
      xs={12}

      sx={{
        background: '#000000',
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // height: '400px'
      }}>
      <Typography variant='h1' sx={{
        color: color,
        fontSize: '90px'
      }}>Discover Your Pet's Diagnosis</Typography>
      <Typography
        style={{
          color: color,
          fontSize: '24px',
          paddingTop: '30px',
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
      <div style={{ display: 'flex', paddingTop: '25px' }}>
        <Button onClick={() => navigate('/signup')} style={{ fontWeight: 'bold' }}>Get Started</Button>
      </div>
    </Grid>
  )
}

export default Hero
