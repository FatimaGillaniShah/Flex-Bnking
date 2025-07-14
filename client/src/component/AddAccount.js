import React, { useState, useEffect, useMemo } from 'react';

const AddAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null); 
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = useMemo(() => {
    return (email) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    };
  }, []);

  const validateForm = () => {
    if (username.trim() !== '' && validateEmail(email) && amount > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [username, email, amount, validateEmail]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('amount', amount);
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/addaccount`, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        const data = await response.json();
        alert('Account created successfully');
        setUsername('');
        setEmail('');
        setAmount('');
        setFile(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form className="AddAccountForm" onSubmit={addUser}>
      <h3 className="AddAccountForm-heading">Add Your Account</h3>
      <div className="AddAccountForm-input-group">
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="AddAccountForm-input-group">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {!validateEmail(email) && email !== '' && (
          <p className="AddAccountForm-error">Please enter a valid email address.</p>
        )}
      </div>
      <div className="AddAccountForm-input-group">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        {amount <= 0 && amount !== '' && (
          <p className="AddAccountForm-error">Amount should be greater than 0.</p>
        )}
      </div>
      <div className="AddAccountForm-input-group">
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="AddAccountForm-button-container">
        <button type="submit" className="AddAccountForm-button" disabled={!isFormValid}>
          Add Account
        </button>
      </div>
    </form>
  );
};

export default AddAccount;
