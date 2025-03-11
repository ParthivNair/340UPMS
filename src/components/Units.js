import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL = "http://classwork.engr.oregonstate.edu:4994/units/";

const Units = () => {
  const [units, setUnits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  // Updated fields to match backend: propertyID, unitNumber, floor, bedrooms, bathrooms
  const unitFields = [
    {
      name: "propertyID",
      label: "Property ID",
      type: "number",
      required: true,
    },
    { name: "unitNumber", label: "Unit Number", type: "text", required: true },
    { name: "unitType", label: "Unit Type", type: "text", required: true },
    { name: "status", label: "Status", type: "text", required: true },
  ];

  const fetchUnits = async () => {
    try {
      const response = await axios.get(API_URL);
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleAddOrUpdateUnit = async (formData) => {
    try {
      if (editingUnit) {
        await axios.put(`${API_URL}${editingUnit.unitID}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingUnit(null);
      fetchUnits();
    } catch (error) {
      console.error("Error saving unit:", error);
    }
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setShowModal(true);
  };

  const handleDeleteUnit = async (unitID) => {
    try {
      await axios.delete(`${API_URL}${unitID}`);
      fetchUnits();
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  return (
    <div className="card">
      <h1>Units</h1>
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setEditingUnit(null);
        }}
      >
        Add Unit
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>{editingUnit ? "Edit Unit" : "New Unit"}</h2>
        <UniversalForm
          fields={unitFields}
          onSubmit={handleAddOrUpdateUnit}
          initialData={editingUnit}
        />
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>Unit ID</th>
            <th>Property ID</th>
            <th>Unit Number</th>
            <th>Unit Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.unitID}>
              <td>{unit.unitID}</td>
              <td>{unit.propertyID}</td>
              <td>{unit.unitNumber}</td>
              <td>{unit.unitType}</td>
              <td>{unit.status}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditUnit(unit)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUnit(unit.unitID)}
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

export default Units;
