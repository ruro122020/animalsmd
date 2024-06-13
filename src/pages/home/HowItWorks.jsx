import React from 'react'
import puppy from '../../assets/home-media/puppy.jpg'
import { Button, Grid, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const color = '#033f63' //dark green

const HowItWorks = () => {
  const navigate = useNavigate()

  return (
    <Grid
      item
      xs={12}
      sx={{
        border: '2px solid green',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#92DCE5'
      }} >
      <div style={{ display: 'flex', padding: '12px' }}>
        {/* Box component is the image container */}
        <Box
          component="img"
          src={puppy}
          sx={{ width: '45%', height: 'auto', borderRadius: '15px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h3' sx={{
            color: color, fontFamily: "Poetsen One"
          }}>HOW IT WORKS</Typography>
          <Typography sx={{ padding: '12px', fontSize: '24px', color: color }}>
            Our innovative assessment tool takes the guesswork out of diagnosing your pet’s health problems.
            By answering a few simple questions, you can quickly find out what might be wrong with your furry
            friend and get recommendations for effective treatments. Simply enter your pet’s symptoms, get a
            list of possible illnesses, and find effective medications and treatments.
          </Typography>
          <div>
            <Button onClick={() => navigate('/pet-assessment')} sx={{ color: color, border: `2px solid ${color}` }} >Get Started</Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default HowItWorks
