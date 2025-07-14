import React, { useEffect, useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/transactions`)
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div className="Transactions">
      <h2>Transaction History</h2>
      <table className="TransactionsTable">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No transactions found</td>
            </tr>
          ) : (
            transactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>Rs. {transaction.amount}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
