import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="sidebar-profile">
        <img
          src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
          alt="User Avatar"
        />
        <div className="sidebar-profile-name">
          <h4>Jefferson Roseburg</h4>
          <span>Sterling Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/">Overview</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/units">Units</Link>
        <Link to="/tenants">Tenants</Link>
        <Link to="/maintenance-requests">Maintenance</Link>
        <Link to="/leases">Leases</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/unit-maintenance-requests">UnitMaintenanceRequests</Link>
      </nav>
    </div>
  );
};

export default Navbar;
