import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties/*" element={<Properties />} />
            <Route path="/units" element={<Units />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route
              path="/maintenance-requests"
              element={<MaintenanceRequests />}
            />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
