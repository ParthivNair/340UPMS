import React, { useState } from "react";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const initialRequests = [
  {
    requestID: 1,
    description: "Leaky faucet in kitchen",
    status: "Pending",
    submissionDate: "2025-01-15 10:00:00",
    completionDate: null,
  },
  {
    requestID: 2,
    description: "Broken window in living room",
    status: "Completed",
    submissionDate: "2025-02-05 12:00:00",
    completionDate: "2025-02-06 14:30:00",
  },
];

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [showModal, setShowModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const maintenanceFields = [
    { name: "description", label: "Description", type: "text", required: true },
    { name: "status", label: "Status", type: "text", required: true },
    {
      name: "submissionDate",
      label: "Submission Date",
      type: "text",
      required: true,
    },
    {
      name: "completionDate",
      label: "Completion Date",
      type: "text",
      required: false,
    },
  ];

  const handleAddOrUpdateRequest = (formData) => {
    if (editingRequest) {
      setRequests(
        requests.map((req) =>
          req.requestID === editingRequest.requestID
            ? { ...req, ...formData }
            : req
        )
      );
    } else {
      const newRequest = { requestID: Date.now(), ...formData };
      setRequests([...requests, newRequest]);
    }
    setShowModal(false);
    setEditingRequest(null);
  };

  const handleEditRequest = (request) => {
    setEditingRequest(request);
    setShowModal(true);
  };

  const handleDeleteRequest = (id) => {
    setRequests(requests.filter((req) => req.requestID !== id));
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
        <h2 style={{ marginBottom: "10px" }}>
          {editingRequest ? "Edit Request" : "New Maintenance Request"}
        </h2>
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
              <td>{req.completionDate || "N/A"}</td>
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
