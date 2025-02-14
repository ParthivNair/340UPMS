import React, { useState } from "react";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const initialProperties = [
  {
    propertyID: 1,
    address: "123 Oak St",
    city: "Eugene",
    state: "OR",
    zipCode: "97401",
    propertyValue: 250000.0,
  },
  {
    propertyID: 2,
    address: "456 Maple Ave",
    city: "Corvallis",
    state: "OR",
    zipCode: "97330",
    propertyValue: 320000.0,
  },
];

const Properties = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const propertyFields = [
    { name: "address", label: "Address", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "state", label: "State", type: "text", required: true },
    { name: "zipCode", label: "Zip Code", type: "text", required: true },
    {
      name: "propertyValue",
      label: "Property Value",
      type: "number",
      required: true,
    },
  ];

  const handleAddOrUpdateProperty = (formData) => {
    if (editingProperty) {
      setProperties(
        properties.map((prop) =>
          prop.propertyID === editingProperty.propertyID
            ? { ...prop, ...formData }
            : prop
        )
      );
    } else {
      const newProperty = {
        propertyID: Date.now(),
        ...formData,
        propertyValue: parseFloat(formData.propertyValue),
      };
      setProperties([...properties, newProperty]);
    }
    setShowModal(false);
    setEditingProperty(null);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter((prop) => prop.propertyID !== id));
  };

  return (
    <div className="card">
      <h1>Properties</h1>
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setEditingProperty(null);
        }}
      >
        Add Property
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 style={{ marginBottom: "10px" }}>
          {editingProperty ? "Edit Property" : "New Property"}
        </h2>
        <UniversalForm
          fields={propertyFields}
          onSubmit={handleAddOrUpdateProperty}
          initialData={editingProperty}
        />
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>ZipCode</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.propertyID}>
              <td>{prop.propertyID}</td>
              <td>{prop.address}</td>
              <td>{prop.city}</td>
              <td>{prop.state}</td>
              <td>{prop.zipCode}</td>
              <td>${prop.propertyValue}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditProperty(prop)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProperty(prop.propertyID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Properties;
