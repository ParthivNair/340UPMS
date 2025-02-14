import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";

import Dashboard from "./components/Dashboard";
import Properties from "./components/Properties";
import Units from "./components/Units";
import Tenants from "./components/Tenants";
import MaintenanceRequests from "./components/MaintenanceRequests";
import Payments from "./components/Payments";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/340UPMS/" element={<Dashboard />} />
            <Route path="/340UPMS/properties/*" element={<Properties />} />
            <Route path="/340UPMS/units" element={<Units />} />
            <Route path="/340UPMS/tenants" element={<Tenants />} />
            <Route
              path="/340UPMS/maintenance-requests"
              element={<MaintenanceRequests />}
            />
            <Route path="/340UPMS/payments" element={<Payments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
