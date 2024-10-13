import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postData } from "../../../services/api";
import formConfig from "./formConfig";
import { useFormik } from "formik";

const Login = () => {
  const [error, setError] = useState(false);
  const { login, updateUser, logout } = useAuth();
  let navigate = useNavigate();
  const { initialValue, formSchema, fields } = formConfig;

  // const formik = CustomFormik(initialValue, formSchema, handleSubmit)
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const responseUser = await postData("/api/login", values);
      if (responseUser) {
        login();
        updateUser(responseUser);
        resetForm();
        setError(false);
        //-1 means to redirect users to the previous page
        // navigate(-1);
        navigate("/user/dashboard");
      } else {
        logout();
        console.log("Something went wrong in login.jsx submit function");
        setError(true);
      }
    },
  });
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {error && (
          <div style={{ color: "red", paddingBottom: "4px" }}>
            Invalid Credentials
          </div>
        )}
        {fields.map(({ label, name, type }) => (
          <div key={name} style={{ paddingBottom: "12px" }}>
            {formik.touched[name] && formik.errors[name] && (
              <div>{formik.errors[name]}</div>
            )}
            <label>
              <span>{label}</span>
            </label>
            <input
              type={type}
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
            />
          </div>
        ))}
        <button type="Submit">Submit</button>
      </form>
      <p>
        Don't have an account?
        <NavLink to="/signup">Signup</NavLink>
      </p>
    </div>
  );
};

export default Login;
