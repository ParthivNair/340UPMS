import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL =
  "http://classwork.engr.oregonstate.edu:4994/maintenance_requests/";

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  // Updated fields: unitID, tenantID, description, status, submissionDate, completionDate
  const maintenanceFields = [
    { name: "description", label: "Description", type: "text", required: true },
    { name: "status", label: "Status", type: "text", required: true },
    {
      name: "submissionDate",
      label: "Submission Date",
      type: "date",
      required: true,
    },
    {
      name: "completionDate",
      label: "Completion Date",
      type: "date",
      required: false,
    },
  ];

  const fetchRequests = async () => {
    try {
      const response = await axios.get(API_URL);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAddOrUpdateRequest = async (formData) => {
    try {
      if (editingRequest) {
        await axios.put(`${API_URL}${editingRequest.requestID}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingRequest(null);
      fetchRequests();
    } catch (error) {
      console.error("Error saving maintenance request:", error);
    }
  };

  const handleEditRequest = (request) => {
    setEditingRequest(request);
    setShowModal(true);
  };

  const handleDeleteRequest = async (requestID) => {
    try {
      await axios.delete(`${API_URL}${requestID}`);
      fetchRequests();
    } catch (error) {
      console.error("Error deleting maintenance request:", error);
    }
  };

  return (
    <div className="card">
      <h1>Maintenance Requests</h1>
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setEditingRequest(null);
        }}
      >
        Add Request
      </button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>{editingRequest ? "Edit Request" : "New Maintenance Request"}</h2>
        <UniversalForm
          fields={maintenanceFields}
          onSubmit={handleAddOrUpdateRequest}
          initialData={editingRequest}
        />
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Submission Date</th>
            <th>Completion Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.requestID}>
              <td>{req.requestID}</td>
              <td>{req.description}</td>
              <td>{req.status}</td>
              <td>{req.submissionDate}</td>
              <td>{req.completionDate}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditRequest(req)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteRequest(req.requestID)}
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

export default MaintenanceRequests;
