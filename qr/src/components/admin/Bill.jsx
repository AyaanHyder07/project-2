import React from 'react';
import styles from './Bill.module.css';

// We forward the ref to the component so react-to-print can grab it
const Bill = React.forwardRef(({ order }, ref) => {

  if (!order) {
    return null;
  }

  const subtotal = order.items.reduce((sum, item) => {
    return sum + (item.quantity * item.menuItem.price);
  }, 0);

  const tax = subtotal * 0.05; // 5% tax, for example
  const total = subtotal + tax;

  return (
    <div ref={ref} className={styles.billContainer}>
      <div className={styles.header}>
        <h2>SH Cafe</h2>
        <p>Thank you for your visit!</p>
      </div>
      <div className={styles.details}>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Table:</strong> {order.tableNumber}</p>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Date:</strong> {new Date(order.orderTime).toLocaleString()}</p>
      </div>
      <table className={styles.itemsTable}>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(item => (
            <tr key={item.id}>
              <td>{item.quantity}</td>
              <td>{item.menuItem.name}</td>
              <td>${(item.quantity * item.menuItem.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.totals}>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>Tax (5%):</strong> ${tax.toFixed(2)}</p>
        <p className={styles.grandTotal}><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>
      <div className={styles.footer}>
        <p>Come Again!</p>
      </div>
    </div>
  );
});

export default Bill;