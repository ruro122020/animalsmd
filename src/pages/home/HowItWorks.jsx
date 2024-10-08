import React, { useLayoutEffect, useEffect, useRef } from 'react'
import puppy from '../../assets/home-media/puppy.jpg'
import { Button, Grid, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import bird from '../../assets/home-media/bird.jpg'
import cat from '../../assets/home-media/cat.jpg'
import lizard from '../../assets/home-media/lizard.jpg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const color = '#FFFFFF'

const HowItWorks = () => {

  const dogImg = useRef(null)
  const lizardImg = useRef(null)
  const birdImg = useRef(null)
  const catImg = useRef(null)

  //dogImg animation
  useEffect(() => {
    const elBird = birdImg.current
    const elDog = dogImg.current
    const elLizard = lizardImg.current
    const elCat = catImg.current

    gsap.fromTo(elBird, {
      x: -600,
    }, {
      x: -15,
      ease: 'power4',
      duration: 4,
      scrollTrigger: elBird
    })

    gsap.fromTo(elDog, {
      x: 600,
    }, {
      x: 0,
      ease: 'power4',
      duration: 4,
      scrollTrigger: elDog
    })

    gsap.fromTo(elLizard, {
      x: -600,
    }, {
      x: -15,
      ease: 'power4',
      duration: 4,
      scrollTrigger: elLizard
    })

    gsap.fromTo(elCat, {
      x: 600,
    }, {
      x: 0,
      ease: 'power4',
      duration: 4,
      scrollTrigger: elCat
    })
  }, [])

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#000000',
        justifyContent: 'center',
        paddingTop: '260px'
      }} >

      <div style={{ borderTop: '1px solid grey', width: '70%', paddingLeft: '15px', }}>

        {/*BLOCK ONE */}
        <div style={{ display: 'flex', width: '100%', paddingTop: '20px', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '15px' }}>
          <div style={{ paddingLeft: '24px', width: '40%' }}>
            <Typography variant='h4' sx={{
              color: color,
              fontFamily: 'Times New Roman, Times, serif',
              fontWeight: 'bold'
            }}

            >Create Account</Typography>
            <Typography sx={{ fontSize: '20px', color: color, paddingTop: '15px', paddingRight: '12px' }}>
              AnimalsMD empowers pet owners with the information and tools they need to manage their pet's health, ensuring their furry friends receive the best possible care.
            </Typography>
          </div>
          {/**the box component is the image */}
          <Box
            ref={birdImg}
            component="img"
            src={bird}
            sx={{ width: '45%', height: 'auto' }} />
        </div>

        {/*BLOCK TWO */}

        <div style={{ display: 'flex', width: '100%', alignItems: 'center', paddingBottom: '15px' }}>
          {/**the box component is the image */}
          <Box
            ref={dogImg}
            component="img"
            src={puppy}
            sx={{ width: '45%', height: 'auto' }} />

          <div style={{ paddingLeft: '24px', width: '40%' }}>
            <Typography variant='h4' sx={{
              color: color,
              fontFamily: 'Times New Roman, Times, serif',
              fontWeight: 'bold'
            }}>Pet Assessment Tool</Typography>
            <Typography sx={{ fontSize: '20px', color: color, paddingTop: '15px' }}>
              Users can input their pet's symptoms into the assessment tool, which then generates a diagnosis with potential illnesses, non-invasive remedies, treatments, and medications.
            </Typography>
          </div>
        </div>

        {/*BLOCK THREE */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '15px' }}>
          {/**the box component is the image */}
          <div style={{ paddingLeft: '24px', width: '40%' }}>
            <Typography variant='h4' sx={{
              color: color,
              fontFamily: 'Times New Roman, Times, serif',
              fontWeight: 'bold'
            }}>Prescription Medication</Typography>
            <Typography sx={{ fontSize: '20px', color: color, paddingTop: '15px' }}>
              With veterinary approval, users can conveniently purchase prescription medications directly through the website.
            </Typography>
          </div>
          <Box
            ref={lizardImg}
            component="img"
            src={lizard}
            sx={{ width: '45%', height: 'auto' }} />
        </div>

        {/*BLOCK  FOUR*/}
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', paddingBottom: '15px' }}>
          {/**the box component is the image */}
          <Box
            ref={catImg}
            component="img"
            src={cat}
            sx={{ width: '45%', height: 'auto' }} />
          <div style={{ paddingLeft: '24px', width: '40%' }}>
            <Typography variant='h4' sx={{
              color: color,
              fontFamily: 'Times New Roman, Times, serif',
              fontWeight: 'bold'
            }}>Health Records</Typography>
            <Typography sx={{ fontSize: '20px', color: color, paddingTop: '15px' }}>
              AnimalsMD allows users to keep a detailed record of all assessments, making it easy to track the health history of both current and previous pets.            </Typography>
          </div>
        </div>




      </div>
    </Grid >
  )
}

export default HowItWorks
