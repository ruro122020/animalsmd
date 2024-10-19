import React from "react";
import { PetAssessmentProvider } from "../../petassessment/context/PetAssessmentContext";
import { Outlet } from "react-router-dom";

const PetAssessmentProviderLayer = () => {
  return (
    <PetAssessmentProvider>
      <div>
        <div>
          <h1>Pet Assessment</h1>
          <Outlet />
        </div>
      </div>
    </PetAssessmentProvider>
  );
};

export default PetAssessmentProviderLayer;
