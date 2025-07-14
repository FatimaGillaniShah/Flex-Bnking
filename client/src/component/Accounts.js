import React, { useEffect, useState, useMemo } from "react";

const Accounts = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/accounts`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  // Memoize the rendered table rows
  const renderedRows = useMemo(() => {
    if (user.length === 0) {
      return (
        <tr>
          <td colSpan="6" style={{ textAlign: 'center' }}>No accounts found.</td>
        </tr>
      );
    }

    return user.map((item, id) => (
      <tr key={id}>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.account_number}</td>
        <td>Rs. +200</td>
        <td>{item.amount}</td>
      </tr>
    ));
  }, [user]);

  return (
    <div className="Bank_Accounts">
      <h2>Account List</h2>
      <table className="AccountsTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Account Number</th>
            <th>Correction</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {renderedRows}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
