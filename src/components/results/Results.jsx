import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import MedicationCard from './MedicationCard'
import Card from '@mui/material/Card'
import { CardContent, Typography } from '@mui/material'
import Divider from '@mui/material/Divider';


const Results = ({ results, direction }) => {
  //STYLE COMPONENTS
  const container = { display: 'flex', flexDirection: 'column' }
  const resultsAndRemediesBox = { textAlign: 'center' }
  const resultsBox = { maxWidth: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', textAlign: 'center' }
  const resultsTitle = { fontSize: '23px' }
  const resultsNameDiv = { fontSize: '12px' }
  const remediesBox = { maxWidth: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', textAlign: 'center' }
  const medicationsBox = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '12px' }
  const productsBox = { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', textAlign: 'center' }
  const productTitle = { fontSize: '23px' }
  const productNameDiv = { fontSize: '12px' }
  const medicationTitle = { fontSize: '23px' }

  return results.map(({ name, description, id, medications, remedy, symptoms, products }) => {
    return (
      //Results and Remedies are in the same grid because there content has no mapping
      <Grid key={id} style={container}>
        {/**Results and Remedies divs are in one grid item */}
        <Grid item sx={resultsAndRemediesBox}>
          <Typography style={resultsTitle}>Results</Typography>
          <div style={{ display: 'flex' }}>
            <div style={resultsBox}>
              <Typography >{name.toUpperCase()}</Typography>
              <CardContent>
                <Typography>{description}</Typography>
              </CardContent>
            </div>

            <div style={remediesBox}>
              <Typography>REMEDIES</Typography>
              <CardContent>
                <Typography>{remedy}</Typography>
              </CardContent>
            </div>
          </div>
        </Grid>

        {/* Medications div is in one grid item */}
        <Divider variant="middle" />
        <Grid item>
          <div style={medicationsBox}>
            <Typography style={medicationTitle}>Medications</Typography>
            <div>
              {medications.map(medication => (
                <div style={{ padding: '5px' }} key={medication.id}>
                  <MedicationCard medication={medication} />
                </div>
              ))}
            </div>
          </div>
        </Grid>
        {/* Products div is in one grid item */}
        <Divider variant="middle" />

        <Grid>
          <div style={productsBox}>
            <Typography style={productTitle}>Products</Typography>
            {products.map(({ name, description, price, prescription, id }) => {
              return (
                <div key={id}>
                  <div style={productNameDiv}>{name.toUpperCase()}</div>
                  <div>{description}</div>
                  <div>${price}</div>
                  <div>{prescription && "Prescription Needed"}</div>

                </div>
              )
            })}
          </div>
        </Grid>
      </Grid >
    )
  })
}

export default Results
