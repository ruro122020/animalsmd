import React, { useRef, useState } from "react";
import { PetAssessmentProvider } from "../../petassessment/context/PetAssessmentContext";
import { Outlet } from "react-router-dom";

const PetAssessmentProviderLayer = () => {
  const [isLoading, setIsLoading] = useState(null);
  return (
    <PetAssessmentProvider>
      <div>
        <div>
          <h1>Pet Assessment</h1>
          <Outlet context={[isLoading, setIsLoading]} />
        </div>
      </div>
    </PetAssessmentProvider>
  );
};

export default PetAssessmentProviderLayer;
