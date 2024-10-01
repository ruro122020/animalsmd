import React from "react";

const MedicationCard = ({ medication }) => {
  return (
    <div sx={{ paddingTop: "12px" }}>
      <h5>{medication.name.toUpperCase()}</h5>
      <p>{medication.description}</p>
    </div>
  );
};

export default MedicationCard;
