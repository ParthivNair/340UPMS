import React, { useState } from "react";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const initialPayments = [
  {
    paymentID: 1,
    tenantID: 1,
    leaseID: 1,
    amount: 1200.0,
    paymentDate: "2025-02-01 08:00:00",
    paymentMethod: "Credit Card",
  },
  {
    paymentID: 2,
    tenantID: 2,
    leaseID: 2,
    amount: 900.0,
    paymentDate: "2025-02-01 08:30:00",
    paymentMethod: "Bank Transfer",
  },
];

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const paymentFields = [
    { name: "tenantID", label: "Tenant ID", type: "number", required: true },
    { name: "leaseID", label: "Lease ID", type: "number", required: true },
    { name: "amount", label: "Amount", type: "number", required: true },
    {
      name: "paymentDate",
      label: "Payment Date",
      type: "text",
      required: true,
    },
    {
      name: "paymentMethod",
      label: "Payment Method",
      type: "text",
      required: true,
    },
  ];

  const handleAddOrUpdatePayment = (formData) => {
    if (editingPayment) {
      setPayments(
        payments.map((payment) =>
          payment.paymentID === editingPayment.paymentID
            ? { ...payment, ...formData }
            : payment
        )
      );
    } else {
      const newPayment = { paymentID: Date.now(), ...formData };
      setPayments([...payments, newPayment]);
    }
    setShowModal(false);
    setEditingPayment(null);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setShowModal(true);
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter((payment) => payment.paymentID !== id));
  };

  return (
    <div className="card">
      <h1>Payments</h1>
      <button
        className="button"
        onClick={() => {
          setShowModal(true);
          setEditingPayment(null);
        }}
      >
        Add Payment
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 style={{ marginBottom: "10px" }}>
          {editingPayment ? "Edit Payment" : "New Payment"}
        </h2>
        <UniversalForm
          fields={paymentFields}
          onSubmit={handleAddOrUpdatePayment}
          initialData={editingPayment}
        />
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Tenant ID</th>
            <th>Lease ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentID}>
              <td>{payment.paymentID}</td>
              <td>{payment.tenantID}</td>
              <td>{payment.leaseID}</td>
              <td>${payment.amount}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.paymentMethod}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditPayment(payment)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePayment(payment.paymentID)}
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

export default Payments;
