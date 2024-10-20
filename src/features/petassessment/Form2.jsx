import React, { useState } from "react";
import { usePetAssessment } from "../petassessment/context/PetAssessmentContext";
import { postData } from "../../services/api";
import { useNavigate } from "react-router-dom";
import form2Config from "./utils/formConfigs/form2Config";
import { useFormik } from "formik";
import useSpeciesSymptoms from "./hooks/useSpeciesSymptoms";
import { Link } from "react-router-dom";

const Form2 = () => {
  const { petInfo, setPetInfo } = usePetAssessment();
  const navigate = useNavigate();
  const { symptoms, isLoading, error } = useSpeciesSymptoms(petInfo.type);
  const [hasPet, setHasPet] = useState(false);

  const postPetInfo = async (body) => {
    //POST PETINFO TO DATABASE
    const response = await postData("/api/user/pets", body);
    if (response.status === "success") {
      setPetInfo(response.data);
      navigate("/pet-assessment/results");
    } else if (response.status === "failed") {
      if (response.code === 409) {
        setHasPet(true);
      } else if (response.code === 400) {
        console.log(response.error);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      formik.setFieldValue(
        "symptoms",
        [...formik.values.symptoms, e.target.value],
        true
      );
    } else {
      formik.setFieldValue(
        "symptoms",
        formik.values.symptoms.filter((symptom) => symptom !== e.target.value),
        true
      );
    }
  };

  const formik = useFormik({
    initialValues: form2Config.initialValues,
    validationSchema: form2Config.formSchema,
    onSubmit: (values, { resetForm }) => {
      const pet = { ...petInfo, ...values };
      postPetInfo(pet);
      resetForm();
    },
  });

  if (isLoading) return <p>loading</p>;

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {hasPet && (
        <p>
          Pet already exist. Click <Link to="/user/dashboard">here</Link> to
          view pet.
        </p>
      )}
      <fieldset>
        <legend>Choose your pet's symptoms</legend>
        {formik.touched.symptoms && formik.errors.symptoms && (
          <div>{formik.errors.symptoms}</div>
        )}
        {symptoms.map((symptom) => (
          <div key={symptom}>
            <input
              type="checkbox"
              id={symptom}
              name={"symptom"}
              value={symptom}
              checked={formik.values.symptoms.includes(symptom)}
              onChange={handleChange}
            />
            <label htmlFor={symptom}>{symptom}</label>
          </div>
        ))}
      </fieldset>
      <div>
        <button type="Submit">Get Results</button>
      </div>
    </form>
  );
};

export default Form2;
