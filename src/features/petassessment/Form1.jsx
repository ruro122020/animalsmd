import React, { useState } from "react";
import { usePetAssessment } from "../petassessment/context/PetAssessmentContext";
import { useNavigate } from "react-router-dom";
import form1Config from "./utils/formConfigs/form1Config";
import { useFormik } from "formik";
import useSpecies from "./hooks/useSpecies";
import { useAuth } from "../authentication/context/AuthContext";
import { Link } from "react-router-dom";
import { getData } from "../../services/api";

const Form1 = () => {
  const { setPetInfo } = usePetAssessment();
  const navigate = useNavigate();
  const { initialValues, formSchema, fields } = form1Config;
  const { species } = useSpecies();
  const { isLoggedIn } = useAuth();
  const [hasPet, setHasPet] = useState(false);

  const petExist = async (petName) => {
    const usersPets = await getData("api/user/pets");
    if (usersPets.status === "success") {
      const pet = usersPets.data.find(
        (pet) => pet.name === petName.toLowerCase()
      );
      if (pet) {
        setHasPet(true);
        return true;
      } else {
        return false;
      }
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!isLoggedIn) {
        // the onsubmit does not immediately halt the rest of the code execution.
        //So even though the navigation happens, the rest of the code still runs.
        //to avoid this, the return stops the rest of the code from executing
        navigate("/login");
        return;
      }
      const doesExist = await petExist(values.name);
      if (!doesExist) {
        setPetInfo(values);
        resetForm();
        navigate("/pet-assessment/form2");
      }
    },
  });

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
      <div style={{ textAlign: "center" }}>
        {fields.map(({ label, name, type }) => (
          <div key={name}>
            <label>
              <span>{label}</span>
            </label>
            <div>
              <input
                type={type}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        ))}
        <div>
          <label htmlFor="pet-select">
            <span>Animal Type: </span>
          </label>
          <select
            id="pet-select"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <option value="">--Please choose an option--</option>
            {species.map((type_name) => {
              return (
                <option key={type_name} value={type_name}>
                  {type_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <button type="Submit">
          <span>Next</span>
        </button>
      </div>
    </form>
  );
};

export default Form1;
