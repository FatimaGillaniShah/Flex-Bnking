import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

const navigate = useNavigate();
const handleAccount = () => {
  navigate('/accounts');
};
const handleTransfer = () => {
  navigate('/transactions');
};
const handleAddAccount = () => {
  navigate('/addaccount');
};

const handleAddTransaction = () => {
  navigate('/transaction');
};
  return (
    <div style={{marginTop: '20px'}} className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
        <p>Manage your accounts and transactions easily and efficiently.</p>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Accounts</h3>
          <p>View and manage your bank accounts.</p>
          <button className="dashboard-button" onClick={handleAccount}>Manage Accounts</button>
        </div>
        <div className="dashboard-card">
          <h3>Transactions</h3>
          <p>Track and review your recent transactions.</p>
          <button className="dashboard-button" onClick={handleTransfer}>View Transactions</button>
        </div>
      </div>
      <div style={{marginTop: '20px'}} className="dashboard-content">
        <div className="dashboard-card">
          <h3>Add Accounts</h3>
          <p>Add your bank accounts.</p>
          <button className="dashboard-button" onClick={handleAddAccount}>Add Accounts</button>
        </div>
        <div className="dashboard-card">
          <h3>Add Transactions</h3>
          <p>Add your transactions.</p>
          <button className="dashboard-button" onClick={handleAddTransaction}>Add Transactions</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
