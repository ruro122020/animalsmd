import React from 'react'

const Results = ({ results, direction }) => {
  //STYLE COMPONENTS
  const container = { display: 'flex', flexDirection: direction, padding: '15px' }
  const resultsBox = {}
  const remediesBox = {}
  const medicationsContainer = {}
  const medicationsBox = {}
  return results.map(({ name, description, id, medications, remedy, symptoms }) => {
    return (
      <div key={id} style={container}>
        <div style={resultsBox}>
          <div>Results</div>
          <div>{name.toUpperCase()}</div>
          <div>{description}</div>
        </div>
        <div>
          <div>Remedies</div>
          <div>{remedy}</div>
        </div>
        <div>
          <div>Medications</div>
          {medications.map(({ name, description, id }) => {
            return (
              <div key={id}>
                <div>{name.toUpperCase()}</div>
                <div>{description}</div>
              </div>
            )
          })}
        </div>
        <div>
          <div>Products</div>
        </div>
      </div>
    )
  })
}

export default Results
