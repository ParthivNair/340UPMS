import React, { useState } from "react";

const initialUnitMaintenanceRequests = [
  {
    unitID: 101,
    requestID: 1,
  },
  {
    unitID: 102,
    requestID: 2,
  },
];

const UnitMaintenanceRequests = () => {
  const [unitMaintenanceRequests, setUnitMaintenanceRequests] = useState(
    initialUnitMaintenanceRequests
  );

  return (
    <div className="card">
      <h1>Unit Maintenance Requests</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Unit ID</th>
            <th>Request ID</th>
          </tr>
        </thead>
        <tbody>
          {unitMaintenanceRequests.map((request, index) => (
            <tr key={index}>
              <td>{request.unitID}</td>
              <td>{request.requestID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnitMaintenanceRequests;
