import React, { useEffect } from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { deleteData, getData } from '../../api';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
/**
 * NOTE: The editing of pet is being handled in Pets component
*/

export default function PetCard({ pet, onDelete, onEdit }) {
  const { age, name, symptoms, weight, id } = pet
  const navigate = useNavigate()

  const handleDelete = async () => {
    //Delete pet from database
    const deletePet = await deleteData(`/api/user/pets/${id}`)
    if (deletePet) {
      //delete pet from pets array
      onDelete(pet)
    } else {
      console.log('oops something went wrong with handleDelete')
    }
  }

  const handleMorePetInfo = () => {
    navigate(`/user/dashboard/pets/${id}/results`)
  }
  const renderSymptoms = symptoms.map(({ name }) => <div key={name}>
    <Typography level='body-sm'><span className='material-symbols-outlined' style={{ fontSize: '12px' }}>pets</span> {name}
    </Typography></div>)

  return (
    <Card className='pet-card' sx={{
      textAlign: 'center',
      height: 'auto',
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '10px 25px ',
      transition: '0.3s',
      '&:hover': {
        boxShadow: '0px 0px 8px lightblue'
      }
    }}>
      <div onClick={handleMorePetInfo} style={{ cursor: 'pointer' }}>
        <Typography sx={{ paddingBottom: '12px', paddingTop: '12px' }} level="title-lg">{name.toUpperCase()}</Typography>
        <div>
          <Typography sx={{ paddingBottom: '12px' }}>SYMPTOMS</Typography>
          {renderSymptoms}
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
              onClick={() => onEdit(pet)}
            >
              Edit
            </Button>
          </div>
          <div>
            <Button
              variant="standard"
              size="md"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600, color: 'red' }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

