import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL = "http://classwork.engr.oregonstate.edu:4994/tenants/";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  const tenantFields = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    {
      name: "phoneNumber",
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
      console.log(response.data);
      setTenants(response.data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  const handleAddOrUpdateTenant = async (formData) => {
    try {
      if (editingTenant) {
        await axios.put(`${API_URL}${editingTenant.tenantID}`, formData);
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
      console.log(`${API_URL}${tenant_id}`);
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
            <tr key={tenant.tenantID}>
              <td>{tenant.tenantID}</td>
              <td>{tenant.firstName}</td>
              <td>{tenant.lastName}</td>
              <td>{tenant.phoneNumber}</td>
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
                  onClick={() => handleDeleteTenant(tenant.tenantID)}
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
