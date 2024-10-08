import React, { useRef, useEffect } from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'


const color = '#B3C2F2'

const Hero = () => {
  const hero = useRef(null)
  useEffect(() => {
    const heroRef = hero.current
    gsap.fromTo(heroRef, {
      y: -50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.5
    })

  }, [])

  return (
    <Grid
      item
      xs={12}
      ref={hero}
      sx={{
        background: '#000000',
        paddingTop: '100px',
        paddingBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // height: '400px'
      }}>
      <Typography variant='h1' sx={{
        color: color,
        fontSize: '90px'
      }}>Our Shop</Typography>
      <Typography
        style={{
          color: color,
          fontSize: '24px',
          paddingTop: '30px',
          width: '73%',
          textAlign: 'center'
        }}>
        Where you can find EVERYTHING you need for your little fur baby!
      </Typography>
    </Grid>
  )
}

export default Hero
