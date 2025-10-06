import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import styles from './AdminMenuManagement.module.css';

const AdminMenuManagementPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({ name: '', description: '', price: '', category: '' });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = () => {
    apiClient.get('/menu/all')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu items:', error));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing 
      ? apiClient.put(`/menu/${currentItem.id}`, currentItem)
      : apiClient.post('/menu', currentItem);
      
    request.then(() => {
      fetchMenuItems();
      resetForm();
    }).catch(error => console.error('Error saving menu item:', error));
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentItem(item);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      apiClient.delete(`/menu/${id}`)
        .then(fetchMenuItems)
        .catch(error => console.error('Error deleting menu item:', error));
    }
  };

  const toggleAvailability = (id) => {
    apiClient.put(`/menu/${id}/availability`)
      .then(fetchMenuItems)
      .catch(error => console.error('Error toggling availability:', error));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentItem({ name: '', description: '', price: '', category: '' });
  };

// AdminMenuManagementPage.jsx return statement

return (
  <div>
    <h2>Menu Management</h2>
    <div className={styles.formContainer}> {/* Corrected and Renamed */}
      <h3>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={currentItem.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="category" value={currentItem.category} onChange={handleInputChange} placeholder="Category" required />
        <textarea name="description" value={currentItem.description} onChange={handleInputChange} placeholder="Description" required />
        <input type="number" name="price" value={currentItem.price} onChange={handleInputChange} placeholder="Price" step="0.01" required />
        <button type="submit">{isEditing ? 'Update Item' : 'Add Item'}</button>
        {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
    </div>

    <div className={styles.tableContainer}> {/* Corrected */}
      <h3>Existing Items</h3>
      <table>
        {/* Table Head stays the same */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                {/* The switch CSS is complex, this structure works with the provided CSS */}
                <label className="switch">
                  <input type="checkbox" checked={item.available} onChange={() => toggleAvailability(item.id)} />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
};

export default AdminMenuManagementPage;