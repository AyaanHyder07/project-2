import React, { useEffect, useState } from 'react';
import Bill from '../../components/admin/Bill';

const PrintPage = () => {
  const [order, setOrder] = useState(null);

  // This effect runs once when the page loads
  useEffect(() => {
    // 1. Get the order data we saved in the dashboard
    const orderData = localStorage.getItem('orderToPrint');
    
    if (orderData) {
      setOrder(JSON.parse(orderData));
      
      // 2. Give React a moment to render the bill, then trigger print
      setTimeout(() => {
        window.print(); // This opens the browser's print dialog
      }, 500); // 500ms delay

      // 3. Clean up the stored data
      localStorage.removeItem('orderToPrint');
    }
  }, []);

  if (!order) {
    return <p>Loading bill...</p>;
  }

  // We don't use a ref here anymore, Bill is a regular component
  return <Bill order={order} />;
};

export default PrintPage;