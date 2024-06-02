import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@mui/material'
import Form1 from './Form1'
import Form2 from './Form2'
import { useGSAP } from "@gsap/react";
import background from '../../assets/pet-assessment-media/pet-assessment-bg.jpg'
import gsap from 'gsap'


/***IMPORTANT NOTE: THIS PAGE IS NOT IN USE ANYMORE BUT ITS HERE TO TRY A FEW IDEAS BEFORE DELETING PERMANENTLY */

/** Try using GSAP to render the first form, do some animation to when the next button is clicked that then renders the second form with animation */
const PetAssessment = () => {
  const title = useRef()
  useGSAP(() => {
    gsap.from(title.current, {
      duration: 1,
      opacity: 0,
      y: -40,
      stagger: 0.1,
      ease: "back.in"
    })
  })
  return (
    <Grid container sx={{ display: 'flex', textAlign: 'center', justifyContent: 'center', }}>
      <h1 ref={title}>Pet Assessment</h1>
    </Grid>
  )
}

export default PetAssessment
