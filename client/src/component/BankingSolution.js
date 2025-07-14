// BankingSolutions.js
import React from 'react';
import { FaShieldAlt, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';


const BankingSolutions = () => {
  return (
    <div className="banking-solutions">
      <h2>Want safe and convenient banking? <br /> <span className="highlight">We've got you.</span></h2>
      <div className="solutions-container">
        <div className="solution">
          <FaShieldAlt className="icon" />
          <p>We’ll check the BSB and Account details of new payees and alert you to potential scams or incorrect details with <strong>Westpac Verify</strong>.</p>
        </div>
        <div className="solution">
          <FaCreditCard className="icon" />
          <p>Access a <strong>digital version of your card</strong> through the Westpac App. The dynamic CVC changes every 24 hours – making your card details even more secure.</p>
        </div>
        <div className="solution">
          <FaMoneyBillWave className="icon" />
          <p>With <strong>Our largest ATM network</strong> a fee free cash withdrawal is never far away.</p>
        </div>
      </div>
    </div>
  );
};

export default BankingSolutions;
