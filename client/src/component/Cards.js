// Card.js
import React, { useState } from 'react';
import { FaHome, FaCreditCard, FaUniversity, FaMoneyCheckAlt } from 'react-icons/fa';

const Card = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="card">
      <div className="banking-solutions">
        <h2>Popular banking solutions</h2>
        <p>We’re here to make banking simpler and easier with our popular products, special offers, and helpful calculators.</p>
        <div className="tabs">
          <button className={`tab ${activeTab === "personal" ? "active" : ""}`} onClick={() => handleTabClick("personal")}>Personal</button>
          <button className={`tab ${activeTab === "business" ? "active" : ""}`} onClick={() => handleTabClick("business")}>Business</button>
        </div>
        {activeTab === "personal" ? (
          <div className="content">
            <div className="section">
              <h3><FaHome /> Home loans</h3>
              <ul>
                <li>Book an appointment</li>
                <li>Offers</li>
                <li>How much can I borrow?</li>
              </ul>
            </div>
            <div className="section">
              <h3><FaCreditCard /> Credit cards</h3>
              <ul>
                <li>Help me choose a credit card</li>
                <li>Compare credit cards</li>
                <li>Credit card balance transfers</li>
              </ul>
            </div>
            
            <div className="section">
              <h3><FaMoneyCheckAlt /> Personal loans</h3>
              <ul>
                <li>Borrowing power calculator</li>
                <li>Loan repayment calculator</li>
                <li>Debt consolidation calculator</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="content">
            <div className="section">
              <h3><FaMoneyCheckAlt /> Loans and finance</h3>
              <ul>
                <li>Business loans</li>
                <li>Business overdrafts</li>
                <li>Vehicle and equipment finance</li>
              </ul>
            </div>
            <div className="section">
              <h3><FaCreditCard /> Business cards</h3>
              <ul>
                <li>Business credit card benefits</li>
                <li>Compare business credit cards</li>
                <li>Manage your credit card</li>
              </ul>
            </div>
           
            <div className="section">
              <h3><FaMoneyCheckAlt /> Merchant services</h3>
              <ul>
                <li>Accepting payments in person</li>
                <li>eCommerce and online payments</li>
                <li>Merchant support centre</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
