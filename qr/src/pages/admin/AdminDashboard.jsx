import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      apiClient.get('/orders')
        .then(response => setOrders(response.data))
        .catch(error => console.error('Error fetching orders:', error));
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // This is our new print function
  const handlePrintClick = (order) => {
    // 1. Save the order data to the browser's local storage
    localStorage.setItem('orderToPrint', JSON.stringify(order));
    
    // 2. Open our new '/print' page in a new tab
    window.open('/print', '_blank');
  };

  return (
    <div>
      <h2>Live Orders</h2>
      <div className={styles.ordersList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <h3>Order #{order.id} - Table: {order.tableNumber}</h3>
            <p><strong>Customer:</strong> {order.customerName} ({order.customerPhone})</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.quantity} x {item.menuItem.name}
                </li>
              ))}
            </ul>
            <button onClick={() => handlePrintClick(order)}>Print Bill</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;