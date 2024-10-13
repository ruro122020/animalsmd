import React, { useState } from "react";
import Pets from "./components/Pets";
import EditForm from "./components/EditForm";

const Dashboard = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [pet, setPet] = useState(null);

  return (
    <div>
      {/*
       * This section are suppose to be tabs for users to switch between pets, medication, pet history, etc
       */}
      <div>
        <div>
          <button>Pets</button>
          <button>Medications</button>
        </div>
      </div>
      {/************************************************************** */}
      <div>
        {showEditForm && (
          <EditForm
            pet={pet}
            setShowEditForm={setShowEditForm}
            setPet={setPet}
          />
        )}

        {/**Here we are rending a list of the users pets for the pets tab */}

        <Pets
          setShowEditForm={setShowEditForm}
          setPet={setPet}
          updatedPet={pet}
        />
      </div>

      {/***Here we will render the medications for the medications tab
       * Create a Medications component and pass as props the pets medication
       */}
    </div>
  );
};

export default Dashboard;
