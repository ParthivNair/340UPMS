import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL = "http://classwork.engr.oregonstate.edu:4994/properties/";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Updated fields to match backend: propertyName, address, city, state, zipCode
  const propertyFields = [
    { name: "address", label: "Address", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "state", label: "State", type: "text", required: true },
    { name: "zipCode", label: "Zip Code", type: "text", required: true },
    { name: "propertyValue", label: "Value", type: "number", required: true },
  ];

  const fetchProperties = async () => {
    try {
      const response = await axios.get(API_URL);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddOrUpdateProperty = async (formData) => {
    try {
      if (editingProperty) {
        await axios.put(`${API_URL}${editingProperty.propertyID}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingProperty(null);
      fetchProperties();
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleDeleteProperty = async (propertyID) => {
    try {
      await axios.delete(`${API_URL}${propertyID}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
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
        <h2>{editingProperty ? "Edit Property" : "New Property"}</h2>
        <UniversalForm
          fields={propertyFields}
          onSubmit={handleAddOrUpdateProperty}
          initialData={editingProperty}
        />
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
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
              <td>{prop.propertyValue}</td>
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
