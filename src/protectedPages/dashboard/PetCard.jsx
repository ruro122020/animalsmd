import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function PetCard({ pet }) {
  console.log('pet', pet)
  const { age, name, symptoms, weight } = pet

  const renderSymptoms = symptoms.map(({ name }) => <div> - {name}</div>)

  return (
    <Card sx={{ width: 320, textAlign: 'center' }} className='pet-card'>
      <div>
        <Typography level="title-lg">{name.toUpperCase()}</Typography>
        <Typography level="body-sm"></Typography>
      </div>

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
      <CardContent orientation='vertical'>
        <Typography>SYMPTOMS</Typography>
        <div>
          {renderSymptoms}
        </div>
        <div style={{ paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }} >
          <div>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

