import { useEffect, useState } from "react";
import React from "react";

const Transfer = () => {
  const [user, setUser] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/accounts`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const sendMoney = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!from || !to || !amount) {
      setError('Please fill in all fields');
      return;
    }
    if (from === to) {
      setError('Cannot transfer to the same account');
      return;
    }
    if (amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // Clear any existing error
    setError('');

    fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'From': from, 'To': to, 'Amount': amount })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess('Transaction successful!');
        // Reset form fields
        setFrom('');
        setTo('');
        setAmount('');
      }
    })
    .catch(error => {
      console.error('Error with transaction:', error);
      setError('An error occurred during the transaction. Please try again later.');
    });
  };

  return (
    <form className="TransferForm" onSubmit={sendMoney}>
      <h3>Transfer Your Money</h3>
      <div className="TransferForm-dropbox">
        <div className="TransferForm-input-group">
          <h2>From:</h2>
          <select 
            value={from}
            onChange={e => setFrom(e.target.value)} 
            required
          >
            <option value="">Select Account</option>
            {user.map((item) => (
              <option key={item._id} value={item.account_number}>
                {item.username} - {item.account_number}
              </option>
            ))}
          </select>
        </div>

        <div className="TransferForm-input-group">
          <h2>To:</h2>
          <select 
            value={to} 
            onChange={e => setTo(e.target.value)}
            required
          >
            <option value="">Select Account</option>
            {user.map((item) => (
              <option key={item._id} value={item.account_number}>
                {item.username} - {item.account_number}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="TransferForm-lower">
        <div className="TransferForm-input-group">
          <h2>Enter the Amount:</h2>
          <input 
            type="number" 
            placeholder="Amount" 
            value={amount}
            onChange={e => setAmount(e.target.value)} 
            required
          />
        </div>
      </div>

      <div className="TransferForm-button-container">
        <button type="submit" className="TransferForm-button">Send</button>
      </div>

     
      {error && <p className="TransferForm-message TransferForm-error">{error}</p>}
      {success && <p className="TransferForm-message TransferForm-success">{success}</p>}
    </form>
  );
};

export default Transfer;
