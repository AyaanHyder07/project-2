import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/customer/MenuPage';
import ThankYouPage from './pages/customer/ThankYouPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenuManagementPage from './pages/admin/AdminMenuManagementPage';
import './index.css'; // Assuming you have some global styles

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<MenuPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="menu-management" element={<AdminMenuManagementPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;