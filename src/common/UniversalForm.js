import React, { useState, useEffect } from "react";

const UniversalForm = ({ fields, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // If initialData exists, use it; otherwise, create an empty form structure
    const initialState = fields.reduce((acc, field) => {
      acc[field.name] = initialData ? initialData[field.name] : "";
      return acc;
    }, {});
    setFormData(initialState);
  }, [fields, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            placeholder={field.placeholder || ""}
            required={field.required}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      ))}

      <button
        type="submit"
        style={{
          backgroundColor: "#1677ff",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {initialData ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default UniversalForm;
