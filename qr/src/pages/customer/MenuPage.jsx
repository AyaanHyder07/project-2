import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import styles from "./MenuPage.module.css";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tableNumber = searchParams.get("tableId");

  useEffect(() => {
    apiClient
      .get("/menu/available")
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const menuByCategory = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, [menuItems]);

  const handleQuantityChange = (itemId, delta) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[itemId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [itemId]: newQuantity };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const totalPrice = Object.keys(cart).reduce((total, itemId) => {
    const item = menuItems.find((mi) => mi.id.toString() === itemId);
    const itemPrice = item ? item.price : 0;
    return total + itemPrice * cart[itemId];
  }, 0);

  const handlePlaceOrder = () => {
    if (totalItems === 0) {
      alert("Your cart is empty!");
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
      items: Object.keys(cart).map((itemId) => ({
        menuItemId: Number(itemId),
        quantity: cart[itemId],
      })),
    };

    apiClient
      .post("/orders/place", orderDetails)
      .then(() => navigate("/thank-you"))
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>SH Cafe</h1>
      </header>
      <div className={styles.tableInfo}>
        <p>Table: {tableNumber || "N/A"}</p>
      </div>

      {Object.keys(menuByCategory).map((category) => (
        <section key={category} className={styles.categorySection}>
          <h2>{category}</h2>
          <div className={styles.menuGrid}>
            {menuByCategory[category].map((item) => {
              const quantityInCart = cart[item.id] || 0;
              return (
                <div key={item.id} className={styles.menuItemCard}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className={styles.price}>
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </p>

                  {quantityInCart === 0 ? (
                    <button
                      className={styles.addBtn}
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      Add
                    </button>
                  ) : (
                    <div className={styles.quantityControl}>
                      <button onClick={() => handleQuantityChange(item.id, -1)}>
                        −
                      </button>
                      <span>{quantityInCart}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {totalItems > 0 && (
        <div className={styles.cartFab} onClick={handlePlaceOrder}>
          <span>🛒 Order ({totalItems})</span>
        </div>
      )}

      {/* --- THIS IS THE CRUCIAL SECTION --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirm Your Order</h2>

            {/* 👇 This part renders the list of items */}
            <div className={styles.orderSummary}>
              <h3>Order Summary</h3>
              <ul>
                {Object.keys(cart).map((itemId) => {
                  const item = menuItems.find(
                    (mi) => mi.id.toString() === itemId
                  );
                  if (!item) return null;
                  return (
                    <li key={item.id}>
                      <span>
                        {item.name} (x{cart[itemId]})
                      </span>
                      <span>${(item.price * cart[itemId]).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>
              <hr />
              <p className={styles.totalPrice}>
                <strong>Total:</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
              </p>
            </div>

            {/* 👇 This form takes the customer's details */}
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
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Back to Menu
                </button>
                <button type="submit">Place Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
