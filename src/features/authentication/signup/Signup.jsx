import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { postData } from "../../../services/api";
import { NavLink, useNavigate } from "react-router-dom";
import formConfig from "./formConfig";
import { useFormik } from "formik";

const Signup = () => {
  const { updateUser, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { initialValues, formSchema, fields } = formConfig;

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const responseUser = await postData("/api/signup", values);
      if (responseUser) {
        login();
        updateUser(responseUser);
        resetForm();
        navigate(-2);
        setError(false);
      } else {
        console.log("Something went wrong in signup.jsx submit function");
        setError(true);
      }
    },
  });
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={formik.handleSubmit}>
        {error && (
          <div style={{ color: "red", paddingBottom: "4px" }}>
            User Already Exist
          </div>
        )}

        {fields.map(({ label, name, type }) => (
          <div key={name}>
            {formik.touched[name] && formik.errors[name] && (
              <div>{formik.errors[name]}</div>
            )}
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
        <button type="submit">Submit</button>
      </form>
      <p>
        Already have an account?
        <NavLink to="/login">Login</NavLink>
      </p>
    </div>
  );
};

export default Signup;
