import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



const MedicationCard = ({ medication }) => {
  return (
    <div sx={{ paddingTop: '12px' }}>
      <Typography>{medication.name.toUpperCase()}</Typography>
      <CardContent>
        <Typography>{medication.description}</Typography>
      </CardContent>
    </div>
  )
}

export default MedicationCard
