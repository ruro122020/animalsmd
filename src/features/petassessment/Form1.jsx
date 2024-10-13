import React from "react";
import { usePetAssessment } from "../petassessment/context/PetAssessmentContext";
import { useNavigate } from "react-router-dom";
import form1Config from "./utils/formConfigs/form1Config";
import { useFormik } from "formik";
import useSpecies from "./hooks/useSpecies";

const Form1 = () => {
  const { setPetInfo } = usePetAssessment();
  const navigate = useNavigate();
  const { initialValues, formSchema, fields } = form1Config;
  const { species } = useSpecies();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setPetInfo(values);
      resetForm();
      navigate("/pet-assessment/form2");
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
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
