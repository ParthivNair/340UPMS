import React, { useState } from "react";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const initialLeases = [
  {
    leaseID: 1,
    unitID: 101,
    tenantID: 1,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    rentPrice: 1500,
  },
  {
    leaseID: 2,
    unitID: 102,
    tenantID: 2,
    startDate: "2025-02-01",
    endDate: "2026-01-31",
    rentPrice: 1700,
  },
];

const Leases = () => {
  const [leases, setLeases] = useState(initialLeases);
  const [showModal, setShowModal] = useState(false);
  const [editingLease, setEditingLease] = useState(null);

  const leaseFields = [
    { name: "unitID", label: "Unit ID", type: "number", required: true },
    { name: "tenantID", label: "Tenant ID", type: "number", required: true },
    { name: "startDate", label: "Start Date", type: "date", required: true },
    { name: "endDate", label: "End Date", type: "date", required: true },
    { name: "rentPrice", label: "Rent Price", type: "number", required: true },
  ];

  const handleAddOrUpdateLease = (formData) => {
    if (editingLease) {
      setLeases(
        leases.map((lease) =>
          lease.leaseID === editingLease.leaseID
            ? { ...lease, ...formData }
            : lease
        )
      );
    } else {
      const newLease = { leaseID: Date.now(), ...formData };
      setLeases([...leases, newLease]);
    }
    setShowModal(false);
    setEditingLease(null);
  };

  const handleEditLease = (lease) => {
    setEditingLease(lease);
    setShowModal(true);
  };

  const handleDeleteLease = (id) => {
    setLeases(leases.filter((lease) => lease.leaseID !== id));
  };

  return (
    <div className="card">
      <h1>Leases</h1>
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setEditingLease(null);
        }}
      >
        Add Lease
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>{editingLease ? "Edit Lease" : "New Lease"}</h2>
        <UniversalForm
          fields={leaseFields}
          onSubmit={handleAddOrUpdateLease}
          initialData={editingLease}
        />
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>Lease ID</th>
            <th>Unit ID</th>
            <th>Tenant ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Rent Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leases.map((lease) => (
            <tr key={lease.leaseID}>
              <td>{lease.leaseID}</td>
              <td>{lease.unitID}</td>
              <td>{lease.tenantID}</td>
              <td>{lease.startDate}</td>
              <td>{lease.endDate}</td>
              <td>{lease.rentPrice}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditLease(lease)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteLease(lease.leaseID)}
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

export default Leases;
