import React, { useState } from "react";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const initialUnits = [
  {
    unitID: 1,
    propertyID: 1,
    unitNumber: "101",
    unitType: "1BHK",
    status: "Occupied",
  },
  {
    unitID: 2,
    propertyID: 1,
    unitNumber: "102",
    unitType: "2BHK",
    status: "Vacant",
  },
  {
    unitID: 3,
    propertyID: 2,
    unitNumber: "201",
    unitType: "Studio",
    status: "Occupied",
  },
];

const Units = () => {
  const [units, setUnits] = useState(initialUnits);
  const [showModal, setShowModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

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

  const handleAddOrUpdateUnit = (formData) => {
    if (editingUnit) {
      setUnits(
        units.map((unit) =>
          unit.unitID === editingUnit.unitID ? { ...unit, ...formData } : unit
        )
      );
    } else {
      const newUnit = { unitID: Date.now(), ...formData };
      setUnits([...units, newUnit]);
    }
    setShowModal(false);
    setEditingUnit(null);
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setShowModal(true);
  };

  const handleDeleteUnit = (id) => {
    setUnits(units.filter((unit) => unit.unitID !== id));
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
        <h2 style={{ marginBottom: "10px" }}>
          {editingUnit ? "Edit Unit" : "New Unit"}
        </h2>
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
