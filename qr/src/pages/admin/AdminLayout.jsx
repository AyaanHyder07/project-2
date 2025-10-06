import React from 'react';
// 👇 All imports from 'react-router-dom' are combined into this single line
import { Outlet, NavLink } from 'react-router-dom';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <h1>SH Cafe - Admin Panel</h1>
        <nav>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/menu-management">Menu Management</NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;