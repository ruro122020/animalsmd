import React from 'react'
import puppy from '../../assets/home-media/puppy.jpg'
import { Button, Grid, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import bird from '../../assets/home-media/bird.jpg'
import cat from '../../assets/home-media/cat.jpg'

const color = '#FFFFFF'

const HowItWorks = () => {
  const navigate = useNavigate()

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#000000',

      }} >

      <div style={{ borderTop: '1px solid grey', width: '70%', paddingLeft: '15px', }}>
        {/*BLOCK ONE */}
        <div style={{ paddingBottom: '50px', display: 'flex', width: '100%', paddingTop: '20px', }}>
          {/**the box component is the image */}
          <Box
            component="img"
            src={puppy}
            sx={{ width: '20%', height: 'auto' }} />

          <div style={{ paddingLeft: '24px', width: '18%' }}>
            <Typography variant='h4' sx={{
              color: color,
              fontFamily: 'Times New Roman, Times, serif',
              fontWeight: 'bold'
            }}>Customized Assessments</Typography>
            <Typography sx={{ fontSize: '20px', color: color, paddingTop: '15px' }}>
              Tailor assessments to fit your pet's specific needs
            </Typography>
          </div>
        </div>
        {/*BLOCK TWO */}

        <div style={{ paddingBottom: '50px', display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          {/**the box component is the image */}
          <Box
            component="img"
            src={bird}
            sx={{ width: '20%', height: 'auto' }} />
          <div style={{ paddingLeft: '24px', width: '18%' }}>
            <Typography variant='h4' sx={{
              color: color,
              fontFamily: 'Times New Roman, Times, serif',
              fontWeight: 'bold'
            }}>Interactive Questionnaire</Typography>
            <Typography sx={{ fontSize: '20px', color: color, paddingTop: '15px' }}>
              Engage with a user-friendly questionnaire to gather pet information
            </Typography>
          </div>
        </div>
        {/*BLOCK THREE */}

        <div style={{ paddingBottom: '50px', display: 'flex', width: '100%' }}>
          {/**the box component is the image */}
          <Box
            component="img"
            src={cat}
            sx={{ width: '20%', height: 'auto' }} />
          <div style={{ paddingLeft: '24px', width: '18%' }}>
            <Typography variant='h4' sx={{
              color: color,
              fontFamily: 'Times New Roman, Times, serif',
              fontWeight: 'bold'
            }}>Instant Results</Typography>
            <Typography sx={{ fontSize: '20px', color: color, paddingTop: '15px' }}>
              Receive immediate feedback and recommendations based on the assessment
            </Typography>
          </div>
        </div>

      </div>
    </Grid>
  )
}

export default HowItWorks
