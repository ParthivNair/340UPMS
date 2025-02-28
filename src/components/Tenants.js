import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL = "http://localhost:8000/tenants/";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  const tenantFields = [
    { name: "first_name", label: "First Name", type: "text", required: true },
    { name: "last_name", label: "Last Name", type: "text", required: true },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    { name: "email", label: "Email", type: "email", required: true },
  ];

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get(API_URL);
      setTenants(response.data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  const handleAddOrUpdateTenant = async (formData) => {
    try {
      if (editingTenant) {
        await axios.put(`${API_URL}${editingTenant.tenant_id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingTenant(null);
      fetchTenants(); // Refresh tenant list
    } catch (error) {
      console.error("Error saving tenant:", error);
    }
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setShowModal(true);
  };

  const handleDeleteTenant = async (tenant_id) => {
    try {
      await axios.delete(`${API_URL}${tenant_id}`);
      fetchTenants();
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  return (
    <div className="card">
      <h1>Tenants</h1>
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setEditingTenant(null);
        }}
      >
        Add Tenant
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 style={{ marginBottom: "10px" }}>
          {editingTenant ? "Edit Tenant" : "New Tenant"}
        </h2>
        <UniversalForm
          fields={tenantFields}
          onSubmit={handleAddOrUpdateTenant}
          initialData={editingTenant}
        />
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.tenant_id}>
              <td>{tenant.tenant_id}</td>
              <td>{tenant.first_name}</td>
              <td>{tenant.last_name}</td>
              <td>{tenant.phone_number}</td>
              <td>{tenant.email}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditTenant(tenant)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTenant(tenant.tenant_id)}
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

export default Tenants;
