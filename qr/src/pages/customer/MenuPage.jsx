import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tableNumber = searchParams.get('tableId');

  useEffect(() => {
    // Fetch available menu items when the component loads
    apiClient.get('/menu/available')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const addToCart = (itemId) => {
    setCart(prevCart => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  const handlePlaceOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setIsModalOpen(true);
  };
  
  const confirmOrder = (e) => {
    e.preventDefault();
    const orderDetails = {
      tableNumber,
      customerName,
      customerPhone,
      notes,
      items: Object.keys(cart).map(itemId => ({
        menuItemId: Number(itemId),
        quantity: cart[itemId],
      })),
    };
    
    apiClient.post('/orders/place', orderDetails)
      .then(() => navigate('/thank-you'))
      .catch(error => console.error('Error placing order:', error));
  };
  
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="container">
      <h1>SH Cafe Menu (Table: {tableNumber || 'N/A'})</h1>
      
      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Cart ({totalItems} items)</h2>
        <button onClick={handlePlaceOrder} disabled={totalItems === 0}>
          Place Order
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Your Order</h2>
            <form onSubmit={confirmOrder}>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required 
              />
              <input 
                type="tel" 
                placeholder="Your Phone Number" 
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required 
              />
              <textarea 
                placeholder="Any special notes for the kitchen?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;