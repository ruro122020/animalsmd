import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { deleteData } from '../../api';

export default function PetCard({ pet, onDelete, onEdit }) {
  const { age, name, symptoms, weight, id } = pet
  const renderSymptoms = symptoms.map(({ name }) => <div> <span className='material-symbols-outlined' style={{ fontSize: '12px' }}>pets</span> {name} </div>)

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
  /**
   * NOTE: The editing of pet is being handled in Pets component
   */
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
          <Typography sx={{ paddingBottom: '12px' }}>SYMPTOMS</Typography>
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

