import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import MedicationCard from './MedicationCard'

const Results = ({ results, direction }) => {
  //STYLE COMPONENTS
  const container = { display: 'flex', flexDirection: 'column', border: '2px solid green' }
  const resultsAndRemediesBox = { display: 'flex', }
  const resultsBox = { maxWidth: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', textAlign: 'center' }
  const resultsTitle = { fontSize: '23px' }
  const resultsNameDiv = { fontSize: '12px' }
  const remediesBox = { maxWidth: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', textAlign: 'center' }
  const medicationsBox = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }
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
          <div style={resultsBox}>
            <div style={resultsTitle}>Results</div>
            <div style={resultsNameDiv}>{name.toUpperCase()}</div>
            <div>{description}</div>
          </div>
          <div style={remediesBox}>
            <div style={{ fontSize: 23 }}>Remedies</div>
            <div>{remedy}</div>
          </div>
        </Grid>

        {/* Medications div is in one grid item */}
        <Grid item>
          <div style={medicationsBox}>
            <div style={medicationTitle}>Medications</div>
            <div>
              {medications.map(medication => (
                <div style={{ padding: '5px' }}>
                  <MedicationCard medication={medication} />
                </div>
              ))}
            </div>
          </div>
        </Grid>
        {/* Products div is in one grid item */}
        <Grid>
          <div style={productsBox}>
            <div style={productTitle}>Products</div>
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
