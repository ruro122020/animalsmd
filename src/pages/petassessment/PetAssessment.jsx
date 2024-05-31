import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import Form1 from './Form1'
import Form2 from './Form2'

const PetAssessment = () => {
  //I'm not sure how but this code stays on the page as user fills out the forms
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <h1>Pet Assessment</h1>
    </Grid>
  )
}

export default PetAssessment
