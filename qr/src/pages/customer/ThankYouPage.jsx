import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ThankYouPage.module.css'; // 1. Import the new styles

const ThankYouPage = () => {
  return (
    // 2. Apply the 'container' style to the main div
    <div className={styles.container}>
      <h1>🎉 Thank You! 🎉</h1>
      <p>Your order has been placed successfully.</p>
      <p>We'll start preparing it right away!</p>
      
      {/* 3. Apply the 'homeLink' style to the Link component */}
      <Link to="/" className={styles.homeLink}>
        Back to Menu
      </Link>
    </div>
  );
};

export default ThankYouPage;