import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>SH Cafe - Admin Panel</h1>
        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/menu-management">Menu Management</Link>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
    </div>
  );
};

export default AdminLayout;