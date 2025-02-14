import React, { useState } from "react";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const initialTenants = [
  {
    tenantID: 1,
    firstName: "Daniel",
    lastName: "Johnson",
    phoneNumber: "541-123-4567",
    email: "dajohn@example.com",
    unitID: 1,
  },
  {
    tenantID: 2,
    firstName: "Tyrell",
    lastName: "Smith",
    phoneNumber: "541-234-5678",
    email: "tysmit@example.com",
    unitID: 3,
  },
];

const Tenants = () => {
  const [tenants, setTenants] = useState(initialTenants);
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
    { name: "unitID", label: "Unit ID", type: "number", required: true },
  ];

  const handleAddOrUpdateTenant = (formData) => {
    if (editingTenant) {
      setTenants(
        tenants.map((tenant) =>
          tenant.tenantID === editingTenant.tenantID
            ? { ...tenant, ...formData }
            : tenant
        )
      );
    } else {
      const newTenant = { tenantID: Date.now(), ...formData };
      setTenants([...tenants, newTenant]);
    }
    setShowModal(false);
    setEditingTenant(null);
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
    setShowModal(true);
  };

  const handleDeleteTenant = (id) => {
    setTenants(tenants.filter((tenant) => tenant.tenantID !== id));
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
            <th>Tenant ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Unit ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.tenantID}>
              <td>{tenant.tenantID}</td>
              <td>
                {tenant.firstName} {tenant.lastName}
              </td>
              <td>{tenant.phoneNumber}</td>
              <td>{tenant.email}</td>
              <td>{tenant.unitID}</td>
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
