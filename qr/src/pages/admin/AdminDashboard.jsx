import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders and refresh every 10 seconds
    const fetchOrders = () => {
      apiClient.get('/orders')
        .then(response => setOrders(response.data))
        .catch(error => console.error('Error fetching orders:', error));
    };
    
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Poll for new orders

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Live Orders</h2>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id} - Table: {order.tableNumber}</h3>
            <p><strong>Customer:</strong> {order.customerName} ({order.customerPhone})</p>
            <p><strong>Time:</strong> {new Date(order.orderTime).toLocaleTimeString()}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.quantity} x {item.menuItem.name}
                </li>
              ))}
            </ul>
            {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;