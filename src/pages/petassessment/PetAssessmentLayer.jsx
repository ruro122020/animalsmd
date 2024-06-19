import React, { useRef, useState } from 'react'
import { PetAssessmentProvider } from '../../context/PetAssessmentContext'
import { Outlet } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import background from '../../assets/pet-assessment-media/pet-assessment-bg.jpg'


const PetAssessmentLayer = () => {
  const title = useRef()
  const formBox = useRef()
  /*boxTransition is just to trigger the useGSAP hook. 
    anytime boxTransition value is changed, the code in useGSAP hook is run
  */
  const [boxTransition, setBoxTransition] = useState('start')

  useGSAP(() => {
    gsap.from(title.current, {
      duration: 1,
      opacity: 0,
      y: -40,
      stagger: 0.1,
      ease: "back.in"
    })
    gsap.from(formBox.current, {
      scale: 0.5,
      duration: 1.5,
      ease: 'power2.out',
      autoAlpha: 0
    })
  }, { dependencies: [boxTransition] })

  return (
    <PetAssessmentProvider>
      <Box
        display="grid"
        sx={{
          position: 'relative',
          placeItems: 'center',
          background: 'rgba(0, 0, 0, 1.0)',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          opacity: '90%',
          fontFamily: "cursive",
          fontWeight: 700,
          fontStyle: 'normal',
        }}
        minHeight="100vh">
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
            zIndex: 1,
          }}
        />
        <Box
          ref={formBox}
          style={{
            padding: '10px 35px',
            background: 'white',
            borderRadius: '5px',
            paddingBottom: '20px',
            boxShadow: '#3995ae 0px 0px 15px 3px',
            maxWidth: '500px', // max width but will scale responsively
            width: '%90',      // responsive width
            m: 'auto',         // centering the box
            position: 'relative',
            zIndex: 2,
          }}>
          <h1 style={{ textAlign: 'center', }} ref={title}>Pet Assessment</h1>
          <Outlet context={[setBoxTransition]} />
        </Box>
      </Box >
    </PetAssessmentProvider>
  )
}

export default PetAssessmentLayer
