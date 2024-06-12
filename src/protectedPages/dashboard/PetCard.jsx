import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Grid from '@mui/material/Grid'
export default function PetCard({ pet }) {
  console.log('pet', pet)
  const { age, name, symptoms, weight } = pet

  const renderSymptoms = symptoms.map(({ name }) => <div> - {name} </div>)

  return (
    <Card xs={3} sx={{
      width: 320,
      textAlign: 'center',
      height: 'auto',
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '8px'
    }} className='pet-card'>

      <div>
        <Typography sx={{ paddingBottom: '12px', paddingTop: '12px' }} level="title-lg">{name.toUpperCase()}</Typography>
        <div>
          <Typography>SYMPTOMS</Typography>
          <Typography level='body-sm'>{renderSymptoms}</Typography>
        </div>
      </div>
      <div>
        <CardContent orientation="horizontal" sx={{ justifyContent: 'space-around' }}>
          <div>
            <Typography level="body-xs">Age</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {age}
            </Typography>
          </div>
          <div>
            <Typography level="body-xs">Weight</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {weight}
            </Typography>
          </div>

        </CardContent>
        <div style={{
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
        }} >
          <div>
            <Button
              variant="standard"
              size="md"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, color: 'orange' }}
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              variant="standard"
              size="md"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, color: 'red' }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

