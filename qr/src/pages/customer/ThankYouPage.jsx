import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎉 Thank You! 🎉</h1>
      <p>Your order has been placed successfully.</p>
      <p>We'll start preparing it right away!</p>
      <Link to="/">Back to Menu</Link>
    </div>
  );
};

export default ThankYouPage;