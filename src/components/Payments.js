import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../common/Modal";
import UniversalForm from "../common/UniversalForm";

const API_URL = "http://classwork.engr.oregonstate.edu:4994/payments/";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  // Fields updated to match backend: leaseID, amount, paymentDate, paymentMethod
  const paymentFields = [
    { name: "tenantID", label: "Tenant ID", type: "number", required: true },
    { name: "leaseID", label: "Lease ID", type: "number", required: true },
    { name: "amount", label: "Amount", type: "number", required: true },
    {
      name: "paymentDate",
      label: "Payment Date",
      type: "date",
      required: true,
    },
    {
      name: "paymentMethod",
      label: "Payment Method",
      type: "text",
      required: true,
    },
  ];

  const fetchPayments = async () => {
    try {
      const response = await axios.get(API_URL);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleAddOrUpdatePayment = async (formData) => {
    try {
      if (editingPayment) {
        await axios.put(`${API_URL}${editingPayment.paymentID}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      setEditingPayment(null);
      fetchPayments();
    } catch (error) {
      console.error("Error saving payment:", error);
    }
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    setShowModal(true);
  };

  const handleDeletePayment = async (paymentID) => {
    try {
      await axios.delete(`${API_URL}${paymentID}`);
      fetchPayments();
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
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
        <h2>{editingPayment ? "Edit Payment" : "New Payment"}</h2>
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
              <td>{payment.amount}</td>
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
