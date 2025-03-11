import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL =
  "http://classwork.engr.oregonstate.edu:4994/unit_maintenance_requests";

const UnitMaintenanceRequests = () => {
  const [associations, setAssociations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAssociation, setEditingAssociation] = useState(null);

  const umrFields = [
    { name: "unitID", label: "Unit ID", type: "number", required: true },
    { name: "requestID", label: "Request ID", type: "number", required: true },
  ];

  const fetchAssociations = async () => {
    try {
      const response = await axios.get(API_URL);
      setAssociations(response.data);
    } catch (error) {
      console.error("Error fetching associations:", error);
    }
  };

  useEffect(() => {
    fetchAssociations();
  }, []);

  const handleAddAssociation = async (formData) => {
    try {
      await axios.post(API_URL, {
        unitID: formData.unitID,
        requestID: formData.requestID,
      });
      setShowModal(false);
      setEditingAssociation(null);
      fetchAssociations();
    } catch (error) {
      console.error("Error adding association:", error);
    }
  };

  const handleDeleteAssociation = async (unitID, requestID) => {
    try {
      await axios.delete(API_URL, {
        params: { unitID: unitID, requestID: requestID },
      });
      fetchAssociations();
    } catch (error) {
      console.error("Error deleting association:", error);
    }
  };

  return (
    <div className="card">
      <h1>Unit Maintenance Requests</h1>
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setEditingAssociation(null);
        }}
      >
        Add Association
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>New Unit Maintenance Request Association</h2>
        <UniversalForm
          fields={umrFields}
          onSubmit={handleAddAssociation}
          initialData={editingAssociation}
        />
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>Unit ID</th>
            <th>Request ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {associations.map((assoc, index) => (
            <tr key={index}>
              <td>{assoc.unit_id}</td>
              <td>{assoc.request_id}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDeleteAssociation(assoc.unit_id, assoc.request_id)
                  }
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

export default UnitMaintenanceRequests;
