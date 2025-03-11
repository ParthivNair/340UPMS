import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL = "http://classwork.engr.oregonstate.edu:4994/leases/";

const Leases = () => {
  const [leases, setLeases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLease, setEditingLease] = useState(null);

  // Fields now match backend: unitID, tenantID, startDate, endDate, rent
  const leaseFields = [
    { name: "unitID", label: "Unit ID", type: "number", required: true },
    { name: "tenantID", label: "Tenant ID", type: "number", required: true },
    { name: "startDate", label: "Start Date", type: "date", required: true },
    { name: "endDate", label: "End Date", type: "date", required: true },
    { name: "rentPrice", label: "Rent", type: "number", required: true },
  ];

  const fetchLeases = async () => {
    try {
      const response = await axios.get(API_URL);
      setLeases(response.data);
    } catch (error) {
      console.error("Error fetching leases:", error);
    }
  };

  useEffect(() => {
    fetchLeases();
  }, []);

  const handleAddOrUpdateLease = async (formData) => {
    try {
      console.log(API_URL, formData);
      if (editingLease) {
        await axios.put(`${API_URL}${editingLease.leaseID}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingLease(null);
      fetchLeases();
    } catch (error) {
      console.error("Error saving lease:", error);
    }
  };

  const handleEditLease = (lease) => {
    setEditingLease(lease);
    setShowModal(true);
  };

  const handleDeleteLease = async (leaseID) => {
    try {
      await axios.delete(`${API_URL}${leaseID}`);
      fetchLeases();
    } catch (error) {
      console.error("Error deleting lease:", error);
    }
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
            <th>Rent</th>
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
