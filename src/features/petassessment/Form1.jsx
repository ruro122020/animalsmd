import React, { useState, useEffect, useRef } from "react";
import { getData } from "../../services/api";
import { usePetAssessment } from "../petassessment/context/PetAssessmentContext";
import { useNavigate } from "react-router-dom";
import form1Config from "./utils/formConfigs/form1Config";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";

const Form1 = () => {
  const [species, setSpecies] = useState([]);
  const { setPetInfo } = usePetAssessment();
  const navigate = useNavigate();
  const { initialValues, formSchema, fields } = form1Config;
  const [isLoading, setIsLoading] = useOutletContext();

  //Fetches species list
  useEffect(() => {
    const getSpecies = async () => {
      const species = await getData("/api/species");
      console.log("species", species);
      if (species) {
        const speciesList = species.map((obj) => {
          //capitalize the first letter of each species name
          const splitTypeName = obj.type_name.split(" ");
          const reformatWord = splitTypeName.map((word) => {
            const capLetter = word.slice(0, 1).toUpperCase();
            const restOfWord = word.slice(1);
            return capLetter + restOfWord;
          });
          //return the species name with first letter being capitalized
          return reformatWord.join(" ");
        });

        setSpecies(speciesList);
      } else {
        console.log("species is false, please check api file");
      }
    };
    getSpecies();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setPetInfo(values);
      resetForm();
      setIsLoading(true);
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
