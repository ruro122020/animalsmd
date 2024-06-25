import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const MedicationCard = ({ medication }) => {
  return (
    <Card sx={{ paddingTop: '12px' }}>
      <Typography>{medication.name.toUpperCase()}</Typography>
      <CardContent>
        <Typography>{medication.description}</Typography>
      </CardContent>
    </Card>
  )
}

export default MedicationCard
