import React from "react";
import editFormConfig from "./editFormConfig";
import { updateData } from "../../api";
import { useFormik } from "formik";

const EditForm = ({ pet, setShowEditForm, setPet }) => {
  const { formSchema, fields } = editFormConfig;
  const initialValues = {
    name: pet.name,
    age: pet.age,
    weight: pet.weight,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      //need to create route to update pets in database
      const updatedPet = await updateData(`/api/user/pets/${pet.id}`, values);
      //update pet in frontend
      if (updatedPet) {
        const { name, age, weight } = updatedPet;
        setPet({ ...pet, name: name, age: age, weight: weight });
        resetForm();
        setShowEditForm(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        {fields.map(({ label, name, type }) => (
          <div key={label}>
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "12px",
        }}
      >
        <div style={{ paddingRight: "12px" }}>
          <button type="Submit">Submit</button>
        </div>
        <button onClick={() => setShowEditForm(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditForm;
